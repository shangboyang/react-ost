#!/usr/bin/env node --harmony

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

const { resolve } = require('path')

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