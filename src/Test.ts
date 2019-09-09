// import NeuralNet from "./NeuralNet";

// let nn = new NeuralNet({
//     inputs: 5,
//     layers: [{
//         neurons: 10,
//         activation: NeuralNet.activation.SIGMOID
//     }, {
//         neurons: 10,
//         activation: NeuralNet.activation.SIGMOID
//     }, {
//         neurons: 10,
//         activation: NeuralNet.activation.SIGMOID
//     }],
//     output: {
//         value: 3,
//         activation: NeuralNet.activation.SOFTMAX
//     }
// }); // this will create a empty nn with randomized weights

// nn.addLayer({
//     neurons: 10,
//     activation: NeuralNet.activation.SIGMOID
// })
// nn.addLayers([{
//     neurons: 10,
//     activation: NeuralNet.activation.SIGMOID
// }])
// nn.getLayers() // each layers with all the properties
// nn.getLayer(id) // get the layer with the specified id
// nn.getNeurons(layerId) // get the neurons from the layer
// nn.getNeuron(neuronId) // get the properties of a particular neuron.

// import * as csv from "csvtojson";
// import * as fs from "fs";
// import "colors";

// enum LoggerType {
//   Error,
//   Warn,
//   Info,
//   Data
// }
// function debug(logType: LoggerType = LoggerType.Info, ...text: any) {
//   let textConcat = text.map(txt => JSON.stringify(txt) || txt).join("\t");
//   if (logType === LoggerType.Error) {
//     process.stdout.write("ERROR: ".red);
//     console.error(textConcat);
//   } else if (logType === LoggerType.Warn) {
//     process.stdout.write("WARN: ".yellow);
//     console.warn(textConcat);
//   } else if (logType === LoggerType.Info) {
//     process.stdout.write("INFO: ".cyan);
//     console.log(textConcat);
//   } else if (logType === LoggerType.Data) {
//     process.stdout.write("DATA: ".green);
//     console.log(textConcat);
//   } else {
//     console.log(text);
//   }
// }

// const trainIP = [];
// const trainOP = [];
// const testIP = [];
// const testOP = [];
// // const nn = new NeuralNet.NeuralNetwork(4, 5, 3);
// function opCreator(op) {
//   if (op === "1") {
//     return [1, 0, 0];
//   } else if (op === "2") {
//     return [0, 1, 0];
//   } else if (op === "3") {
//     return [0, 0, 1];
//   }
// }

// csv()
//   .fromFile("./train.csv")
//   .on("json", jsonObj => {
//     const temp = Object.keys(jsonObj).map(key => jsonObj[key]);
//     trainOP.push(temp.slice(temp.length - 1, temp.length));
//     trainIP.push(temp.slice(0, temp.length - 1));
//   })
//   .on("done", error => {
//     if (error) {
//       throw error;
//     }
//     debug(LoggerType.Warn, "trainIP:", trainIP);
//     debug(LoggerType.Warn, "trainOP:", trainOP);
//     // const epoch = 20000;
//     // for (let i = 0; i < epoch; i++) {
//     //   const randomIndex = Math.floor(Math.random() * trainIP.length);
//     //   nn.train(trainIP[randomIndex], opCreator(trainOP[randomIndex][0]));
//     // }
//     debug(LoggerType.Info, "end");
//   });

// const predVal = [];
// csv()
//   .fromFile("./test.csv")
//   .on("json", jsonObj => {
//     const temp = Object.keys(jsonObj).map(key => jsonObj[key]);
//     testOP.push(temp.slice(temp.length - 1, temp.length));
//     testIP.push(temp.slice(0, temp.length - 1));
//   })
//   .on("done", error => {
//     if (error) {
//       throw error;
//     }
//     debug(LoggerType.Warn, "testIP:", testIP);
//     debug(LoggerType.Warn, "testOP:", testOP);

//     // for (let i = 0; i < testIP.length; i++) {
//     //   predVal.push(nn.predict(testIP[i]));
//     //   debug(`${predVal[i]}:${testOP[i]}`, LoggerType.Info);
//     // }
//     // for (let i = 0; i < testIP.length; i++) {
//     //   predVal.push(nn.predict(testIP[i]));
//     //   debug(`${predVal[i].indexOf(Math.max(...predVal[i])) + 1}:${testOP[i]}`, LoggerType.Info);
//     // }
//     // const se = nn.serialize();
//     // fs.writeFile('./temp.txt', se, (err) => {
//     //   if (err) console.log(err);
//     //   // creates a file containing: [object Object]
//     // });
//     debug(LoggerType.Info, "end");
//   });
