// const creator = require('./creator')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const memFs = require('mem-fs')
const memFsEditor = require('mem-fs-editor')

class VueComponent {
  constructor (options) {
    const store = memFs.create();
    this.fs = memFsEditor.create(store);
    this.conf = Object.assign({
      name: '',
      description: '',
      author: '',
    }, options)
    this.rootPath = path.resolve(__dirname, '../../');
    this.tplDirPath = path.join(this.rootPath, 'templates/vue-component/src');
    VueComponent.init()
  }

  static init () {
    console.log(chalk.green(`Angela即将创建一个vue组件！`))
    console.log()
  }

  create () {
    VueComponent.ask().then(answer => {
      // 询问完成结束后，创建文件
      Object.assign(this.conf, answer)
      this.write()
    })
  }

  getTplPath(file) {
    return path.join(this.tplDirPath, file);
  }

  copyTpl(file, to, data = {}) {
    const tplPath = this.getTplPath(file);
    this.fs.copyTpl(tplPath, to, data);
  }

  copy(file, to) {
    const tplPath = this.getTplPath(file);
    this.fs.copy(tplPath, to);
  }

  write () {
    console.log();
    console.log(chalk.green(`vue组件 - ${this.conf.name} 构建开始`));
    const tplBuilder = require('../../templates/vue-component/index');
    tplBuilder(this, this.conf, () => {
      console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建vue组件 - ${this.conf.name} 成功！`)}`)
      console.log();
      console.log(chalk.grey(`开始项目:  cd ${this.conf.name } && npm install`));
      console.log();
    });

  }

  static ask () {
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
      message: '请输入作者：'
    })

    return inquirer.prompt(prompts)
  }
}

module.exports = VueComponent
