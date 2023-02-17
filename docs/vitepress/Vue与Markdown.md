---
title: 在markdown中使用vue
outline: 2
---

# {{$frontmatter.title}}

本文档参考[`vitepress`官网](https://vitepress.vuejs.org/guide/using-vue)

## 介绍

可以在markdown中使用vue的语法

## 模板

### 插值

比如你这样写

```markdown
{{ 1 + 1 }}
```

它其实会显示`{{ 1 + 1 }}`

### 指令

比如

```markdown
<span v-for="i in 3">{{ i + ' ' }}</span>
```

它会输出

<span v-for="i in 3">{{ i + ' ' }}</span>

### 使用useData获取页面数据

```markdown
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
```

会输出

```markdown
{
  "title": "在markdown中使用vue",
  "description": "",
  "frontmatter": {
    "title": "在markdown中使用vue",
    "outline": 2
  },
  "headers": [
    {
      "level": 2,
      "title": "介绍",
      "slug": "介绍",
      "link": "#介绍",
      "children": [
        {
          "level": 3,
          "title": "插值",
          "slug": "插值",
          "link": "#插值",
          "children": []
        },
        {
          "level": 3,
          "title": "指令",
          "slug": "指令",
          "link": "#指令",
          "children": []
        }
      ]
    }
  ],
  "relativePath": "vitepress/Vue与Markdown.md",
  "lastUpdated": 1667953978000
}
```

## v-pre

使用`v-pre`包装可以忽略`vitepress`对`markdown`的影响

比如

```markdown
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

它输出

::: v-pre
`{{ This will be displayed as-is }}`
:::

如果不包装，就会因为`vue`的插值语法而报错，因为字符串没加引号

## 使用组件

### 引入组件

我写了个`test.vue`文件，当作组件，内容是

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const count = ref(0)
onMounted(()=>{
    setInterval(()=>{
        count.value++
    },1000)
})
</script>

<template>
    <div>
        {{count}}
    </div>
</template>
```

现在引入并使用它

::: v-pre

```markdown
<script setup>
    import Test from './components/test.vue'
</script>

<Test />
```

:::

它会自动计数，如下：

<script setup>
    import Test from './components/test.vue'
</script>

<Test />

### 在theme中注册全局组件

在`.vitepress/theme/index.ts`里这么写

```js
import DefaultTheme from 'vitepress/theme'
import Test1 from '../../components/test.vue'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        ctx.app.component('Test1', Test1)
    }
}
```

`Test1`是一个全局组件，作用和上面的那个组件差不多，只不过每次加2

<Test1 />

### 在标题中使用vue组件

比如：下面加一个用于测试的4级标题，使用之前的计数器组件

#### 计数器 <div style="display: inline-block;"><Test /></div>

它的写法如下：

```markdown
计数器 <div style="display: inline-block;"><Test /></div>
```

### 使用css预处理器

它支持`.sass` `.scss` `less` `.styl` `.stylus`文件

我们使用`sass`进行测试

安装

```shell
npm install -D sass
```

使用：测试一段文字，使其颜色为蓝色加粗

<div class="text">这是一段文字</div>

<style lang="sass" scoped>
.text
    color: blue
    font-weight: bold
</style>

在`markdown`里是这么写的

```markdown
<div class="text">这是一段文字</div>
<style lang="sass" scoped>
.text
    color: blue
    font-weight: bold
</style>
```

### 脚本和样式提升

这个参考[官方文档](https://vitepress.vuejs.org/guide/using-vue#script-style-hoisting)

