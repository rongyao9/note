# BEM思想（css命名规范）

在团队开发中，由于缺乏规范，样式管理一直是开发中的痛点，样式污染，难以定制化，依赖性高，各种问题层出不穷。

而BEM是一个非常有用，强大，简单的命名约定，可以让你的前端代码更容易阅读和理解，更容易协作，更容易控制。

当然，通常人们会认为BEM写法难看，但是他的好处远远超过它外观上的那点瑕疵。
#### 1. BEM命名约定
<pre>

BEM：块（block）、元素（element）、修饰符（modifier）
命名约定的模式

.block{}
.block__element{}
.block--modifier{}
</pre>

其中块可以用单个连字符来界定：如
<pre>
.site-search{} //块
.site-search__field{} //元素
.site-search--full{} //修饰符
</pre>
#### 2. 如何使用BEM
+ Block:一个独立的，可以复用而不依赖其他组件的部分，可作为一个块

+ Element:属于块的某部分，可作为一个元素

+ Modifier:用于修饰块或元素，体现出外形行为状态等特征的，可作为一个修饰器

>_1）保证各个部分只有一级B__E–M，修饰器需要和对应的块或元素一起使用，避免单独使用_<BR>
>_2）仅以类名作为选择器，不使用ID或标签名来约束选择器，且css中的选择器嵌套不超过2层_<BR>
>_3）避免 .block__el1__el2 的格式_

如：



```
//css为例
<p class="article">
    <p class="article__body">
        <p class="tag"></p>
        <button class="article__button--primary"></button>
        <button class="article__button--success"></button>
    </p>
</p>


//less为例
.article {
    max-width: 1200px;
    &__body {
        padding: 20px;
    }
    &__button {
        padding: 5px 8px;
        &--primary {background: blue;}
        &--success {background: green;}
    }
}
```

BEM 规范虽然结构比较清晰，但有时候会产生代码冗余。

>为避免写太多重复性的代码，我们要学会善于利用预编译语言的（适当地使用 @include @extend 等）

#### 3. 总结：
BEM 最难的部分之一是明确作用域是从哪开始和到哪结束的，以及什么时候使用或不使用它。随着不断使用的经验积累，你慢慢就会知道怎么用，这些问题也不再是问题。