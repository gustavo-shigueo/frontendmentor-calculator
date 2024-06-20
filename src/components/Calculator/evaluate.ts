import { Expression } from "./parser";

export function evaluate(expression: Expression): number {
  switch (expression.type) {
    case "NUMBER":
      return expression.value;

    case "BINARY_EXPRESSION": {
      switch (expression.operator) {
        case "EXPONETIATION":
          return evaluate(expression.left) ** evaluate(expression.right);

        case "MULTIPLICATION":
          return evaluate(expression.left) * evaluate(expression.right);

        case "DIVISION":
          return evaluate(expression.left) / evaluate(expression.right);

        case "ADDITION":
          return evaluate(expression.left) + evaluate(expression.right);

        case "SUBTRACTION":
          return evaluate(expression.left) - evaluate(expression.right);
      }
    }

    case "PARENTHESIS":
      return evaluate(expression.expression);

    case "NEGATION":
      return -evaluate(expression.expression);
  }
}
