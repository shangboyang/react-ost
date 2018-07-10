const inquirer = require('inquirer')
const shelljs = require('shelljs')
// const rm = require('rimraf').sync;
const fs = require('fs')
const {
  resolve
} = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

console.log(`${chalk.yellow(`Installing packages...`)}This might tabe a couple of minutes.`);

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
        console.log(fs.readdir(`./${val}`, arr=> {
          console.log(arr)
        }))
        
        return true
      } 

      return 'Project name is required!'
    }
  }, {
    type: 'input',
    name: 'author',
    message: 'Project author:',
  }, {
    type: 'input',
    name: 'description',
    message: 'Project description:',
  }
]

module.exports = inquirer.prompt(question).then(({
  tpl,
  project,
  author,
  description,
}) => {

  const csrFlag = tpl === 'Client-Side-Render'
  const csrRepo = `shangboyang/react-orcrist#master`
  const ssrRepo = `shangboyang/react-ost-universal#master`

  const spinner = ora('Downloading template...')

  spinner.start()
  /**
   * @argument 下载路径
   * @argument 目标路径
   */
  /*
  download(csrFlag ? csrRepo : ssrRepo, `./${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }

    fs.readFile(`./${project}/package.json`, 'utf8', function (err, data) {
      if (err) {
        spinner.stop();
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      packageJson.name = project;
      packageJson.description = description;
      packageJson.author = author;
      const updatePackageJson = JSON.stringify(packageJson, null, 2);

      fs.writeFile(`./${project}/package.json`, updatePackageJson, 'utf8', function (err) {
        if (err) {
          spinner.stop();
          console.error(err);
          return;
        } else {
          spinner.stop();
          console.log(chalk.green(`New project has been initialized successfully!`))
          console.log(`
              ${chalk.bgWhite.black('   Run Application  ')}
              ${chalk.yellow(`cd ${project}`)}
              ${chalk.yellow('npm install')}
              ${chalk.yellow('npm start')}
            `);
        }
      });

      console.log(`${chalk.yellow(`Installing packages...`)}`);
      console.log(`${chalk.yellow(`This might take a couple of minutes...`)}`);
      

    });
  })

  */
})
