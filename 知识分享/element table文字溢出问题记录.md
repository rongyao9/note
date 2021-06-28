# element 文字溢出问题记录


## 需求

table文字超出部分显示...，鼠标悬停通过tooltip显示全部内容

## 处理方式

1. `table-column` 增加属性

```
show-overflow-tooltip='true'
```

2. 设置溢出的css

```
.ellipsis{
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
```

## 存在问题

el-table的tooltip**鼠标无法停留在tooltip内部**，用户不方便复制tooltip中的内容

## 排查

在官网示例中测试依然会出现此情况。所以确定：element的表格开启show-overflow-tooltip后，溢出显示的tooltip鼠标无法停留其中

![Alt text](/src/img/el-table-show-overflow-tooltip.gif)

但是，el-tooltip组件是带有enterable（鼠标是否可进入到 tooltip 中）属性的，且默认为true

![Alt text](/src/img/el-tooltip-attr.png)

所以要排查这个问题，需要看底层具体的实现逻辑。这里贴出el-table和el-tooltip相关的部分源码：

`packages\table\src\table-body.js`

![Alt text](/src/img/el-table-problem.png)

![Alt text](/src/img/el-table-setExpectedState.png)

`packages\tooltip\src\main.js`

`expectedState` 代表鼠标是否移入进tooltip，`MouseLeave` 触发会直接调用关闭方法

![Alt text](/src/img/el-tooltip-dom.png)

![Alt text](/src/img/el-tooltip-activateTooltip.png)

// `handleClosePoper` 

关闭的判断条件：开启 `enterable` 并且鼠标状态在tooltip中（expectedState===true），tooltip 将不会关闭。

![Alt text](/src/img/el-tooltip-handleShowPopper.png)

总结：table调用tooltip没有这个逻辑的判断，直接将expectedState置为false并关闭。

*manual:手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效*

## 解决

### 方案一、修改底层逻辑

1. 调用前重置鼠标停留状态；
2. 判断计时器，用于节流和校准单元格；
3. 创建定时器判断是否存在鼠标停留；
4. 不变动tooltip，只更改table调用

![Alt text](/src/img/el-table-fixcode.png)


### 方案二、直接修改组件库代码并不是最佳方法，这里提出一种应用层解决方案

思路：自行控制tooltip代替show-overflow-tooltip，判断溢出状态并控制显示

1.删除table的show-overflow-tooltip属性

2.增加tooltip组件

```
<el-table-column width='350'>
  <template slot-scope='scope'>
    <el-tooltip :disabled='getDisabled(scope.row.remark)'>
      <div class='remark-tooltip'>{{scope.row.remark}}</div>
    </el-tooltip>
  </template>
</el-table-column>
```

这样设置后会出现一个问题，所有的节点都会显示tooltip，而这里的需求只对溢出的节点进行tooltip，所以要进行**dom是否溢出**的判断。问题在于此时的生命周期中还没有进行 UI render，拿不到相关属性。所以这里创建一个节点插入body中模拟可能出现的情况，拿到 clientWidth + scrollWidth 来判断溢出状态，结合 el-tooltip 组件的 disabled 属性进行显示控制。
```
getDisabled (text) {
    let div = document.createdElement('div')
    div.className += 'ellipsis'
    div.innerHTML = text
    // width是判断溢出的阈值，如果为封装的table可以通过参数传入
    div.style.width = '350px'
    document.body.append(div)
    const { scrollWidth, clientWidth} = div
    const disabled = scrollWidth <= clientWidth
    document.body.removeChild(div)
    return disabled
}
```
最后，对于tooltip中的内容，进行换行优化

```
.remark-tooltip{
  white-space:pre-wrap;
}
```

最终效果

![Alt text](/src/img/el-table-fix.gif)