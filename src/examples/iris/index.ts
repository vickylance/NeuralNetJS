import NeuralNet from '../../NeuralNet';

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