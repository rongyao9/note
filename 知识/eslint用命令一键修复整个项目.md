# eslint用命令一键修复整个项目



1.打开package.json，在script里插入


```
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue src/ test/unit test/e2e/specs",
```



2.运行 `npm run lint-fix,`
