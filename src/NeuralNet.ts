import Activations from "./Activations";
import Loss from "./Loss";
import SaveLoad from "./SaveLoad";
import Logger, { LogType } from "./Logger";
import * as math from "mathjs";
import * as _ from "lodash";
import "colors";

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
  // extension modules
  public static Activation = Activations;
  public static LayerType = LayerType;
  public static loss = Loss;
  public static SaveLoad = SaveLoad;

  // public accessors
  public debug: boolean = false; // enable to get more logs
  public learningRate: number = 0.01;
  public epoch: number = 2000;
  public costFunction: Function;

  private layers: Array<INeuralNetConfig>; // layer configuration for the network
  private actualOutput: Array<number>; // holds the target value
  private weights = []; // holds the weight natrix
  private bias = []; // holds the bias matrix
  private netInputs = []; // holds the calculated weight before passing into activation function
  private netOutputs = []; // holds the calculated weight after passing into activation function
  private correctedWeights = []; // holds the corrected weights to be updated after back propagation
  private loss = []; // holds the loss matrix
  private totalLoss: number; // sum of the above loss matrix

  constructor(layers: Array<INeuralNetConfig>, options: any) {
    this.layers = layers;

    // assign options
    this.costFunction = options.costFunction || Loss.MSE;
    this.debug = options.debug || this.debug;
    this.learningRate = options.learningRate || this.learningRate;
    this.epoch = options.epoch || this.epoch;

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

      if (this.debug) {
        Logger.debug(LogType.Info, "Initializing Weights...");
        Logger.debug(LogType.Info, "Weights: ", this.weights[idx - 1]);
        Logger.debug(
          LogType.Info,
          "Weights Size: ",
          math.size(this.weights[idx - 1])
        );
        Logger.debug(LogType.Info, "Initializing Bias...");
        Logger.debug(LogType.Info, "Bias: ", this.bias[idx - 1]);
        Logger.debug(
          LogType.Info,
          "Bias Size: ",
          math.size(this.bias[idx - 1])
        );
      }
    }
  }

  getWeights() {
    return this.weights;
  }

  private calculateLoss(actualOp) {
    this.loss = this.costFunction(_.last(this.netOutputs), actualOp);
    this.totalLoss = math.sum(this.loss);
  }

  private backProp(actualOp) {
    let lossDerivative = this.costFunction(
      _.last(this.netOutputs),
      actualOp,
      true
    );
    console.log("Loss Matrix Derivative: ", lossDerivative);
    let outputDerivative = this.layers[this.layers.length - 1].activation(
      _.last(this.netOutputs),
      true
    );
    console.log("Output Layer Derivative: ", outputDerivative);
    let correctLastWeight = math.subtract(
      _.last(this.weights),
      this.learningRate *
        math.multiply(
          math.multiply(lossDerivative, outputDerivative),
          _.last(this.weights)
        )
    );
    console.log("Corrected Last Weights: ", correctLastWeight);
    // for (let idx = 0; idx < this.weights.length; idx++) {
    //   const element = this.weights[idx];

    // }
  }

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
      this.netInputs.push(
        math.add(
          math.multiply(
            idx === 0 ? input : this.netOutputs[idx - 1],
            this.weights[idx]
          ),
          this.bias[idx][0]
        )
      );
      this.netOutputs.push(
        this.layers[idx + 1].activation(_.last(this.netInputs))
      );
    }
    console.log("Net Inputs: ", this.netInputs);
    console.log("Net Outputs: ", this.netOutputs);
    this.calculateLoss(this.actualOutput);
    console.log("Loss Matrix: ", this.loss);
    console.log("Total Loss: ", this.totalLoss);
    this.backProp(this.actualOutput);
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

export default NeuralNet;
