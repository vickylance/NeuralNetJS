// Other techniques for learning
const Matrix = require('./Matrix');
const Activate = require('./Activate');
const nj = require('numjs');
const _ = require('lodash');

class NeuralNetwork {
  constructor(netConfig) {
    this.layers = [];

    // push input layer
    this.layers.push({
      "neurons": netConfig.input
    });
    // push hidden layers
    netConfig.layers.forEach(layer => {
      this.layers.push(layer);
    });
    // push output layer
    this.layers.push(netConfig.output);
    
    this.initializeRandomWeights();
    this.initializeRandomBias();
    this.setLearningRate();

    this.result = [];

    console.log(this);
    
  }
  
  initializeRandomWeights() {
    this.weights = [];
    // idx = 1 to skip the input layer
    for (let idx = 1; idx < this.layers.length; idx++) {
      const prevLayer = this.layers[idx - 1];
      const nextLayer = this.layers[idx];
      this.weights.push(
        nj.random([
          prevLayer.neurons,
          nextLayer.neurons
        ])
      )
    }
    // this.weights.map(weight => {
    //   console.log(weight.shape);
    // })
    // console.log(this.weights)
  }

  initializeRandomBias() {
    this.bias = [];
    for (let idx = 1; idx < this.layers.length; idx++) {
      const currLayer = this.layers[idx];
      this.bias.push(
        nj.random([
          currLayer.neurons,
          1
        ])
      )
    }
    // this.bias.map(bias => {
    //   console.log(bias.shape);
    // })
    // console.log(this.bias)
  }

  setLearningRate(learningRate = 0.01) {
    this.learning_rate = learningRate;
  }

  predict(inputArr) {
    // Generating the Hidden Outputs
    const inputs = Matrix.fromArray(inputArr);
    const hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation_function.func);

    // Generating the output's output!
    const output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    // Sending back to the caller!
    return output.toArray();
  }

  // setActivationFunction(func = Activate.sigmoid) {
  //   this.activation_function = func;
  // }

  calculateActivation() {

  }

  forwardProp(inputs) {
    // forward prop
    for (let idx = 0; idx < this.weights.length; idx++) {
      // multiply weights with prev input
      this.result[idx] = nj.multiply(idx === 0 ? inputs : this.result[idx - 1], this.weights[idx]);
      // add bias
      this.result[idx] = nj.add(this.result[idx], this.bias[idx]);
      // apply the activation function
      this.result[idx] = nj.array(this.result[idx].valueOf().map(it => {
        return it.map(elm => {
          return this.layers[idx].activation(elm)
        })
      }), 'float64');
    }
  }

  train(inputArray, targetArray) {
    // convert input to ndarray
    const inputs = nj.array(inputArray);
    console.log(inputs);
    // Convert target to ndarray
    const targets = nj.array(targetArray);
    console.log(targets);
    
    // one forward pass
    this.forwardProp(inputs);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    const outputErrors = nj.subtract(targets, _.last(this.result));
    console.log(outputErrors);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = nj.array(_.last(this.result).valueOf().map(it => {
      return it.map(elm => {
        return _.last(this.layers).activation(elm)
      })
    }), 'float64');
    gradients = nj.multiply(gradients, outputErrors);
    gradients = nj.multiply(gradients, this.learning_rate);
    console.log(gradients);
    

    // Calculate deltas
    const hiddenTranspose = Matrix.transpose(hidden);
    const weightHOdeltas = Matrix.multiply(gradients, hiddenTranspose);

    // Adjust the weights by deltas
    this.weights_ho.add(weightHOdeltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    const whoTranspose = Matrix.transpose(this.weights_ho);
    const hiddenErrors = Matrix.multiply(whoTranspose, outputErrors);

    // Calculate hidden gradient
    const hiddenGradient = Matrix.map(hidden, this.activation_function.dfunc);
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learning_rate);

    // Calcuate input->hidden deltas
    const inputsTranspose = Matrix.transpose(inputs);
    const weightIHdeltas = Matrix.multiply(hiddenGradient, inputsTranspose);

    this.weights_ih.add(weightIHdeltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hiddenGradient);

    // outputs.print();
    // targets.print();
    // error.print();
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const nn = new NeuralNetwork(
      data.input_nodes,
      data.hidden_nodes,
      data.output_nodes,
    );
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;
    return nn;
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    NeuralNetwork,
  };
}

let nn = new NeuralNetwork({
  input: 4,
  layers: [
    {
      neurons: 5,
      activation: RELU
    },
    {
      neurons: 4,
      activation: RELU
    }
  ],
  output: {
    neurons: 3,
    activation: SIGMOID
  }
});

function SIGMOID(x, derivative = false) {
  if (!derivative) {
    return 1 / (1 + Math.exp(-x));
  }
  return x * (1 - x);
}

function RELU(x, derivative = false) {
  if (!derivative) {
    return x < 0 ? 0 : x;
  }
  return x < 0 ? 0 : 1;
}

// let rand = nj.random(3,5);
// console.log(rand);

// rand = nj.array(rand.valueOf().map(it => {
//   return it.map(elm => {
//     return SIGMOID(elm)
//   })
// }), 'float64')
// console.log(rand);

