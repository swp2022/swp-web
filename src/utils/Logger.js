export class Logger {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }

  log = (str) => {
    if (process.env.NODE_ENV === "development")
      console.log(this.moduleName + ": " + str);
  };
}
