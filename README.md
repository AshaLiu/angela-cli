## angela-cli

### 安装
`npm i @souche-digital-marketing/angela-cli --save-dev`

### 创建一个lib库工程
`angela create`，选择library

tips：

1. 该项目引用了 `babel7` 来转义
2. 使用 `rollup.js` 打包，会生成 `umd` 、 `amd` 、`commonjs` 规范的三种包

### 创建一个 vue-component 组件工程
`angela create`，选择vue-component

tips：

1. 该项目用了 `webpack + less + babel` 来打包
2. 打包后是一个 `umd` 规范

