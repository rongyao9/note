## element官网未介绍的隐藏组件

### 滚动条组件 

```
<el-scrollbar></el-scrollbar>
```

#### props:
    native:是否原生滚动（必须是false开启组件）
    warp-class:滚动条容器的class名
    view-class:滚动条视图的class名
    warp-style:滚动条容器的样式
    view-style:滚动条视图的样式
    tag:组件容器的标签类型    //type:String;default:div
    noresize:如果container尺寸不会发生变化，最好设置它可以优化性能
#### 用法:

    外层容器设置高度，el-scrollbar的高度100%，包裹住需要滚动的dom结构