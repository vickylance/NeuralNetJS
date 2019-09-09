import { each } from "lodash";

class Activations {
  // Range (0, 1)
  public static SIGMOID(
    X: Array<number>,
    derivative: boolean = false
  ): Array<number> {
    if (!derivative) {
      return each(X, (x: number) => {
        return 1 / (1 + Math.exp(-x));
      });
    }
    return each(X, (x: number) => x * (1 - x));
  }

  // Range [0, INFINITY)
  public static RELU(
    X: Array<number>,
    derivative: boolean = false
  ): Array<number> {
    if (!derivative) {
      return each(X, (x: number) => (x < 0 ? 0 : x));
    }
    return each(X, (x: number) => (x < 0 ? 0 : 1));
  }

  // public static SWISH(X: object, derivative: boolean = false): object {
  //   if (!derivative) {
  //     return each(X as object, x => x * Activations.SIGMOID(x))
  //   }
  // }

  // Range (-1, 1)
  public static TANH(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.tan(x);
    }
    return 1 - x * x;
  }

  // Range (-PI/2, PI/2)
  public static ARCTAN(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.atan(x);
    }
    return 1 / (x ** 2 + 1);
  }

  // Range (-INFINITY, INFINITY)
  public static LEAKY_RELU(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return x < 0 ? 0.01 * x : x;
    }
    return x < 0 ? 0.01 : 1;
  }

  // Range (-1, 1)
  public static SOFTSIGN(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return x / (1 + Math.abs(x));
    }
    return 1 / (Math.abs(x) + 1) ** 2;
  }

  // Range (0, INFINITY)
  public static SOFTPLUS(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.log(1 + Math.exp(x));
    }
    return 1 / (1 + Math.exp(-x));
  }

  //TODO: Implement softmax gracefully
  // Output Activation Function
  public static SOFTMAX(
    X: Array<number>,
    derivative: boolean = false
  ): Array<number> | undefined {
    if (!derivative) {
      let denominator = X.map(x => Math.exp(x)).reduce((a, b) => a + b);
      console.log("denominator: ", denominator);
      return X.map(x => {
        let temp = Math.exp(x) / denominator;
        console.log(temp);
        return temp;
      });
    }
  }

  // Range (0, 1]
  public static GAUSSIAN(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.exp(-1 * (x * x));
    }
    return -2 * x * Math.exp(-1 * (x * x));
  }

  public static INVERSE(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return 1 - x;
    }
    return -1;
  }

  public static IDENTITY(x: number, derivative: boolean = false): number {
    return derivative ? 1 : x;
  }
}

export default Activations;
