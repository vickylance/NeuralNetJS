
function* idMaker() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const gen = idMaker();

class Activation {
  static Sign(x) {
    return x >= 0 ? 1 : -1;
  }
  static Relu(x) {
    return Math.abs(x) * (x > 0);
  }
  static Relu_d(x) {
    return 1.0 * (x > 0);
  }
}

/**
 * A Simple Perceptron
 * @class Perceptron
 */
class Perceptron {
  /**
   * Generates a Randomnumber in the range of -1 to 1
   * and then returns the same.
   * @static
   * @returns A Random Number in the range of -1 to 1
   * @memberof Perceptron
   */
  static randomGen() {
    return Math.random() * (Math.random() > 0.5 ? -1 : 1);
  }

  /**
   * Creates an instance of Perceptron.
   * The weights and bias are optional parammmeters.
   * @param {integer} noOfInputs
   * @param {Activation} activationFun By default the activation function is Relu activation function.
   * @memberof Perceptron
   */
  constructor(noOfInputs, activationFun) {
    if (!noOfInputs) {
      return;
    }
    this.inputs = new Array(noOfInputs);
    this.weights = this.inputs.map(() => Perceptron.randomGen());
    this.bias = Perceptron.randomGen();
    this.lr = 0.001;
    this.activation = 0;
    this.activationFun =
      typeof activationFun === 'function' ? activationFun : Activation.Relu;
    this.id = gen.next().value;
  }

  assignInputs(inputs) {
    if (this.inputs.length !== inputs.length) {
      return;
    }
    this.inputs = this.inputs.map((ip, iter) => inputs[iter]);
  }

  /**
   * Calculates the weighted sum of all the inputs,weights and bias of this Perceptron
   * And then applies the passed in activation function on the result and returns the same.
   *
   * @param {Activation} activationFn
   * @returns Activation value
   * @memberof Perceptron
   */
  predict(inputs) {
    this.assignInputs(inputs);
    const weightedSum =
      this.inputs
        .map((ip, iter) => ip * this.weights[iter])
        .reduce((a, b) => a + b) + this.bias;
    return this.activationFun(weightedSum); // Apply activation function
  }

  train(inputs, actualVal) {
    const error = actualVal - this.predict(inputs);
    this.weights = this.inputs.length.map(ip => error * ip * this.lr); // Training
  }
}
