// const creator = require('./creator')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const memFs = require('mem-fs')
const memFsEditor = require('mem-fs-editor')
const Creator = require('./creator')

class Library extends Creator{
  constructor (options) {
    super();
    const store = memFs.create();
    this.fs = memFsEditor.create(store);
    this.conf = Object.assign({
      name: '',
      description: '',
      author: ''
    }, options)
    this.rootPath = path.resolve(__dirname, '../../');
    this.tplDirPath = path.join(this.rootPath, 'templates/library/src');
  }

  init () {
    console.log(chalk.green(`Angela即将创建一个library库!`))
    console.log()
  }

  create () {
    this.ask().then(answer => {
      // 询问完成结束后，创建文件
      Object.assign(this.conf, answer)
      this.write()
    })
  }

  write () {
    console.log();
    console.log(chalk.green(`library库 - ${this.conf.name} 构建开始`));
    const tplBuilder = require('../../templates/library/index');
    tplBuilder(this, this.conf, () => {
      console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建library库 - ${this.conf.name} 成功！`)}`)
      console.log();
      console.log(chalk.grey(`开始项目:  cd ${this.conf.name } && npm install`));
      console.log();
    });

  }

  ask () {
    const prompts = []
    prompts.push({
      type: 'input',
      name: 'name',
      message: '请输入项目名称：',
      validate (input) {
        if (!input) {
          return '项目名不能为空！'
        }
        if (fs.existsSync(input)) {
          return '当前目录已经存在同名项目，请换一个项目名！'
        }
        return true
      }
    })
    prompts.push({
      type: 'input',
      name: 'description',
      message: '请输入项目介绍：'
    })
    prompts.push({
      type: 'input',
      name: 'author',
      message: '请输入作者：',
      default: this.gitUser
    })

    return inquirer.prompt(prompts)
  }
}

module.exports = Library
