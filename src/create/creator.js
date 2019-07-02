const getGitUser = require('../util/git-user')
const path = require('path')

class Creator {
  constructor () {
    this.gitUser = getGitUser();
    this.init()
  }

  init() {}

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
}

module.exports = Creator
