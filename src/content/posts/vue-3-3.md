---
title: Vue 3.3 主要新特性详解
date: 2023-05-12
description: defineOptions、defineModel、defineSlots 等新特性详解，以及背后的开发故事。
---

## 前言

Hi，这里是三咲智子，Vue 核心团队成员。Vue 3.3 的这次发布主要是为了改进 DX （开发者体验），新增了一些语法糖和宏，以及 TypeScript 上的改善。

- 泛型组件
- 在 SFC（单文件组件）中导入外部 TS 类型
- `defineSlots` 来定义插槽的类型
- `defineEmits` 更便捷的语法
- `defineOptions` 定义组件选项
- (试验性) 响应式的 props 解构
- (试验性) `defineModel` 语法糖
- 废弃 Reactivity Transform

在去年刚加入 Vue 的那段时间，我一直在为 Vue 3 贡献 PR，但最近才最终在 Vue 3.3 中落地。Vue 3.3 从 [Vue Macros](https://vue-macros.sxzz.moe/) 一共吸收了五六个特性，今天来浅谈我自己贡献的部分。

## defineOptions 宏

- PR: https://github.com/vuejs/core/pull/5738
- RFC: https://github.com/vuejs/rfcs/discussions/430
- 开发实录：https://www.bilibili.com/video/BV1uu411y7WE

### 前情提要

想想我们在有 `<script setup>` 之前，如果要定义 `props`, `emits` 可以轻而易举地添加一个与 `setup` 平级的属性。 但是用了 `<script setup>` 后，就没法这么干了—— `setup` 属性已经没有了，自然无法添加与其平级的属性。为了解决这一问题，我们引入了 `defineProps` 与 `defineEmits` 这两个宏。

但这只解决了 `props` 与 `emits` 这两个属性。如果我们要定义组件的 `name`、 `inheritAttrs` 或其他自定义的属性，还是得回到最原始的用法——再添加一个普通的 `<script>` 标签。这样就会存在两个 `<script>` 标签。对我个人来说这是不可接受的。

- 两个 `script` 标签可能会对 ESLint 插件或 Volar 有非预期的问题；
- 如果两个 `script` 标签都存在 import 语句，Vue 会做一些奇怪的特殊处理；
- 对于 DX （开发者体验）来说，不仅麻烦，还难以理解。

### 现状

所以我们在 Vue 3.3 中新引入了 `defineOptions` 宏。顾名思义，主要是用来定义 Options API 的选项。我们可以用 `defineOptions` 定义任意的选项， `props`, `emits`, `expose`, `slots` 除外（因为这些可以使用 defineXXX 来做到）。我们甚至可以不用 `<template>` 标签，而直接在 `defineOptions` 中用 h 函数或 JSX 写渲染函数 `render`（当然并不推荐这样用）。

### 🌰 例子

```vue
<script setup>
defineOptions({
  name: 'Foo',
  inheritAttrs: false,
  // ... 更多自定义属性
})
</script>
```

[Vue SFC Playground](https://play.vuejs.org/#eNolzDEKgDAMQNGrhC4qiO5FBBdXL9BFNGJA09BEF/HuKo7/D+9ynUh1Hui8a3RKJAaKdkgbeMaFGAcxiqz5FRiAxx09ZH2MWfk18YqJrDNL6mEZN8X330Xgpv611t0P8xsjNQ==)

### 背后的故事

关于这个特性的起源，是在重构 Element Plus 的组件为 `<script setup>` 的时候。对于组件库来说，我们希望自定义组件的名字（`name` 属性），而不是默认的文件名。但我又不希望回到原来的书写方式，就写了一个插件（梦开始的地方 🤣）[`unplugin-vue-define-options`](https://www.npmjs.com/package/unplugin-vue-define-options)。几经修改才确定和实现了目前 Vue 3.3 有的 `defineOptions` 宏。

## 提升静态常量

- PR: https://github.com/vuejs/core/pull/5752
- 开发实录：https://www.bilibili.com/video/BV1st4y1G7sG

这个功能是一个 SFC （单文件组件）编译器的优化。在 `script` 部分新增了 `hoistStatic` 选项。

### 模板中的 `hoistStatic`

`template` 下的 `hoistStatic` 与它基本类似。Vue 编译器有一个优化——它能够让静态的元素节点提升到顶级作用域。这样仅在代码被加载的时候执行一次，而不是每次执行 `render` 函数的时候被重复执行（在极端情况下可能也有其弊端）。

让我们来看一个例子 🌰。

```vue
<template>
  <div id="title">Hello World</div>
</template>
```

[Vue SFC Playground](https://play.vuejs.org/#eNqrVnIsKNArK01VslKyKUnNLchJLEm1i8lTULBJySxTyEyxjVEqySzJSY1RsvNIzcnJVwjPL8pJsdEHygKV2ejD9SjVAgDb8hoW)

以上这段代码会被编译成以下这段 JavaScript （非关键代码已省略）

```js
const _hoisted_1 = { id: 'title' }
function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock('div', _hoisted_1, 'Hello World'))
}
```

我们可以看到 `_hoisted_1` 变量就是被编译器故意提升到顶层的代码。如果关闭此功能，则它会在 render 函数内。

### script 标签的 hoistStatic

在 Vue 3.3 之前，只有上述一个功能。我们在 Vue 3.3 也做了类似的优化——如果一个常量的值是 primitive value（[基本类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)，即为 string, number, boolean, bigint, ~~symbol~~, null, undefined），那么该常量声明会被提升到顶层。（注：symbol 目前并未被实现）

因为这些类型的常量是无法被改变的，所以它不论在哪被声明，效果都是一样的。

### 作用

这个特性除了性能优化之外，还有一个更有用的地方。在 Vue 3.3 之前我们在使用宏时，是没有办法传递定义在 `<script setup>` 块的变量的。看看下面的例子。

```vue
<script setup>
const name = 'Foo'
defineOptions({
  name,
})
</script>
```

[Vue SFC Playground](https://play.vuejs.org/#eNp9jt1KA0EMhV9lmJsqdGdABWGpUl9AvDde1N1UR5kkJLP1ouy7O6st9Ad6me8k+c7WP4mEzYC+9QvrNElxhmWQR6COyYoTZXleZXQPbrZmngH1uE6EL5Xb1es+frsGWsT/D/XWz33KwlqavJLwZUxVsAVyDnaBgW/dH5lYbTDN4D9LEWtjHEi+P0LHOS5rFnWgkjI2PeflbbgJd/exT1YOeUDLzbvyj6FWI/j5wfNY4Qa1Uaz1FfWi7GT3SHiSnUkn5wg0+vEX+UN45g==)

我们会得到一个报错。

```
[@vue/compiler-sfc] `defineOptions()` in <script setup> cannot reference locally declared variables because it will be hoisted outside of the setup() function. If your component options require initialization in the module scope, use a separate normal <script> to export the options instead.
```

这是因为之前提到的原因，`defineProps` 会添加一个与 `setup` 平级的 `props` 属性，而 `name` 常量又是声明在 `setup` 函数内的。我们无法在函数外部引用一个在其内部的变量，这是因为该变量压根还没有被初始化。以下代码毫无疑问是错误的。

```js
const __sfc__ = {
  props: [propName],
  setup(__props) {
    const propName = 'foo'
  },
}
```

在 Vue 3.3 之后，第 4 行的 `propName` 就会提升到第一行，那么代码就完全说得通了。本特性默认是开启的。在一般情况下，开发者也无需感知该特性是存在的。

### 背后的故事

开发这个特性的原因也与上一个类似。是因为 Element Plus 在用 `defineOptions` 设置好 `name` 之后，又需要在某些条件下抛出一个异常。而异常需要带有组件的名字，来方便用户调试。

```vue
<script setup>
const name = 'ElButton'
defineOptions({
  name,
})
// ...
if (condition) {
  throw new Error(`${name}: something went wrong.`)
}
</script>
```

所以我希望避免重复的代码，把组件名称抽离成一个常量，并分别在 `defineOptions` 与抛异常的时候引用。

## defineModel 宏

- PR: https://github.com/vuejs/core/pull/8018
- RFC: https://github.com/vuejs/rfcs/discussions/503
- 开发实录：[第一期](https://www.bilibili.com/video/BV1MS4y1t7Pi)，[第二期](https://www.bilibili.com/video/BV1sY4y1P7gD)
- Twitter: https://twitter.com/sanxiaozhizi/status/1644564064931307522

### 动机

这个宏是一个纯粹的语法糖。在 Vue 3.3 之前，如果我们要定义一个双向绑定的 prop，是一件挺麻烦的事情。

```vue
<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (evt: 'update:modelValue', value: number): void
}>()

// 更新值
emit('update:modelValue', props.modelValue + 1)
</script>
```

我们需要先定义 `props`，再定义 `emits` 。其中有许多重复的代码。如果需要修改此值，还需要手动调用 `emit` 函数。

我在想：我们为什么不封装一个函数（宏）来简化这个步骤呢？因此就有了 `defineModel` 宏。

### 🌰 例子

```vue
<script setup>
const modelValue = defineModel()
modelValue.value++
</script>
```

以上繁琐的 7 行代码，在 Vue 3.3 中可以简写为两行！

### 与 `useVModel` 的区别

在 VueUse 中也有 `useVModel` 函数可以实现类似的效果。为什么我们还要引入这个宏呢？

这是因为 VueUse 只是把 `props` 和 `emit` 函数结合后，封装为了一个 `Ref`，它无法为组件定义 `props` 和 `emits`。这意味着开发者仍需手动分别调用 `defineProps` 和 `defineEmits`。

### 背后的故事

😛 这个背后就没什么故事了，纯粹是觉得写着麻烦。起初是在 [Vue Macros](https://vue-macros.sxzz.moe/) 做了 `defineModel` 的宏（现改名为 `defineModels`，与官方做出区分），用着效果还不错。

## 在 SFC 导入外部类型

### 背景

在 Vue 3.2 发布以来，Vue 有一个参与热度最高的 issue——[如何在 defineProps 上使用外部的类型](https://github.com/vuejs/core/issues/4294)。

为了解决这个问题，摆在我们面前的有两条路。

- Vue SFC 编译器去调用 TypeScript 编译器。计算出最终的类型，并确定它到底包含了哪些类型（`String`, `Number`, `Boolean`, `Function` 等）。
- 我们自己实现一个简易的 TypeScript 分析器，并解决大多数的场景。

众所周知，TypeScript 的类型体操有多恐怖。如果真的要完美地解决这个 issue，Vue 的 SFC 编译器就需要像 TypeScript 编译器一样，解析并计算出所有的类型。第一套方案虽好，但是也有个巨大的缺点：这必不可免地需要依赖 TypeScript 那套庞大而又臃肿的编译器，会极大地拖慢构建的时长。

最后，在 [Vue Macros](https://vue-macros.sxzz.moe/) 中我还是选择了第二套方案。因此目前并不适合在宏中传递复杂的类型。不过这将在以后被逐步完善。

### Vue 3.3 与 Vue Macros

Vue Macros 实现了这套简易分析器后，Vue core 也做了类似的实现。

但是就目前而言，仍有差异。Vue Macros 的迭代速度远远快于 Vue core 本身，Vue Macros 目前正在支持更多奇奇怪怪的语法，而 Vue 3.3 有部分语法仍不支持。

所以在未来，如果遇到了 Vue 无法解析的类型，不妨试试 Vue Macros。如果 Vue Macros 仍然不行，可以尝试**附带最小可复现代码**，在 Vue Macros 仓库发起一个 issue。或尝试换一个更简单、避免二次推断的语法。

## defineSlots 宏

- PR: https://github.com/vuejs/core/pull/7982
- Twitter: https://twitter.com/sanxiaozhizi/status/1641378248448937984

### 背景

Vue 3.3 新增了 `defineSlots` 宏。我们可以使用 `defineSlots` 自己定义插槽的类型。这个宏在简单的组件中几乎用不到，但对于一些复杂的组件非常有用，尤其是这个特性与泛型组件一起使用。或是在 Volar 无法正确地推测出类型时，我们可以手动指定。

### 🌰 例子

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { foo: string; bar: number }): any
}>()
</script>
```

我们手动定义了 `default` 组件的插槽作用域的类型。

### 🌰 真的例子

比如我们有一个分页器组件，我们可以通过插槽来控制具体的 `item` 要如何渲染。

```vue
<script setup lang="ts" generic="T">
// 子组件 Paginator
defineProps<{
  data: T[]
}>()

defineSlots<{
  default(props: { item: T }): any
}>()
</script>
```

```vue
<template>
  <!-- 父组件 -->
  <Paginator :data="[1, 2, 3]">
    <template #default="{ item }">{{ item }}</template>
  </Paginator>
</template>
```

我们在传递了 `data` 参数，它是 `number[]`，所以 `item` 也会被推断为 `number`。`item` 的类型会根据传给 `data` 参数的类型而改变。

## defineEmits 更便捷的语法

- PR: https://github.com/vuejs/core/pull/7992
- Twitter: https://twitter.com/youyuxi/status/1641403989026820098

这个特性也是一个纯粹的语法糖。

### 例子

```vue
<script setup lang="ts">
const emits = defineEmits<{
  (evt: 'update:modelValue', value: string): void
  (evt: 'change'): void
}>()

// ⬇️ Vue 3.3 之后
const emits = defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()
</script>
```

在 Vue 3.3 以前我们需要多写几个字符，现在能省则省。

## 废弃 Reactivity Transform 语法糖

早在年初，Vue 团队已经宣布废弃 Reactivity Transform 语法。具体则会在 Vue 3.3 中被废弃（deprecated），使用时会警告；在 Vue 3.4 则会被彻底移除。

> 我个人认为 Reactivity Transform 仍然有其用武之地的。

虽然被官方废弃了，但功能被移动到了 [Vue Macros](https://vue-macros.sxzz.moe/)。这意味着你仍可以不必着急迁移至老语法，使用[插件](https://vue-macros.sxzz.moe/features/reactivity-transform.html)仍可以正常使用以及后续的漏洞修复。

对于具体为什么移除，可以阅读[此篇评论](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028)。

## 后记

其实总的来说，还是非常高兴能看到 Vue 愿意接受来自社区的建议和提案。这大概就是我对 Vue 3.3 做出的贡献，关于更多特性可以阅读 [Vue 博客的文章](https://blog.vuejs.org/posts/vue-3-3)。

P.S. 如果有人愿意将本篇文章翻译至英文，请在翻译好后提交内容到 [sxzz/articles](https://github.com/sxzz/articles) 仓库，我将不胜感激！

### 关于 Vue Macros

[Vue Macros](https://vue-macros.sxzz.moe/) 目前是一个独立于 Vue 官方的项目。不同于 Vue 官方，它的目的是为了探索一些不一样的可能性。

我更愿意看到一些更激进的想法，哪怕这个想法不那么成熟。我们可以在 Vue Macros 先进一步实验，等成熟了再尝试合并到 Vue 官方仓库中。

目前 Vue Macros 由我一个人维护中，希望能吸引更多来自社区的小伙伴参与建设！ 💕
