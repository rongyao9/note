1.在package.json中修改

    "build":'veu-cli-service build'
    "build":'veu-cli-service build --report'


2.执行命令： npm run build

3.打包后会在outputDir路径下（打包后路径）生成report.html文件
  report会记录各个模块的详细大小
