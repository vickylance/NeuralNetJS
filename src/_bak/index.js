const csv = require('csvtojson');

function* idMaker() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const gen = idMaker();

class Activation {
  static Sign(x) {
    return (x >= 0) ? 1 : -1;
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
      debug('Provide the number of inputs for the perceptron', LoggerType.Error);
      return;
    }
    this.inputs = new Array(noOfInputs);
    this.weights = new Array(noOfInputs).fill().map(() => Perceptron.randomGen());
    this.bias = Perceptron.randomGen();
    this.lr = 0.01;
    this.activation = 0;
    this.activationFun = (typeof activationFun === 'function') ? activationFun : Activation.Relu;
    this.id = gen.next().value;
  }

  assignInputs(inputs) {
    if (this.inputs.length !== inputs.length) {
      debug('Invalid number of inputs for perceptron', LoggerType.Error);
      return;
    }
    this.inputs = inputs;
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
    const weightedSum = this.inputs.map((ip, iter) => ip * this.weights[iter]).reduce((a, b) => a + b); // + this.bias;
    return this.activationFun(weightedSum); // Apply activation function
  }

  train(inputs, actualVal) {
    const predict = this.predict(inputs);
    const error = actualVal - predict;
    // debug(`Pred: ${predict}, Actu: ${actualVal} -> Err: ${error} : = ${this.weights}`, LoggerType.Info);
    if (error !== 0) { this.weights = this.inputs.map(ip => error * ip * this.lr); } // Training
  }
}

const train_ip = [];
const train_op = [];
const test_ip = [];
const test_op = [];
const per = new Perceptron(4, Activation.Relu);
csv()
  .fromFile('./train.csv')
  .on('json', (jsonObj) => {
    const temp = Object.values(jsonObj);
    train_op.push(temp.slice(temp.length - 1, temp.length));
    train_ip.push(temp.slice(0, temp.length - 1));
  })
  .on('done', (error) => {
    if (error) {
      throw error;
    }
    const epoch = 40;
    for (let i = 0; i < epoch; i++) {
      for (let j = 0; j < train_ip.length; j++) {
        // debug(`I: ${train_ip[j]} O:${train_op[j]}`, LoggerType.Info);
        per.train(train_ip[j], train_op[j]);
      }
    }

    debug('end', LoggerType.Info);
  });

const pred_val = [];
csv()
  .fromFile('./test.csv')
  .on('json', (jsonObj) => {
    const temp = Object.values(jsonObj);
    test_op.push(temp.slice(temp.length - 1, temp.length));
    test_ip.push(temp.slice(0, temp.length - 1));
  })
  .on('done', (error) => {
    if (error) {
      throw error;
    }

    for (let i = 0; i < test_ip.length; i++) {
      pred_val.push(per.predict(test_ip[i]));
      debug(`${pred_val[i]}:${test_op[i]}`, LoggerType.Info);
    }
    debug('end', LoggerType.Info);
  });
