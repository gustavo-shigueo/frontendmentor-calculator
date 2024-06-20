type BinaryOperator =
  | "MULTIPLICATION"
  | "DIVISION"
  | "ADDITION"
  | "SUBTRACTION";

export type Expression =
  | {
      type: "NUMBER";
      value: number;
    }
  | {
      type: "BINARY_EXPRESSION";
      left: Expression;
      operator: BinaryOperator;
      right: Expression;
    };

const PRIORITY_MAP: Record<string, number> = {
  x: 2,
  "/": 2,
  "+": 1,
  "-": 1,
} as const;

const OPERATOR_MAP: Record<"-" | "x" | "/" | "+", BinaryOperator> = {
  x: "MULTIPLICATION",
  "/": "DIVISION",
  "+": "ADDITION",
  "-": "SUBTRACTION",
} as const;

export function parse(expression: string): Expression {
  const minimumPriority = locateMinimumPriority(expression);
  const token = expression[minimumPriority];

  switch (token) {
    case "x":
    case "/":
    case "+":
    case "-":
      return {
        type: "BINARY_EXPRESSION",
        operator: OPERATOR_MAP[token],
        left: parse(expression.substring(0, minimumPriority)),
        right: parse(expression.substring(minimumPriority + 1)),
      };

    default: {
      return {
        type: "NUMBER",
        value: parseFloat(expression.trim()),
      };
    }
  }
}

function locateMinimumPriority(expression: string): number {
  let minimumPriority = { index: Infinity, priority: Infinity };

  for (let index = 0; index < expression.length; index++) {
    const character = expression[index];

    if (
      character === " " ||
      character === "\n" ||
      character === "\r" ||
      character === "\t"
    ) {
      continue;
    }

    const priority = PRIORITY_MAP[character] ?? Number.MAX_SAFE_INTEGER;

    switch (character) {
      case "x":
      case "/":
      case "+":
      case "-":
      default:
        if (minimumPriority.priority >= priority) {
          minimumPriority = { index, priority };
        }
        break;
    }
  }

  return minimumPriority.index;
}
