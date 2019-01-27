
const csv = require('csvtojson');
const fs = require('fs');
import Logger from './Logger';

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
    Logger.debug(trainIP[2], LoggerType.Warn);
    Logger.debug(opCreator(trainOP[2][0]), LoggerType.Warn);
    const epoch = 20000;
    for (let i = 0; i < epoch; i++) {
      const randomIndex = Math.floor(Math.random() * trainIP.length);
      nn.train(trainIP[randomIndex], opCreator(trainOP[randomIndex][0]));
    }
    Logger.debug(opCreator(trainOP[2][0]), LoggerType.Warn);
    Logger.debug('end', LoggerType.Info);
  });