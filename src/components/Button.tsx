type ButtonProps = { onClick: () => void } & (
  | {
      type: "number";
      value: number;
    }
  | {
      type: "operator";
      operator: "+" | "-" | "x" | "/";
    }
  | {
      type: "equals" | "delete" | "reset" | "dot";
    }
);

export function Button(props: ButtonProps) {
  switch (props.type) {
    case "number":
      return (
        <button type="button" onClick={props.onClick}>
          {props.value}
        </button>
      );

    case "operator":
      return (
        <button type="button" onClick={props.onClick}>
          {props.operator}
        </button>
      );

    case "delete":
      return (
        <button class="delete" type="button" onClick={props.onClick}>
          Del
        </button>
      );

    case "dot":
      return (
        <button type="button" onClick={props.onClick}>
          .
        </button>
      );

    case "reset":
      return (
        <button class="delete span-2" type="button" onClick={props.onClick}>
          Reset
        </button>
      );

    case "equals":
      return (
        <button class="equals span-2" type="button" onClick={props.onClick}>
          =
        </button>
      );
  }
}
