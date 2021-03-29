
- [环境安装](#环境安装)
    - [安装@vue/cli](#安装vuecli)
    - [安装yarn](#安装yarn)
    - [创建项目](#创建项目)
    - [运行项目](#运行项目)
- [集成typescript](#集成typescript)
    - [安装](#安装)
    - [生成配置文件](#生成配置文件)
    - [ts配置](#ts配置)
- [JSX的使用](#jsx的使用)
    - [安装jsx-next](#安装jsx-next)
    - [配置babel](#配置babel)
    - [TypeSript 中使用](#typesript-中使用)
- [sass集成](#sass集成)
    - [安装](#安装-1)
    - [配置全局样式](#配置全局样式)
- [vue-router安装](#vue-router安装)
    - [vue-router安装](#vue-router安装-1)
    - [vue-router配置](#vue-router配置)
    - [vue-router引入](#vue-router引入)
- [vuex](#vuex)
    - [vuex安装](#vuex安装)
    - [vuex配置](#vuex配置)
    - [vuex引入](#vuex引入)
    - [vuex使用](#vuex使用)
- [mobile: vant@3](#mobile-vant3)
    - [vant安装](#vant安装)
    - [vant引入](#vant引入)
    - [rem布局适配](#rem布局适配)
    - [底部安全区适配](#底部安全区适配)
    - [桌面端适配](#桌面端适配)
- [Ant Design Vue@2](#ant-design-vue2)
    - [安装](#安装-2)
    - [引入](#引入)



## 环境安装

#### 安装@vue/cli

```
npm install -g @vue/cli
```

查看版本 `vue -V`

#### 安装yarn
```
npm install -g yarn
```

查看版本 `yarn -v`

#### 创建项目
```
vue create vue3_project
```

#### 运行项目

```
$ cd vue3_project
$ yarn serve 
```

<br>

## 集成typescript

#### 安装
```
yarn add typescript -D
yarn add ts-loader  -D
```

#### 生成配置文件
```
npx tsc --init
```

可见项目根目录下生成了`tsconfig.json`

#### ts配置

将vue中的script标签修改为 `<script lang='ts'>`

将main.js修改为main.ts

报错1 


修改`package.json`指令

```
  "scripts": {
    "serve": "vue-cli-service serve src/main.ts",
    "build": "vue-cli-service build src/main.ts",
    "lint": "vue-cli-service lint"
  },
```

报错2


解决方式：让ts识别vue

`src`下新建`shim.d.ts`，插入以下代码
```
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

## JSX的使用

#### 安装jsx-next

```
yarn add @vue/babel-plugin-jsx 
```
#### 配置babel


```
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

#### TypeSript 中使用

```
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}

// 如果loader有问题，需要配置webpack
{
  test:/\.tsx$/,
  loader:'babel-loader',
  exclude:/node_modules/
}

```


## sass集成

#### 安装
```
yarn add  sass sass-loader node-sass -D
```

#### 配置全局样式
`@assets`下创建css文件夹，创建common.scss文件

vue.config.js中配置

```
module.exports = {
  css:{
    prependData:{
      scss:{
        additionalData:` @import "@/assets/css/common.scss";`
      }
    }
  }
}
// 如果报错，将prependData改为additionalData，自行查看版本配置
```

## vue-router安装


#### vue-router安装

不能通过`yarn add vue-router`安装，因为最高只能安装到3.4.9，安装4.0+需要指定版本号

```
yarn add vue-router@4
```

#### vue-router配置

`src`下新建`router`目录，添加`index.ts`文件，文件中内容
```
import {createRouter, createWebHashHistory} from 'vue-router'

// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式
  history: createWebHashHistory(),
  // 路由地址
  routes: []
})
```

#### vue-router引入

修改`main.ts`文件内容如下

```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const  app = createApp(App)
// 通过use 将 路由插件安装到 app 中
app.use(router)
app.mount('#app')

```

> 报错
> 解决：新建vue.config.js,添加引入类型配置

```
module.exports = {
    configureWebpack:{
        resolve:{
            extensions:['.ts','.js','.vue']
        }
    }
}
```

## vuex

#### vuex安装

```
yarn add vuex@4.0.0-beta.4
```

#### vuex配置

在项目`src`目录下面新建`store`目录，并添加`index.ts`文件，文件中添加以下内容

```
import { createStore } from 'vuex'

export default createStore({
  state:{
    count:1
  },
  mutations:{
    add(state){
      state.count++
    }
  },
  actions:{ },
  modules:{ }
});
```

#### vuex引入

```
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import store from './store/index'

const  app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

```
#### vuex使用

可以修改helloworld文件如下，查看页面是否成功引入
```
<template>
  当前数值:{{ count }}
  <button @click="add">增加</button>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "HelloWorld",
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const add = () => {
      store.commit("add");
    };
    return { count, add };
  },
};
</script>
```




## mobile: vant@3

#### vant安装

```
yarn add vant@next
```

#### vant引入

安装`ts-import-plugin`用来按需引入

```
yarn add ts-import-plugin
```

`vue.config.js`中增加配置

```
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(jsx|tsx|js|ts)$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory( /** options */)]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    },
                    exclude: /node_modules/
                }
            ]
        },
    }
}
```
创建`config`文件夹，新建`vantComponents.ts`文件，引入需要的组件，以button为例

```
import { Button} from 'vant'
import {App} from 'vue'
export default function install (app:App){
    app.use(Button)
}
```

`main.ts`中引入
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vantComponents from './config/vantComponents'
import 'vant/lib/index.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(vantComponents)
app.mount('#app')

```



#### rem布局适配


rem换算工具

```
yarn add postcss-pxtorem
```
浏览器前缀处理
```
yarn add autoprefixer@9
```
// autoprefixer默认安装版本为10.0+，这里需要降级到9，否则报错


配置webpack

```
const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem')

module.exports = {
  css:{
    loaderOptions:{
      postcss:{
        plugins:[
          autoprefixer(),
          postcssPxtorem({
            rootValur:37.5,
            propList:['*']
          })
        ]
      }
    }
  }
}
```

viewport校准：在html模版中增加标签

```
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```


#### 底部安全区适配

```
<!-- 开启顶部安全区适配 -->
<van-nav-bar safe-area-inset-top />

<!-- 开启底部安全区适配 -->
<van-number-keyboard safe-area-inset-bottom />
```

#### 桌面端适配

安装和引入，不需要桌面端跳过这步
```
npm i @vant/touch-emulator -S
import '@vant/touch-emulator';
```

##  Ant Design Vue@2

#### 安装

```
yarn add ant-design-vue@next
```

#### 引入

config文件夹下新建antComponents.ts文件，引入需要的组件，以button为例

```
import { Button} from 'ant-design-vue'
import {App} from 'vue'
export default function install (app:App){
    app.use(Button)
}
```

main.ts中引入
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import antComponents from './config/antComponents'
import 'ant-design-vue/dist/antd.css'
const  app = createApp(App)
app.use(router)
app.use(store)
app.use(antComponents)
app.mount('#app')
```
