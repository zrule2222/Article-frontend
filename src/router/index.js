import Vue from 'vue'
import VueRouter from 'vue-router'
import postPage from '../views/PostPage.vue'
import Page404 from '../views/404page.vue'
import ArticleView from '../views/ArticleView.vue'
import axios from 'axios';
import babelPolyfill from 'babel-polyfill'



Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: "Home",
            component: postPage
        },
        {
            path: '/404',
            name: "NotFound",
            component: Page404
        },
        {
            path: '/articles/:id',
            name: "SpesificArticle",
            component: ArticleView,
            beforeEnter: async (to, from, next) => {

                try {
                    const response = await axios.get(`http://localhost:3000/Articles/${to.params.id}`)
                    if (response.status == 200) {
                        next()
                    }
                }
                catch (error) {
                    next('/404')
                }
            }
        },
        {
            path: '*',
            name: "InvalidLink",
            component: Page404
        },

    ]
})

export default router