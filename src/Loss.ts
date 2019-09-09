import * as math from "mathjs";

class Loss {
  // TODO: divide by number of values in the batch
  public static CROSSENTROPY(
    predOP: Array<number>,
    actualOP: Array<number>,
    derivative: boolean = false
  ) {
    if (!derivative) {
      return (
        -1 *
        predOP.map((predVal, idx) => {
          return (
            actualOP[idx] * Math.log(predVal) +
            (1 - actualOP[idx]) * Math.log(1 - predVal)
          );
        })
      );
    }
    return predOP.map((predVal, idx) => {
      -1 *
        (actualOP[idx] * (1 / predVal) +
          (1 - actualOP[idx]) * (1 / (1 - predVal)));
    });
  }

  /**
   * MSE - Mean Squared Error
   *
   */
  public static MSE(
    predOP: Array<number>,
    actualOP: Array<number>,
    derivative: boolean = false
  ) {
    if (!derivative) {
      return predOP.map((predVal, idx) => {
        return 0.5 * (actualOP[idx] - predVal) ** 2;
      });
    }
    return predOP.map((predVal, idx) => {
      return predVal - actualOP[idx];
    });
  }
}

export default Loss;
