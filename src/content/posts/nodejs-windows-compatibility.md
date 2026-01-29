---
title: 踩坑异闻录——Windows 前端工具链之痛
date: 2025-03-07
description: 从路径反斜杠、盘符分隔符到环境变量设置，聊聊 Windows 在 Node.js 前端工具链中的那些兼容性坑。
---

## 前言

昨天发了[一条推特](https://x.com/zhizijun/status/1897245935639638286)，是因为做工具链又碰到了 Windows 相关的兼容性问题，所以有感而发的一句吐槽。但似乎以推特的氛围，只有这种「暴论」输出才能引起莫名其妙的关注。
引发了部分人的不满，甚至引发了 Windows 与 macOS 之间的争论。

那我们就来站在 Unix-like 系统的视角下，聊聊关于 Windows 在前端工具链（Node.js）中的「坑」。

## 路径烦恼

### 诡异的反斜杠

在 Windows 中，一个常见的路径看起来像 `D:\path\to\file.txt`；而在 Unix-like 系统中，则为 `/home/username/file.txt`。
显而易见，Windows 使用反斜杠 `\` 作为路径层级之间的分隔符。而在绝大多数的编程语言中，正斜杠通常不需要特殊处理，而反斜杠则用于转义字符。
举个例子：

```ts
console.log('\\') // 实际上只输出一个反斜杠
console.log('\n') // 输出换行符
console.log('/') // 没有意外，输出一个正斜杠
```

这意味着，如果我们只考虑在 Unix-like 系统中运行，基本可以忽略对路径的特殊处理。

### `:` 分隔符

不仅如此，在 Windows 中还有盘符的概念；而在 Linux 则使用挂载（mount）来管理不同的物理硬盘和分区。这也是一处需要考虑兼容性的地方。

### 🌰 举个例子

说再多不如一个例子来得贴切。可以在 GitHub 中搜索到[我被 Windows 折磨的记录](https://github.com/search?q=committer%3Asxzz+windows&type=commits)。

#### [test: try fix path for windows](https://github.com/sxzz/tsdown/commit/5f490037c95758026708013375792accb4c3d647)

这个 commit 旨在解决单元测试在 Windows 上的兼容性问题。我们需要传递一个 [glob 表达式](<https://en.wikipedia.org/wiki/Glob_(programming)>)给 `entry` 选项。这在 Unix-like 系统中，可以直接传递文件的路径 `/path/to/file` 来直接匹配确切的文件，这很好。

而 glob 是起源于 UNIX 的功能，在 Windows 中，使用反斜杠并不能在 [fast-glob](https://github.com/mrmlnc/fast-glob) 中像在 Unix-like 系统中那样正常工作。这就造成了一致性问题。
虽然 `fast-glob` 提供了 `convertPathToPattern` 函数帮你转义 Windows 的反斜杠，但仍有部分情况未能解决。

在这个 commit 中更坑的是，我在代码使用了 4 个反斜杠，这是什么呢？因为这段代码被反引号 <code>\`</code> 与 单引号 `'` 双重包裹。因此 4 个反斜杠最终只会表示为一个真正的反斜杠。

#### [fix: watch `ignored` option for windows](https://github.com/sxzz/tsdown/commit/4c251ac3c5c8b2a94a8d22861c2437647f6cb276)

这也是一个常见的例子，我们用正则表达式来检查某个路径是否在 `node_modules` 文件夹内。为了兼容 Windows 我们需要写 `/[\\/]node_modules[\\/]/`，同样这里的双重反斜杠最终只会匹配一个反斜杠。
但更麻烦的是，对于第三方依赖，你似乎无法确定在 Windows 下它会传递反斜杠的路径，还是会自动替换成正斜杠的路径。
在这个例子中，`chokidar` 的处理规则颇为奇怪，对于传递 function，它会传递正斜杠的路径，对于静态的数组，则会特殊处理。因此有了这个 commit。

#### [fix: support Node 22/23 strip types feature](https://github.com/antfu-collective/unconfig/pull/40)

还记得刚刚提到的 `:` 分隔符吗？之前我也以为它似乎没有兼容性问题。这样想就太天真了！
如果我们要在 Node.js 中导入一个绝对路径，这在 Unix-like 系统很简单。

```ts
require('/path/to/test.cjs')
```

平平无奇。然而，在 Windows 就会有大问题！

```ts
require('C:\\path\\test.cjs') // ✅
import('C:\\path\\test.cjs') // ❌
// Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:'
```

这是因为 `require` API 似乎只接受路径 (path) 作为参数，而 `import()` 不仅支持路径，还支持 File URL。所以 Node.js 会把 `C:` 当作一个 URL，它的 `protocol` 为 `c:`。这与 `http://path/test.cjs` 本质上没有太大的区别。File URL、路径傻傻分不清 🤷

```ts
import('file://C:/path/test.cjs') // ✅
console.log(new URL('C:\\path\\test.cjs')) // protocol = 'c:'
```

#### import 语句

```ts
import mod from 'a/b/n'
import mod from 'a\b\n'
```

在 ESM 中，必须使用正斜杠作为分隔符。直接使用反斜杠可能导致意外的转义。在代码生成相关库需要额外注意。

### 🤨 怎么办？

那么如何解决呢？使用 [pathe](https://github.com/unjs/pathe) 或许是个不错的选择！即使在 Windows 环境下，它也会直接把路径转换为正斜杠。
而正斜杠在 Windows 也会被视为反斜杠。所以对于大部分的情况，都能直接帮你解决一致性问题。但边缘情况呢？还是有挺多的。

## 开源社区

据我所知，我周围开发和贡献开源项目的大部分人都在使用 Unix-like 系统。而用户可能大部分使用的是 Windows。我明白这与市占率可能有一定关系。但对于作者与维护者来说，也是一件无可奈何的事情。

以我举例，我的开源项目会借助 GitHub Actions，在 Windows 下跑单元测试。每次我 push 完代码，收到 GitHub Action 的错误通知，一看又是 Windows 下跑不过，都会很苦恼。因为手头上并没有一台 Windows 电脑，还装了开发测试环境。以至于被逼无奈，我现在在使用虚拟机调试 Windows 上的 bug。

而且单元测试不总是能覆盖方方面面，总会有纰漏。这个就需要实际用户来发现并提 issue 了！

## 兼容性问题一览

- 路径
  - 反斜杠
    - 可能需要转义
    - 可能需要转为正斜杠
  - 盘符 `:`
    - 可能需要转为 File URL
- 无法使用 `KEY=VALUE command` 设置环境变量
  - 使用 pnpm 的 [`shell-emulator`](https://pnpm.io/cli/run#shell-emulator)
  - 可以使用 [`cross-env`](https://www.npmjs.com/package/cross-env)
- 没有 `rm -fr` 命令
  - 使用 `fs.rmSync(path, { recursive: true, force: true })`
  - 使用 [`rimraf`](https://www.npmjs.com/package/rimraf)

种种情况可谓是数不胜数。小编也没有办法列举出所有的情况，这些只是我印象中遇到的一些的坑。

## 后记

你遇到了十个路径问题，并不意味着只有十个，可能还有更多在路上 🛣️……恕无法接受「连路径都处理不对」这样的说法。

如果有注意到的话，本篇文章通篇都在使用 [`Unix-like`](https://en.wikipedia.org/wiki/Unix-like) 这样的表述。这是因为世界上除了 Windows，还有许多其他操作系统。

本文与推文都无意引起 Windows 与 Linux、macOS 的「论战」。Windows 在很多方面仍在发挥重要的作用（比如说打游戏）。但就事论事来讲，在跨平台领域确实造成许多的不便。

### 我的库

对于我自己的开源库，我仍然会尽力兼容 Windows，添加 Windows 到 CI 运行。
但对于一些边缘情况，可能会有所忽略。如果你在使用我的库时遇到了问题，欢迎提 issue 和 PR，我会尽力解决。

### 替代品

为了珍惜宝贵生命，建议可以尝试使用 Unix-like 系统做**前端**开发（包括 WSL 与第三方虚拟机）。当然，你也可以继续使用 Windows，但遇到兼容性问题时，请更少抱怨并付出额外的时间、更积极地向开源社区反馈问题与贡献。

### 碎碎念

如果看完文章后，仍然认为这是「傲慢」或「无知」，请自便。
