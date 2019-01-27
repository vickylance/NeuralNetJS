import "colors";

export enum LogType {
  Error = 1,
  Warn,
  Info,
  Data
}

class Logger {
  public static debug(logType: LogType = LogType.Info, ...text: any) {
    let textConcat = text.map(txt => JSON.stringify(txt) || txt).join("\t");
    if (logType === LogType.Error) {
      process.stdout.write("ERROR: ".red);
      console.error(textConcat);
    } else if (logType === LogType.Warn) {
      process.stdout.write("WARN: ".yellow);
      console.warn(textConcat);
    } else if (logType === LogType.Info) {
      process.stdout.write("INFO: ".cyan);
      console.log(textConcat);
    } else if (logType === LogType.Data) {
      process.stdout.write("DATA: ".green);
      console.log(textConcat);
    } else {
      console.log(text);
    }
  }
}

export default Logger;