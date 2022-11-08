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
    // 如果你想部署网站为https://foo.github.io/bar/，那么base为'/bar/'，这里指定后，后面以/开头的link自动放到bar/后
    base: '/ddd/',
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
        // 导航栏配置，在右上角
        nav: [
            { text: 'Github', link: 'https://github.com/VictorGol' }
        ],
        sidebar: [
            {
                text: '知识点',
                collapsible: true, // 可折叠
                // collapsed: true, // 初始是否折叠
                items: [
                    { text: 'ajax', link: '/someInfo/ajax' },
                    { text: 'Go', link: '/someInfo/golang' },
                ]
            },
            {
                text: 'vitepress',
                items: [
                    { text: 'vitepress教程', link: '/someInfo/vitepress教程' },
                ]
            }
        ],
        // 显示社交账号，在右上角
        // 支持'discord''facebook''github''instagram''linkedin''slack''twitter''youtube'{ svg: string }
        socialLinks: [
            { icon: 'github', link: 'https://github.com/VictorGol' },
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
        docFooter: {
            prev: '看看上一页',
            next: '看看下一页'
        }
    }
})