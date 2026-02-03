interface Link {
  name: string
  href: string
}

export interface Friend {
  name: string | { en: string; zh: string }
  bio: string
  avatar: string
  href: string
}

interface HomeLinks {
  creator: Link[]
  team: Link[]
}

export const homeLinks: HomeLinks = {
  creator: [
    { name: 'tsdown', href: 'https://tsdown.dev' },
    { name: 'Vue Macros', href: 'https://vue-macros.dev' },
    { name: 'Elk', href: 'https://github.com/elk-zone/elk' },
  ],
  team: [
    { name: 'Vue', href: 'https://vuejs.org' },
    { name: 'Vite', href: 'https://vitejs.dev' },
    { name: 'VueUse', href: 'https://vueuse.org' },
    { name: 'unjs', href: 'https://unjs.io' },
    { name: 'unplugin', href: 'https://github.com/unplugin' },
    { name: 'Oxc', href: 'https://oxc.rs' },
  ],
}

export const friends: Friend[] = [
  {
    name: 'SXYAZI',
    bio: 'Creator of Yazi.',
    avatar: 'https://github.com/sxyazi.png',
    href: 'https://sxyz.blog',
  },
  {
    name: 'Gizmo',
    bio: '🐟',
    avatar: 'https://github.com/GizmoOAO.png',
    href: 'https://blog.lumina.moe',
  },
  {
    name: 'Cyunrei',
    bio: '',
    avatar: 'https://github.com/cyunrei.png',
    href: 'https://blog.cyunrei.moe',
  },
  {
    name: '云游君',
    bio: '希望能成为一个有趣的人',
    avatar: 'https://github.com/YunYouJun.png',
    href: 'https://www.yunyoujun.cn',
  },
  {
    name: 'Innei',
    bio: '静かな森',
    avatar: 'https://github.com/Innei.png',
    href: 'https://innei.in',
  },
  {
    name: 'XiaoMouz',
    bio: 'A normal person',
    avatar: 'https://github.com/XiaoMouz.png',
    href: 'https://mou.best',
  },
  {
    name: '炸鸡 🍗',
    bio: '拥抱存在主义危机',
    avatar: 'https://github.com/zlind0.png',
    href: 'https://blog.lind0.space',
  },
  {
    name: 'Doctor Wu',
    bio: 'The Doctor will see you now.',
    avatar: 'https://github.com/Doctor-wu.png',
    href: 'https://doctorwu.me/',
  },
  {
    name: 'Libra',
    bio: '你爱吃炒饭吗 我爱吃炒饭',
    avatar: 'https://libra.wiki/avatar.png',
    href: 'https://libra.wiki/',
  },
  {
    name: 'XCちゃん',
    bio: '困困困困困困',
    avatar: 'https://spacexc.net/logo.png',
    href: 'https://spacexc.net/',
  },
  {
    name: '雪糕',
    bio: '人對愛和永遠 應該有幻覺',
    avatar: 'https://static.lyc.sh/2022/10/cropped-profile.png',
    href: 'https://blog.lyc.sh/',
  },
  {
    name: 'Patrick.T',
    bio: 'Patrick碎碎念',
    avatar: 'https://cdn.tzih.top/avatar.jpg',
    href: 'https://tzih.top/',
  },
  {
    name: { en: 'Angine', zh: '安擎' },
    bio: 'By the power of language.',
    avatar: 'https://angine.tech/images/avatar.png',
    href: 'https://angine.tech/',
  },
  {
    name: 'SkyWT',
    bio: '',
    avatar: 'https://img.skywt.net/avatar.jpg',
    href: 'https://skywt.net/',
  },
  {
    name: { en: 'Citron', zh: '枸櫞' },
    bio: '',
    avatar: 'https://avatars.githubusercontent.com/u/45784494?v=4',
    href: 'https://lcandy.me/',
  },
]
