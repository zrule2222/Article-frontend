<template>

  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">

          <p v-if="this.actionType != 'edit'" class="modal-card-title">Add Article</p>
          <p v-if="this.actionType == 'edit'" class="modal-card-title">Edit Article</p>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input v-if="this.actionType != 'edit'" class="input" :class="badTitle ? 'is-danger' : ''" v-model="title"
                type="text" placeholder="Title">
              <input v-if="this.actionType == 'edit'" class="input" :class="badTitle ? 'is-danger' : ''" v-model="title"
                type="text" placeholder="Title">
              <p v-show="badTitle" class="help is-danger">Tittle is empty</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <div class="select" :class="badAuthor ? 'is-danger' : ''">
                <select v-model="author" :disabled="this.actionType == 'edit' ? true : false">
                  <option value="" disabled selected>Select author</option>
                  <option v-for="author in Authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                </select>
                <p v-show="badAuthor" class="help is-danger">Author not selected</p>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea v-if="this.actionType != 'edit'" :class="badContent ? 'is-danger' : ''" v-model="content"
                class="textarea" placeholder="Content area"></textarea>
              <textarea v-if="this.actionType == 'edit'" :class="badContent ? 'is-danger' : ''" v-model="content"
                class="textarea" placeholder="Content area"></textarea>
              <p v-show="badContent" class="help is-danger">Content is empty</p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="this.actionType != 'edit'" @click="createPost" class="button is-success">Save changes</button>
          <button v-if="this.actionType == 'edit'" @click="updateArticle" class="button is-success">Save
            changes</button>
          <button @click.prevent="close('close')" class="button is-danger">Close</button>
        </footer>


      </div>
    </div>
  </div>

</template>

<script>
import Methods from '../Methods/CommonMethods.js'
import closeMixin from '../mixins/mixinForClose.js'
export default {
  name: 'Modal',
  mixins: [closeMixin],
  data() {
    return {
      Authors: [],
      title: "",
      content: "",
      author: '',
      badTitle: false,
      badContent: false,
      badAuthor: false,
    }
  },
  props: {
    actionType: { type: String, required: true },
    editIndex: { type: Number }
  },
  methods: {
    closeAfterAction(type, sucess) {
      this.$emit('close-after-action', { type: type, sucess: sucess });
    },
    async getAuthors() {
      this.Authors = await Methods.getAuthors('')
    },
    validateForm() {
      if (!this.title) {
        this.badTitle = true
        return false
      }
      else {
        this.badTitle = false
      }
      if (!this.author) {
        this.badAuthor = true
        return false
      }
      else {
        this.badAuthor = false
      }
      if (!this.content) {
        this.badContent = true
        return false
      }
      else {
        this.badContent = false
      }
      return true
    },
    async createPost() {
      if (!this.validateForm()) {
        return
      }
      let article = {
        title: this.title,
        body: this.content,
        author: this.author,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
      }
      try {
        await Methods.postArticle(article)
        this.closeAfterAction('create', 'sucess')
      }
      catch (err) {
        this.closeAfterAction('create', 'failure')
      }

    },
    async setInitialEditDAta() {
      if (this.actionType == 'edit') {
        const response = await Methods.getArticles(this.editIndex)
        this.author = response.author
        this.title = response.title
        this.content = response.body

      }
    },
    async updateArticle() {
      if (this.title == null || this.title == "") {
        this.badTitle = true
      }
      else {
        this.badTitle = false
      }

      if (this.content == null || this.content == "") {
        this.badContent = true
      }
      else {
        this.badContent = false
      }
      if (!this.badContent && !this.badTitle) {
        try {
          await Methods.updateArticle(this.editIndex, this.title, this.content)
          this.closeAfterAction('update', 'sucess')
        }
        catch (err) {
          this.closeAfterAction('update', 'failure')
        }
      }

    }
  },

  created() {
    this.getAuthors()
    this.setInitialEditDAta()

  }
}
</script>