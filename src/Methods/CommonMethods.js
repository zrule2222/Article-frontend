import axios from 'axios';
import babelPolyfill from 'babel-polyfill'



export default {
  http: axios.create({ baseURL: "http://localhost:3000" }),

  async getAuthors(value) {
    const response = await this.http.get(`/Authors/${value}`)
    return response.data
  },
  async getArticles(value) {
    const response = await this.http.get(`/Articles/${value}`)
    return response.data
  },

  async getArticlesByPage(totalPages, limit, searchedValue) {
    const response = await this.http.get(`/Articles?_page=${totalPages}&_limit=${limit}&q=${searchedValue}`)
    return response
  },
  async deleteArticle(id) {
    await this.http.delete(`/Articles/${id}`)
  },

  async updateArticle(id, title, content) {
    await this.http.patch(`/Articles/${id}`, {
      title: title,
      body: content,
      updated_at: new Date().toLocaleString()
    })
  },
  async postArticle(article) {
    await this.http.patch("/Articles", article)
  },
}