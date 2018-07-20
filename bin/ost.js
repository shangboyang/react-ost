#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      'requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'react-ost')

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

const {
  resolve
} = require('path')

const res = command => resolve(__dirname, '../commands/', command) //

program
  .version(require('../package').version)

program
  .usage('<command>')

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require(res('init'))
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}