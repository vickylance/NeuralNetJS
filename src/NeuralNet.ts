import Activations from "./Activations";
import * as math from "mathjs";
import Logger, { LogType } from "./Logger";
import * as _ from "lodash";
import "colors";
import Loss from "./Loss";

enum LayerType {
  Input,
  Hidden,
  Output
}

interface INeuralNetConfig {
  nodes: number;
  type: LayerType;
  activation?: Function;
}

function print(value) {
  const precision = 14;
  console.log(math.format(value, precision));
}

class NeuralNet {
  public static Activation = Activations;
  public static LayerType = LayerType;
  public static loss = Loss;
  private computedLoss: number;
  private layers: Array<INeuralNetConfig>;
  private actualOutput: Array<number>;
  private weights = [];
  private computedWeights = [];
  private bias = [];

  constructor(layers: Array<INeuralNetConfig>) {
    this.layers = layers;

    // initialize the random weights for weight matrix and bias
    this.initializeRandomWeights();
  }

  private initializeRandomWeights() {
    for (let idx = 1; idx < this.layers.length; idx++) {
      this.weights.push(math.random([
        this.layers[idx - 1].nodes,
        this.layers[idx].nodes
      ]) as math.Matrix);
      this.bias.push(math.random([1, this.layers[idx].nodes]) as math.Matrix);

      Logger.debug(LogType.Info, "Weights: ", math.size(this.weights[idx - 1]));
      Logger.debug(LogType.Info, "Bias: ", math.size(this.bias[idx - 1]));
    }
  }

  getWeights() {
    return this.weights;
  }

  calculateActivation(input) {}

  calculateLoss(calculatedOp, actualOp) {
    this.computedLoss = NeuralNet.loss.CROSSENTROPY(calculatedOp, actualOp);
  }

  backProp() {}

  forwardProp(input) {
    if (math.size(input)[0] !== math.size(this.weights[0])[0]) {
      Logger.debug(
        LogType.Error,
        "Invalid input size. Does not match with weight matrix",
        "Input: ",
        math.size(input),
        " Output: ",
        math.size(this.weights[0])[0]
      );
      return;
    }
    for (let idx = 0; idx < this.weights.length; idx++) {
      let hiddenLayer = math.add(
        math.multiply(
          idx === 0 ? input : this.computedWeights[idx - 1],
          this.weights[idx]
        ),
        this.bias[idx][0]
      );
      // console.log("hiddenlayer Type", typeof hiddenLayer);
      console.log("hiddenLayer", hiddenLayer);
      this.computedWeights.push(this.layers[idx + 1].activation(hiddenLayer));
    }
    console.log("this.computedWeights: ", this.computedWeights);
    this.calculateLoss(_.last(this.computedWeights), this.actualOutput);
    console.log("this.computedLoss: ", this.computedLoss);
  }

  train(inputs: Array<number>, outputs: Array<number>) {
    if (!(inputs.length > 0)) {
      Logger.debug(LogType.Error, "Input data is not an Array of numbers");
      return;
    }
    this.actualOutput = outputs;
    this.forwardProp(inputs);
  }
}

let nn = new NeuralNet([
  {
    nodes: 4,
    type: NeuralNet.LayerType.Input // Input node does not require activation
  },
  {
    nodes: 5,
    type: NeuralNet.LayerType.Hidden,
    activation: NeuralNet.Activation.RELU
  },
  {
    nodes: 4,
    type: NeuralNet.LayerType.Hidden,
    activation: NeuralNet.Activation.SIGMOID
  },
  {
    nodes: 3,
    type: NeuralNet.LayerType.Output,
    activation: NeuralNet.Activation.SOFTMAX
  }
]);

nn.train([5.1, 3.5, 1.4, 0.2], [1, 0, 0]);

// console.log(nn.getWeights());
