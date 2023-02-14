import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import babelPolyfill from 'babel-polyfill'
import VueRouter from 'vue-router'
import postPage from './views/PostPage.vue'
import Page404 from './views/404page.vue'
import ArticleView from './views/ArticleView.vue'
import router from './router/index.js'

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:3000';


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
