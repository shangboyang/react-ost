const inquirer = require('inquirer')
const rm = require('rimraf').sync;
const {
  writeFile
} = require('fs')
const {
  resolve
} = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')


const question = [{
    type: 'list',
    message: 'Please select a boilerplate-project:',
    name: 'tpl',
    choices: ['Client-Side-Render', 'Server-Side-Render'],
  }, {
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
  }
]

module.exports = inquirer.prompt(question).then(({
  tpl,
  project
}) => {
  console.log('tpl::: ', tpl, ' Project::: ', project);

  const csrFlag = tpl === 'Client-Side-Render'
  const csrRepo = `shangboyang/react-orcrist#master`
  const ssrRepo = `shangboyang/react-ost-universal#master`

  const spinner = ora('Downloading template...')

  spinner.start()
  /**
   * @argument 下载路径
   * @argument 目标路径
   */
  download(csrFlag ? csrRepo : ssrRepo, `./${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green(`New project has been initialized successfully!`))
  })
  
})
