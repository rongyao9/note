# build打包后各个模块大小可视化
1.在package.json中修改

    "build":'veu-cli-service build'
    "build":'veu-cli-service build --report'


2.执行命令： 

```
npm run build
```

3.打包后会在`outputDir`路径下（打包后路径）生成`report.html`文件
  `report`会记录各个模块的详细大小
