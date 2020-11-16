# GPU加速，css性能分析

### 实验

首先在页面插入2000个div

```
  window.onload = ()=>{
   let times = 0
   while(times <2000){
    let div = document.createElement('div')
    div.className ='running'
    document.body.appendChild(div)
    times++
   }
  }
  ```

  接着添加样式和animation动画：
  ```
  .running {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: pink;
  animation: run 4s infinite;
  -webkit-animation: run 4s infinite;
}

@keyframes run {
  0% {
    top: 0;
    left: 0;
  }

  25% {
    top: 0;
    left: 200px;
  }

  50% {
    top: 200px;
    left: 200px;
  }

  75% {
    top: 200px;
    left: 0;
  }
}
```

看一下效果和performance性能分析



css 动画的GPU加速