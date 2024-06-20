import { createSignal } from "solid-js";
import { Button } from "../Button";
import { evaluate } from "./evaluate";
import { parse } from "./parser";

const formatter = new Intl.NumberFormat(undefined);
const DECIMAL_SEPARATOR =
  formatter.formatToParts(0.5).find((x) => x.type === "decimal")?.value ?? ".";

export function Calculator() {
  const [expression, setExpression] = createSignal("");
  const [number, setNumber] = createSignal("0");

  function appendOperator(value: string) {
    return () => {
      setExpression((current) => {
        if (current === "") {
          return `${number().replace(/\.$/, "")} ${value}`;
        }
        return `${current} ${number().replace(/\.$/, "")} ${value}`;
      });

      setNumber("0");
    };
  }

  function appendNumber(value: string) {
    return () => {
      if (number().length === 13) {
        return;
      }

      if (number() !== "0") {
        setNumber((current) => current + value);
        return;
      }

      if (value !== "0") {
        setNumber(value);
      }
    };
  }

  function appendDot() {
    if (number().includes(".")) {
      return;
    }

    setNumber((current) => `${current}.`);
  }

  function reset() {
    setNumber("0");
    setExpression("");
  }

  function backspace() {
    if (number() === "0" && expression() === "") {
      return;
    }

    if (number().length > 1) {
      setNumber((current) => current.substring(0, current.length - 1));
      return;
    }

    if (number() !== "0") {
      setNumber("0");
      return;
    }

    const tokens = expression().split(" ");
    tokens.pop();

    setNumber(tokens.pop() ?? "0");
    setExpression(tokens.join(" "));
  }

  function equals() {
    if (expression() === "") {
      setNumber(evaluate(parse(number())).toString());
      setExpression("");
      return;
    }

    setNumber(evaluate(parse(`${expression()} ${number()}`)).toString());
    setExpression("");
  }

  return (
    <form class="calculator">
      <div class="screen">
        <span>{expression()}</span>
        <span>
          {formatter.format(Number(number()))}
          {number().endsWith(".") ? DECIMAL_SEPARATOR : ""}
        </span>
      </div>

      <div class="keypad">
        <Button type="number" value={7} onClick={appendNumber("7")} />
        <Button type="number" value={8} onClick={appendNumber("8")} />
        <Button type="number" value={9} onClick={appendNumber("9")} />
        <Button type="delete" onClick={backspace} />

        <Button type="number" value={4} onClick={appendNumber("4")} />
        <Button type="number" value={5} onClick={appendNumber("5")} />
        <Button type="number" value={6} onClick={appendNumber("6")} />
        <Button type="operator" operator="+" onClick={appendOperator("+")} />

        <Button type="number" value={1} onClick={appendNumber("1")} />
        <Button type="number" value={2} onClick={appendNumber("2")} />
        <Button type="number" value={3} onClick={appendNumber("3")} />
        <Button type="operator" operator="-" onClick={appendOperator("-")} />

        <Button type="dot" onClick={appendDot} />
        <Button type="number" value={0} onClick={appendNumber("0")} />
        <Button type="operator" operator="/" onClick={appendOperator("/")} />
        <Button type="operator" operator="x" onClick={appendOperator("x")} />

        <Button type="reset" onClick={reset} />
        <Button type="equals" onClick={equals} />
      </div>
    </form>
  );
}
