import Activations from './Activations';
import uuid from "uuid/v4";

class Neuron implements INeuron{
  public _id: number;
  public _inputs: number[];
  public _activation: Function;

  constructor(inputs: number[], activation: Function) {
    this._id = uuid();
    this._inputs = inputs;
    this._activation = activation;
  }

  /**
   * getActivationFn
   */
  public getActivationFn() {
    
  }

  /**
   * getActivationVal
   */
  public getActivationVal() {
    return 1;
  }
}

interface INeuron {
  getActivationVal: () => number,
  getActivationFn: () => Function
}

export default Neuron;
