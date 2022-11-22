import { defineConfig } from 'vitepress'

export default defineConfig({
    // <html lang="en-US">，默认en-US
    // lang: 'en-US',
    // 网站标题，在左上角
    title: 'DDD的博客',
    // 标题的后缀，string|boolean，如果设置为'aa'，那么标签的标题后会加上|aa，设置为false表示这个属性不生效
    // titleTemplate: false,
    // 网站的描述
    description: 'DDD的博客',
    // true:显示切换夜间按钮，false：不显示，默认true
    // appearance: true,
    // 部署时写你的仓库名，比如ddd
    base: '/DDD-BLOG/',
    // 类似html中head标签里的link标签
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],// 添加网站图标
    // 默认为false，为true时，不会因为deadlinks而编译失败
    ignoreDeadLinks: true,
    // git commit时获取时间戳，默认false
    lastUpdated: true,
    // markdown解析配置
    markdown: {
        // theme: 'material-palenight', // 语法高亮的主题
        lineNumbers: true, // 代码块加行数
        // 还有一些属性没写在这里，就不写了
    },
    // 编译输出位置，默认./.vitepress/dist
    // outDir: './.vitepress/dist',
    // markdown文件存放的目录，默认是 . ，相对于根目录来说
    // srcDir: './src',
    // 主题配置
    themeConfig: {
        // logo:'/logo.svg',
        // 覆盖app级别的title属性,string|boolean,为false不加title
        // siteTitle: false,
        // 右侧目录，false时不显示目录，数字时代表只显示这个标题级别，数组是表示在区间内的级别可以显示
        // 'deep'代表[2,6]，一级标题不显示
        // outline: [1,6],
        // 显示在最后更新时间之前的前缀文本。
        lastUpdatedText: 'Updated Date',
        // 右侧目录的标题，默认是On this page
        outlineTitle: '目录',
        // 导航栏配置，在右上角偏左
        nav: [
            // { text: 'Github', link: 'https://github.com/VictorGol/DDD-BLOG' }
        ],
        sidebar: [
            {
                text: '介绍',
                items: [
                    { text: '开始吧', link: '/Introduction/' },
                ]
            },
            {
                text: 'vitepress',
                items: [
                    { text: '基础', link: '/vitepress/base' },
                    { text: '在Makedown中使用Vue', link: '/vitepress/Vue与Markdown' },
                    { text: 'API及内置组件', link: '/vitepress/API及内置组件' },
                    { text: 'Asset Handling', link: '/vitepress/asset-handling' },
                ]
            },
            {
                text: '其他知识',
                // collapsible: true, // 可折叠
                // collapsed: true, // 初始是否折叠
                items: [
                    { text: 'Ajax', link: '/others/Ajax' },
                    { text: '时间管理大师', link: '/others/个人学习指南' },
                ]
            },
            {
                text: '关于',
                // collapsible: true, // 可折叠
                // collapsed: true, // 初始是否折叠
                items: [
                    { text: '技术网站', link: '/about/技术网站' },
                ]
            },
        ],
        // 显示社交账号，在右上角
        // 支持'discord''facebook''github''instagram''linkedin''slack''twitter''youtube'{ svg: string }
        socialLinks: [
            { icon: 'github', link: 'https://github.com/VictorGol/DDD-BLOG' },
        ],
        // 页脚，没有侧边栏时才显示
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present ddd'
        },
        // 点击可以前往GitHub编辑
        // editLink: {
        //     pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
        //     text: 'Edit this page on GitHub'
        // },
        // 广告
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // },
        // 文档页脚，下一页和上一页的文本
        // docFooter: {
        //     prev: '看看上一页',
        //     next: '看看下一页'
        // }
    }
})