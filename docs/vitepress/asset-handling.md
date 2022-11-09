---
title: Asset Handling
---

# {{$frontmatter.title}}

本文档参考[官方文档](https://vitepress.vuejs.org/guide/asset-handling)

## Public Files

在docs目录下的public文件夹，会被copy到dist的根目录

引用public里的资源时，直接使用`/资源名`就行了

## Base URL

引用静态资源时，可以在markdown中使用相对路径。

类似这种情况时：

```html
<img :src="theme.logoPath" />
```

最好用withBase包裹

```vue
<script setup>
import { withBase, useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <img :src="withBase(theme.logoPath)" />
</template>
```

