---
title: 'Vue 3.3: Major New Features'
date: 2023-05-12
description: A deep dive into defineOptions, defineModel, defineSlots, and more, plus the stories behind them.
---

## Preface

Hi, I'm Kevin Deng, a member of the Vue core team. Vue 3.3 focused on improving DX (developer experience), adding some syntax sugar and macros, plus TypeScript improvements.

- Generic components
- Import external TS types in SFCs
- `defineSlots` for slot typing
- More ergonomic `defineEmits`
- `defineOptions` for component options
- (Experimental) reactive props destructuring
- (Experimental) `defineModel` sugar
- Deprecation of Reactivity Transform

When I first joined Vue last year, I kept submitting PRs, but only recently did they land in Vue 3.3. Vue 3.3 absorbed five or six features from [Vue Macros](https://vue-macros.dev/). Today I'll talk about the parts I contributed.

## The `defineOptions` macro

- PR: https://github.com/vuejs/core/pull/5738
- RFC: https://github.com/vuejs/rfcs/discussions/430
- Dev logs: https://www.bilibili.com/video/BV1uu411y7WE (Chinese)

### Background

Before `<script setup>`, defining `props` or `emits` was easy -- you could add those options alongside `setup`. But with `<script setup>`, there is no `setup` option anymore, so you can't add sibling options. To solve this, we introduced the `defineProps` and `defineEmits` macros.

But that only covers `props` and `emits`. If you want to define component `name`, `inheritAttrs`, or other custom options, you still had to go back to the old way -- add a normal `<script>` block. That means two `<script>` blocks, which for me is unacceptable.

- Two `<script>` blocks can cause unexpected issues in ESLint plugins or Volar.
- If both `<script>` blocks have imports, Vue does some strange special handling.
- For DX, it's awkward and confusing.

### Current solution

So we introduced the `defineOptions` macro in Vue 3.3. As the name suggests, it's for defining Options API options. You can define any option with `defineOptions`, except `props`, `emits`, `expose`, and `slots` (because those already have dedicated `defineXXX` macros). You can even omit `<template>` and write a render function with `h` or JSX inside `defineOptions` (though this isn't recommended).

### 🌰 Example

```vue
<script setup>
defineOptions({
  name: 'Foo',
  inheritAttrs: false,
  // ...more custom options
})
</script>
```

[Vue SFC Playground](https://play.vuejs.org/#eNolzDEKgDAMQNGrhC4qiO5FBBdXL9BFNGJA09BEF/HuKo7/D+9ynUh1Hui8a3RKJAaKdkgbeMaFGAcxiqz5FRiAxx09ZH2MWfk18YqJrDNL6mEZN8X330Xgpv611t0P8xsjNQ==)

### The story behind it

This feature originated while refactoring Element Plus components to `<script setup>`. For a component library, we want to customize the component name (`name` option), rather than defaulting to the file name. But I didn't want to go back to the old writing style, so I built a plugin (the origin story 🤣) called [`unplugin-vue-define-options`](https://www.npmjs.com/package/unplugin-vue-define-options). After several iterations, it eventually became the `defineOptions` macro in Vue 3.3.

## Hoisting static constants

- PR: https://github.com/vuejs/core/pull/5752
- Dev logs: https://www.bilibili.com/video/BV1st4y1G7sG (Chinese)

This feature is a compiler optimization for SFCs. It adds a `hoistStatic` option to the `script` block.

### `hoistStatic` in templates

`hoistStatic` in `template` is similar. The Vue compiler has an optimization: it can hoist static element nodes to the top-level scope, so they're executed once when the code is loaded instead of every time the `render` function runs (which can have downsides in extreme cases).

Let's look at an example 🌰.

```vue
<template>
  <div id="title">Hello World</div>
</template>
```

[Vue SFC Playground](https://play.vuejs.org/#eNqrVnIsKNArK01VslKyKUnNLchJLEm1i8lTULBJySxTyEyxjVEqySzJSY1RsvNIzcnJVwjPL8pJsdEHygKV2ejD9SjVAgDb8hoW)

This code is compiled to the following JavaScript (non-essential parts omitted):

```js
const _hoisted_1 = { id: 'title' }
function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock('div', _hoisted_1, 'Hello World'))
}
```

The `_hoisted_1` variable is intentionally hoisted to the top level. If you disable this feature, it would be created inside `render` instead.

### `hoistStatic` in `<script>`

Before Vue 3.3, only templates had this optimization. In Vue 3.3 we added a similar optimization: if a constant's value is a primitive ([primitive values](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) -- string, number, boolean, bigint, ~~symbol~~, null, undefined), then its declaration will be hoisted to the top level. (Note: symbol isn't implemented yet.)

Because these values can't be mutated, it doesn't matter where they're declared.

### Why this matters

Besides performance, there's a more practical benefit. Before Vue 3.3, macros couldn't reference variables declared inside `<script setup>`. Take this example:

```vue
<script setup>
const name = 'Foo'
defineOptions({
  name,
})
</script>
```

[Vue SFC Playground](https://play.vuejs.org/#eNp9jt1KA0EMhV9lmJsqdGdABWGpUl9AvDde1N1UR5kkJLP1ouy7O6st9Ad6me8k+c7WP4mEzYC+9QvrNElxhmWQR6COyYoTZXleZXQPbrZmngH1uE6EL5Xb1es+frsGWsT/D/XWz33KwlqavJLwZUxVsAVyDnaBgW/dH5lYbTDN4D9LEWtjHEi+P0LHOS5rFnWgkjI2PeflbbgJd/exT1YOeUDLzbvyj6FWI/j5wfNY4Qa1Uaz1FfWi7GT3SHiSnUkn5wg0+vEX+UN45g==)

You'd get an error:

```
[@vue/compiler-sfc] `defineOptions()` in <script setup> cannot reference locally declared variables because it will be hoisted outside of the setup() function. If your component options require initialization in the module scope, use a separate normal <script> to export the options instead.
```

This happens because `defineProps` adds a `props` option alongside `setup`, while the `name` constant is declared inside `setup`. You can't reference a variable outside the scope before it's initialized. The following code is obviously wrong.

```js
const __sfc__ = {
  props: [propName],
  setup(__props) {
    const propName = 'foo'
  },
}
```

In Vue 3.3, line 4's `propName` is hoisted to line 1, so the code makes sense. This feature is enabled by default, and most developers never need to think about it.

### The story behind it

The motivation was similar to the previous feature. In Element Plus, after setting `name` with `defineOptions`, we needed to throw an error under certain conditions, and the error should include the component name for debugging.

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

So I wanted to avoid duplicating the name string by extracting it into a constant and referencing it in both `defineOptions` and the error.

## The `defineModel` macro

- PR: https://github.com/vuejs/core/pull/8018
- RFC: https://github.com/vuejs/rfcs/discussions/503
- Dev logs: [Part 1](https://www.bilibili.com/video/BV1MS4y1t7Pi), [Part 2](https://www.bilibili.com/video/BV1sY4y1P7gD) (Chinese)
- Twitter: https://twitter.com/sanxiaozhizi/status/1644564064931307522

### Motivation

This macro is pure syntax sugar. Before Vue 3.3, defining a two-way bound prop was quite tedious.

```vue
<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (evt: 'update:modelValue', value: number): void
}>()

// update value
emit('update:modelValue', props.modelValue + 1)
</script>
```

You had to define `props` and then `emits`, with a lot of duplicate code. If you wanted to update the value, you needed to manually call `emit`.

I wondered: why not wrap this into a function (macro) to simplify the process? That's how `defineModel` was born.

### 🌰 Example

```vue
<script setup>
const modelValue = defineModel()
modelValue.value++
</script>
```

Those 7 verbose lines become just two lines in Vue 3.3!

### Difference from `useVModel`

VueUse also provides a `useVModel` function for similar behavior. Why introduce this macro?

Because VueUse just combines `props` and `emit` into a `Ref` and cannot define component `props` and `emits`. That means developers still have to call `defineProps` and `defineEmits` manually.

### The story behind it

😛 There's not much of a story here -- it's just that writing the old way was annoying. I first implemented `defineModel` in [Vue Macros](https://vue-macros.dev/) (now renamed to `defineModels` to differentiate from the official one), and it worked well.

## Importing external types in SFCs

### Background

Since Vue 3.2, one of the hottest issues has been: [how to use external types in defineProps](https://github.com/vuejs/core/issues/4294).

There were two paths to solve it:

- Let the Vue SFC compiler call the TypeScript compiler to compute final types and determine which runtime types are included (`String`, `Number`, `Boolean`, `Function`, etc.).
- Implement a lightweight TypeScript analyzer ourselves and handle most cases.

As everyone knows, TypeScript type gymnastics can be terrifying. If we wanted to solve the issue perfectly, the Vue SFC compiler would need to parse and compute all types like the TypeScript compiler. The first option works, but it comes with a huge downside: it requires the massive, heavyweight TS compiler and would greatly slow down builds.

In the end, I chose the second approach in [Vue Macros](https://vue-macros.dev/). That means complex types still aren't suitable for macros yet, but this will be improved over time.

### Vue 3.3 vs. Vue Macros

After Vue Macros implemented the lightweight analyzer, Vue core adopted a similar implementation.

But there are still differences. Vue Macros iterates much faster and currently supports more unusual syntax, while Vue 3.3 still doesn't support some of those syntaxes.

So in the future, if Vue can't parse a type, try Vue Macros. If Vue Macros still can't, file an issue in the Vue Macros repo with a **minimal reproducible example**, or switch to a simpler syntax that avoids secondary inference.

## The `defineSlots` macro

- PR: https://github.com/vuejs/core/pull/7982
- Twitter: https://twitter.com/sanxiaozhizi/status/1641378248448937984

### Background

Vue 3.3 introduced the `defineSlots` macro. You can use it to define slot types yourself. It's almost unnecessary for simple components, but very useful for complex ones, especially when combined with generic components. Or when Volar can't infer types correctly, you can specify them manually.

### 🌰 Example

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { foo: string; bar: number }): any
}>()
</script>
```

We manually defined the slot props type for the `default` slot.

### 🌰 A real example

Suppose we have a paginator component and want to control how each `item` is rendered via slots.

```vue
<script setup lang="ts" generic="T">
// Child component Paginator
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
  <!-- Parent component -->
  <Paginator :data="[1, 2, 3]">
    <template #default="{ item }">{{ item }}</template>
  </Paginator>
</template>
```

We passed `data` as `number[]`, so `item` is inferred as `number`. The `item` type changes based on the type of `data` you pass.

## A more ergonomic `defineEmits`

- PR: https://github.com/vuejs/core/pull/7992
- Twitter: https://twitter.com/youyuxi/status/1641403989026820098

This feature is also pure syntax sugar.

### Example

```vue
<script setup lang="ts">
const emits = defineEmits<{
  (evt: 'update:modelValue', value: string): void
  (evt: 'change'): void
}>()

// ⬇️ After Vue 3.3
const emits = defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()
</script>
```

Before Vue 3.3 you had to type a bit more; now you can save some keystrokes.

## Deprecation of Reactivity Transform syntax sugar

At the beginning of the year, the Vue team announced that Reactivity Transform would be deprecated. It is deprecated in Vue 3.3 (with warnings) and will be removed entirely in Vue 3.4.

> Personally, I think Reactivity Transform still has its place.

Although it's deprecated officially, the feature moved to [Vue Macros](https://vue-macros.dev/). That means you don't need to rush to migrate back to the old syntax -- use the [plugin](https://vue-macros.dev/features/reactivity-transform.html) and it will continue to work and receive fixes.

For why it was removed, see [this comment](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028).

## Afterword

Overall, I'm really happy to see Vue willing to accept suggestions and proposals from the community. These are roughly my contributions to Vue 3.3. For more features, check [the Vue blog post](https://blog.vuejs.org/posts/vue-3-3).

P.S. If anyone is willing to translate this article into English, please submit it to [sxzz/articles](https://github.com/sxzz/articles). I'd be very grateful!

### About Vue Macros

[Vue Macros](https://vue-macros.dev/) is currently an independent project, not part of official Vue. Unlike Vue core, its goal is to explore different possibilities.

I want to see more aggressive ideas, even if they're not mature yet. We can experiment in Vue Macros first, then try to upstream them to Vue core once they're ready.

Vue Macros is currently maintained by me alone. I hope more community members will join and help build it! 💕
