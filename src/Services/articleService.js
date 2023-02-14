import axios from 'axios';
import "babel-polyfill";

export const articles = {}


articles.http = axios.create({ baseURL: "http://localhost:3000" })

articles.getAuthors = async function(value) {
    const response = await this.http.get(`/Authors/${value}`)
    return response.data
  }
  articles.getArticles = async function(value) {
    const response = await this.http.get(`/Articles/${value}`)
    return response.data
  }

  articles.getArticlesByPage = async function(totalPages, limit, searchedValue) {
    const response = await this.http.get(`/Articles?_page=${totalPages}&_limit=${limit}&q=${searchedValue}`)
    return response
  }
  articles.deleteArticle = async function(id) {
    await this.http.delete(`/Articles/${id}`)
  }

  articles.updateArticle = async function(id, title, content) {
    await this.http.patch(`/Articles/${id}`, {
      title: title,
      body: content,
      updated_at: new Date().toLocaleString()
    })
  }
  articles.postArticle = async function(article) {
    await this.http.post("/Articles", article)
  }

  export default{
    install(Vue){
      Vue.prototype.$articles = articles
    }
  }
