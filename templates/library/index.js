const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')

module.exports = function(creator, options, callback) {
  const { name, description, author } = options;

  // 获取当前命令的执行目录，注意和项目目录区分
  const cwd = process.cwd();
  // 项目目录
  const projectPath = path.join(cwd, name);
  // const buildPath = path.join(projectPath, 'build');
  // const pagePath = path.join(projectPath, 'page');
  const srcPath = path.join(projectPath, 'src');

  // 新建项目目录
  // 同步创建目录，以免文件目录不对齐
  fs.mkdirSync(projectPath);
  // fs.mkdirSync(buildPath);
  // fs.mkdirSync(pagePath);
  fs.mkdirSync(srcPath);
  creator.copyTpl('pkg', path.join(projectPath, 'package.json'), {
    name,
    description,
    author
  });
  creator.copy('index.js', path.join(srcPath, 'index.js'));
  creator.copy('rollup.config.js', path.join(projectPath, 'rollup.config.js'));
  creator.copy('.babelrc', path.join(projectPath, '.babelrc'));
  creator.copy('../../common/commitlint.config.js', path.join(projectPath, 'commitlint.config.js'));
  creator.copyTpl('../../common/README.md', path.join(projectPath, 'README.md'), {
    name
  });
  creator.copy('../../common/.editorconfig', path.join(projectPath, '.editorconfig'));
  creator.copy('../../common/gitignore', path.join(projectPath, '.gitignore'));
  creator.fs.commit(() => {
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建项目: ${name}`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建目录: ${name}/src`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${name}/src/index.js`)}`);

    // install
    const command = 'npm install'
    const installSpinner = ora(`执行安装项目依赖 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()
    const install = exec(command)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        installSpinner.color = 'red'
        installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'))
        console.log(error)
      } else {
        installSpinner.color = 'green'
        installSpinner.succeed('安装成功')
        console.log(`${stderr}${stdout}`)
      }
      console.log(chalk.green(`创建项目 ${chalk.green.bold(name)} 成功！`))
      console.log(chalk.green(`请进入项目目录 ${chalk.green.bold(name)} 开始工作吧！😝`))
      if (typeof cb === 'function') {
        cb()
      }
    })

    callback();
  });
}
