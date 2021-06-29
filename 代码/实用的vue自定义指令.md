# 实用的vue自定义指令

在 Vue，除了核心功能默认内置的指令，Vue 也允许注册自定义指令。它的作用价值在于当开发人员在某些场景下需要对普通 DOM 元素进行操作。

## 使用前注册

### vue2

批量注册指令，新建 directives/index.js 文件：

```
import copy from './copy'
import longpress from './longpress'
// 自定义指令
const directives = {
  copy,
  longpress,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
```
在 main.js 引入并调用：

```
import Vue from 'vue'
import Directives from './JS/directives'
Vue.use(Directives)

```
### vue3
批量注册指令，新建 /setup/directives/index.js 文件：

```
import type{ App } from 'vue'

import { setupStopPropagation } from './stopPropagation'
import { setupToggleTouch } from './toggleTouch'

export function setupGlobDirectives (app: App){
  setupStopPropagation(app)
  setupToggleTouch(app)
}

```

在 main.js 引入并调用：

```
import App from './App.vue'
import { setupGlobDirectives } from '@/setup/directives'
const app = createApp(App)
setupGlobDirectives(app)
```


##### 指令定义函数提供了几个钩子函数（可选）：
- bind: 只调用一次，指令第一次绑定到元素时调用，可以定义一-个在绑定时执行一次的初始化动作。
- inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: 只调用一次， 指令与元素解绑时调用。


##### 几个实用的 Vue 自定义指令：

- 阻止冒泡 v-stopPropagation
- 移动端触屏事件 v-toggleTouch
- 复制粘贴指令 v-copy
- 输入框防抖指令 v-debounce
- 禁止表情及特殊字符 v-emoji

## v-stopPropagation

 需求：阻止冒泡

```
import { Directive, App } from 'vue'

const stopPropagation: Directive = {

  mounted (el) {
    el.onclick = (e:Event) => {
      e.stopPropagation
    }
  }
}

export function stopStopPropagation(app: App){
  app.directive('stopPropagation',stopPropagation)
}
```

## v-toggleTouch

需求：切换移动端触屏状态

```
import { Directive, App } from 'vue'
import store from '@/store'

const toggleTouch: Directive = {
  mounted (el) {
    el.ontouchstart = () => {
      const touching = true
      store.commit('SET_TOUCHING',touching)
    }
    el.ontouchend = () => {
      const touching = false
      store.commit('SET_TOUCHING',touching)
    }
  }
}

export function setupToggleTouch (app: App) {
  app.directive('toggleTouch', toggleTouch)
}
```


## v-copy

需求：

实现一键复制文本内容，用于鼠标右键粘贴。

思路：
+ 动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域

+ 将要复制的值赋给 textarea 标签的 value 属性，并插入到 body
+ 选中值 textarea 并复制
+ 将 body 中插入的 textarea 移除
+ 在第一次调用时绑定事件，在解绑时移除事件

```
const copy = {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        console.log('复制成功') // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}

export default copy
```

使用：给 Dom 加上 v-copy 及复制的文本即可

```
<template>
  <button v-copy="copyText">复制</button>
</template>

<script> export default {
    data() {
      return {
        copyText: 'a copy directives',
      }
    },
  }
</script>
```

## v-debounce

背景：

在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如新增表单的提交按钮，多次点击就会新增多条重复的数据。

需求：

防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。

思路：

定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。将时间绑定在 click 方法上。

```
const debounce = {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  },
}

export default debounce

```

使用：给 Dom 加上 v-debounce 及回调函数即可

```
<template>
  <button v-debounce="debounceClick">防抖</button>
</template>

<script> 
export default {
  methods: {
    debounceClick () {
      console.log('只触发一次')
    }
  }
} 
</script>

```


## v-emoji

需求：根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入表情和特殊字符为例。

```
let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}
 
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
 
const emoji = {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      $inp.value = val.replace(regRule, '')
      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  },
}
export default emoji
```

使用：将需要校验的输入框加上 v-emoji 即可

```
<template>
  <input type="text" v-model="note" v-emoji />
</template>
```