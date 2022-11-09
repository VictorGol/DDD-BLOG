---
title: API及内置组件
---

# {{$frontmatter.title}}

本文档参考[官方文档](https://vitepress.vuejs.org/guide/api)

<script setup>
import { useData } from 'vitepress'
import { useRoute } from 'vitepress'
import { useRouter } from 'vitepress'
const data = useData()
const route = useRoute()
const router = useRouter()
</script>

## useData

返回页面相关的数据

```typescript
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
  isDark: Ref<boolean>
}
```

例如这段代码：

```markdown
<script setup>
import { useData } from 'vitepress'
const data = useData()
</script>
<div>{{ data.title }}</div>
```

输出

<div>{{ data.title }}</div>

如果写在markdown里就只能获取对象的一级属性，写在vue里才可以获取多级的。

## useRoute

返回当前`route`对象

```typescript
interface Route {
  path: string
  data: PageData
  component: Component | null
}
```

例如

```typescript
import { useRoute } from 'vitepress'
const route = useRoute()

<div>{{ route.data }}</div>
```

输出

<div>{{ route.data }}</div>

## useRouter

返回`router`实例

```typescript
interface Router {
  route: Route
  go: (href?: string) => Promise<void>
}
```

例如

```typescript
import { useRouter } from 'vitepress'
const router = useRouter()

<div>{{ router }}</div>
```

输出

<div>{{ router }}</div>

## withBase

将基础地址与所给的地址进行合并

```typescript
(path: string) => string
```

示例可参考：[Base URL](./asset-handling#base-url)

## `<Content />`

不太明白

## `<ClinetOnly />`

不太明白