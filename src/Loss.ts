import * as math from "mathjs";

class Loss {

  // TODO: divide by number of values in the batch
  public static CROSSENTROPY(predOP, actualOP, derivative: boolean = false) {
    if (!derivative) {
      return -1 * math.sum(predOP.map((predVal, idx) => {
        return (actualOP[idx] * Math.log(predVal)) + ((1-actualOP[idx]) * Math.log(1 - predVal));
      }));
    }
    return predOP.map((predVal, idx) => {
      -1 * ((actualOP[idx] * (1/predVal)) + (1 - actualOP[idx]) * (1/(1 - predVal)));
    });
  };
}

export default Loss;