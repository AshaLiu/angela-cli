const chalk = require('chalk')
const path = require('path')

function getRootPath () {
  return path.resolve(__dirname, '../../')
}

function getPkgVersion () {
  return require(path.join(getRootPath(), 'package.json')).version
}

function printPkgVersion () {
  const angelaVersion = getPkgVersion()
  console.log()
  console.log(chalk.yellow(`组件脚手架 -- Angela v${angelaVersion}`))
  console.log()
}

module.exports = {
  getRootPath,
  getPkgVersion,
  printPkgVersion
}
