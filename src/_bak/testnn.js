const NeuralNet = require('./nn');
const csv = require('csvtojson');
const fs = require('fs');

const trainIP = [];
const trainOP = [];
const testIP = [];
const testOP = [];
const nn = new NeuralNet.NeuralNetwork(4, 5, 3);
function opCreator(op) {
  if (op === '1') {
    return [1, 0, 0];
  } else if (op === '2') {
    return [0, 1, 0];
  } else if (op === '3') {
    return [0, 0, 1];
  }
}

csv()
  .fromFile('./train.csv')
  .on('json', (jsonObj) => {
    const temp = Object.values(jsonObj);
    trainOP.push(temp.slice(temp.length - 1, temp.length));
    trainIP.push(temp.slice(0, temp.length - 1));
  })
  .on('done', (error) => {
    if (error) {
      throw error;
    }
    const epoch = 20000;
    for (let i = 0; i < epoch; i++) {
      const randomIndex = Math.floor(Math.random() * trainIP.length);
      nn.train(trainIP[randomIndex], opCreator(trainOP[randomIndex][0]));
    }
  });

const predVal = [];
csv()
  .fromFile('./test.csv')
  .on('json', (jsonObj) => {
    const temp = Object.values(jsonObj);
    testOP.push(temp.slice(temp.length - 1, temp.length));
    testIP.push(temp.slice(0, temp.length - 1));
  })
  .on('done', (error) => {
    if (error) {
      throw error;
    }

    for (let i = 0; i < testIP.length; i++) {
      predVal.push(nn.predict(testIP[i]));
    }
    for (let i = 0; i < testIP.length; i++) {
      predVal.push(nn.predict(testIP[i]));
    }
    const se = nn.serialize();
    fs.writeFile('./temp.txt', se, (err) => {
      if (err) console.log(err);
      // creates a file containing: [object Object]
    });
  });
