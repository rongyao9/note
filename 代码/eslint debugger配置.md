#### 报错信息
> error  Unexpected 'debugger' statement  no-debugger

#### 处理方案

在项目根目录下创建`.eslintrc.js`文件，并添加如下代码

<pre>   
module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [ 
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
}
</pre>

#### other：vscode md增强插件

`Markdown All in One`<br>
`Markdown Preview Github Styling`