# git操作指引

##### 1.把远端项目拉到本地：
    git clone “https://xxx.git”(项目地址)

##### 2.更新本地代码（远端有人推送代码了，把他们的提交拽到你本地来）：
    git pull <远程主机名><远程分支名>

> 如果关联远程分支了 直接 git pull就可以。关联远程分支命令 `git branch --set-upstream-to=origin/<branch> `

##### 3.查看本地代码状态
    git status
> 可以看到本地所有有改动的文件状态

##### 4.把改动的代码暂存起来
    git add .
> `·` 代表所有文件，也可以 `git add 文件名` 常用 `git add .`

##### 5.提交代码到本地（提交前必须git add .把要提交的代码添加到暂存区，提交会生成一个提交记录，暂存区的代码也就清空了（被提交了）
    git commit -m '这里写一些提交备注’
>在 `add` 和 `commit `之前之后，随时可以用 `git status` 查看代码状态，红色代表修改的没被 `add` 的文件（也代表删除的，会有信息提示），绿色代表 `add` 过的文件（也代表新增文件的，会有提示）

##### 6.看看当前分支的所有commit提交信息
    git log
> 如果提交了，在这里会有提交信息，按q退出查看

##### 7.推送到远端
    git push <远程主机名><远程分支名>
> 推送的是提交，也就是commit，推送以后在git网站中，大家就可以git pull把你的提交拉到本地了

##### 8.查看本地分支
    git branch
> 查看本地的分支，以及当前在哪个分支上

##### 9.切换分支
    git checkout 分支名
> 切换分支，当前分支必须干净（没有修改或暂存的文件），否则不能切换，可以用 `git status` 查看。如果有改动的文件如何处理？可以 `git add .` 再 `git commit` 提交，或者 `git stash` 暂存，或者 `git reset` 撤销，视具体情况而定）

##### 10.暂存更改
    git stash save "save message"
> 执行存储时，添加备注，方便查找，只有git stash 也是可以的，但查找时不方便识别。

##### 11.撤销/回滚
    git reset --hard 目标版本号
> git reset是回到某次提交，提交及之前的commit都会被保留，但是此commit id之后的修改都会被删除。目标版本号可通过git log查看
