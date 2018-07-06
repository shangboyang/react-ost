const inquirer = require('inquirer')
const {
  writeFile
} = require('fs')
// const {
//   listTable
// } = require(`${__dirname}/../utils`)
const {
  resolve
} = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

// let tplList = require(`${__dirname}/../templates`)

const question = [{
    type: 'list',
    message: 'Please select a boilerplate-project:',
    name: 'tpl',
    choices: ['Clien-Side-Render', 'Server-Side-Render'],

  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    choices: ["Choice A", "choice B"],
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

module.exports = inquirer.prompt(question).then(({
  tpl,
  project,
  place
}) => {
  console.log('tpl::: ', tpl, ' Project::: ', project, ' Place ::: ', place);
  
  // const gitPlace = tplList[name]['owner/name']
  // const gitBranch = tplList[name]['branch']
  const spinner = ora('Downloading template...')

  // spinner.start()

  // download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {
  //   if (err) {
  //     console.log(chalk.red(err))
  //     process.exit()
  //   }
  //   spinner.stop()
  //   console.log(chalk.green('New project has been initialized successfully!'))
  // })
  
})
