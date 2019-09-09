import { red, yellow, cyan, green } from "colors/safe";

export enum LogType {
  Error = 1,
  Warn,
  Info,
  Data
}

class Logger {
  public static debug(logType: LogType = LogType.Info, ...text: any) {
    let textConcat = text
      .map((txt: string) => JSON.stringify(txt) || txt)
      .join("\t");
    if (logType === LogType.Error) {
      process.stdout.write(red("ERROR: "));
      console.error(textConcat);
    } else if (logType === LogType.Warn) {
      process.stdout.write(yellow("WARN: "));
      console.warn(textConcat);
    } else if (logType === LogType.Info) {
      process.stdout.write(cyan("INFO: "));
      console.log(textConcat);
    } else if (logType === LogType.Data) {
      process.stdout.write(green("DATA: "));
      console.log(textConcat);
    } else {
      console.log(text);
    }
  }
}

export default Logger;
