# git-svn 使用

1.在主分支创建代码库推送至远端，主分支为master，其他分支（包括dev）用branches约定

2.创建其他分支到branches下，要基于master创建形成共同祖先关系，否则git-svn无法追踪

3.新建一个开发目录 拉取svn仓库代码

```
git svn clone -r{number}:HEAD {svnpath} {name} -T {catalog} -b {other} --prefix={fixname}/
```



|  字段   | 示例  | 说明 | 
|  ----  | ----  | ---- | 
| number  | 123456 | 版本号，不指定为全部 | 
| svnpath  | http://svn...com |  要拉取的svn地址，要父文件夹，非分支文件夹，否则会创建失败 | 
| name  | tecview | 项目文件夹名称 | 
| catalog  | master | trunk对应目录 | 
| other  | branches | 其他分支对应目录 | 
| fixname  | svn | 远程分支别名 | 





4.查看分支并创建本地分支与远端关联

```
查看远端分支
git branch -a 

新建分支与远端关联
git checkout -b branchname svn/branch
```
5.git-svn相关指令

```
获取远端更新，更新分支情况
git svn fetch --fetch-all

拉取远端分支
git svn rebase (同git pull)

推送远端分支
git svn dcommit (同git push)

其他指令与协作方式同git
```