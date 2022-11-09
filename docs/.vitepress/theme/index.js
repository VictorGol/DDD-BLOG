import DefaultTheme from 'vitepress/theme'
import Test1 from '../../components/test.vue'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        ctx.app.component('Test1', Test1)
    }
}
