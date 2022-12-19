export const logInfo = (...a: any): void => {
  console.log(a)
  //console.log(chalk.blueBright.bold(...a))
}

export const logSuccess = (...a: any): void => {
  console.log(a)
  //console.log(chalk.greenBright.bold(...a))
}

export const logError = (...a: any): void => {
  console.log(a)
  //console.log(chalk.redBright.bold(...a))
}

export const logDebug = (...a: any) => {
  console.log(a)
  //console.log(chalk.whiteBright(...a))
}
