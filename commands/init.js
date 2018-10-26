const inquirer = require('inquirer')
const shell = require('shelljs')
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
    choices: ['Client-Side-Render', 'Client-Side-Render(china-cdn ver.)', 'Server-Side-Render'],
  }, {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    // choices: ["Choice A", "choice B"],
    validate(val) {
      if (val !== '') {
        if (fs.existsSync(`./${val}`)) {
          return `The folder '${val}' has existed, please change it for another!`
        }
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
  let repo;
  switch (true) {
    case !!(tpl === `Client-Side-Render`):
      repo = `shangboyang/react-orcrist#webpack4`
      break;
    case !!(tpl === `Client-Side-Render(china-cdn ver.)`):
      repo = `shangboyang/react-orcrist#cdn`
      break;
    case !!(tpl === `Server-Side-Render`):
      repo = `shangboyang/react-ost-universal#master`
      break;
  }
  // const csrFlag = tpl === 'Client-Side-Render'
  // const csrRepo = `shangboyang/react-orcrist#webpack4`
  // const csr2Repo = `shangboyang/react-orcrist#cdn`
  // const ssrRepo = `shangboyang/react-ost-universal#master`

  const spinner = ora('Downloading template...')

  spinner.start()
  /**
   * @argument 下载路径
   * @argument 目标路径
   */
 
  download(repo, `./${project}`, (err) => {
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
          console.error(`${chalk.red(err)}`);
          return;
        } else {
          console.log(`${chalk.yellow(` `)}`);
          console.log(`${chalk.yellow(`Installing packages...`)}`);
          console.log(`${chalk.yellow(`This might take a couple of minutes...`)}`);

          if (!shell.which('npm')) {
            shell.echo('Sorry, this script requires npm');
            shell.exit(1);
          } else {
            shell.cd(`./${project}`)
            shell.exec('npm i')
          }

          spinner.stop();

          console.log(chalk.green(`New project has been initialized successfully!`))
         
          console.log(`
              ${chalk.bgWhite.black('   Run Application  ')}
              ${chalk.yellow(`cd ${project}`)}
              ${chalk.yellow('npm run dev')}
            `);

        }
      });

      
      

    });
  })

})
