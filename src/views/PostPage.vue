<template>
  <div>
    <div class="box has-background-primary is-size-1 is-family-primary">
      <h1>Post page</h1>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <button @click="showModal(true)" class="button is-primary mb-5 mr-4">Add article</button>
      <div class="control">
        <input v-model="searchedValue" @input="getArticles(1)" class="input" type="text" placeholder="Look for Article">
      </div>
    </div>
    <Modal v-if="isModalVisible" @close-after-action="closeModalAfterAction" @close="closeModal()"
      :is-active="isModalVisible" :actionType="this.actionType" :editIndex="this.editIndex"></Modal>
    <ActionMessage v-if="showUpdateMessage" :isActive="showUpdateMessage" :type="showActionType" :sucess="sucess"
      @close-action="closeActionModal()"></ActionMessage>
    <div class="field has-addons">
    </div>


    <div v-if="!noArticles" class="tile is-ancestor">

      <div v-for="article in articles" :key="article.id" class="tile has-text-centered is-child is-parent">

        <Articles @delete-action="setDeleteActionMessage" @show-edit="showEditModal" :Article="article"> </Articles>
      </div>
    </div>
    <div v-else class="notification is-danger ">
      <button class="delete"></button>
      Currently there are no articles
    </div>
    <Pagination @onPageChange="handlePageChange" :currentPage="currentPage" :pages="pagesCount"></Pagination>
  </div>
</template>

<script>


document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode;

    $delete.addEventListener('click', () => {
      $notification.parentNode.removeChild($notification);
    });
  });
});
import Methods from '../Methods/CommonMethods.js'
import mixinForModalVisibility from '../mixins/mixinForModalVisibility.js'
import Articles from '../Componnents/Articles.vue'
import Pagination from '../Componnents/pagination.vue'
import Modal from '../Componnents/modal.vue'
import ActionMessage from '../Componnents/ActionMessage.vue'
export default {
  name: 'postPage',
  mixins: [mixinForModalVisibility],
  components: {
    Articles,
    Pagination,
    Modal,
    ActionMessage,
  },
  data() {
    return {
      articles: [],
      authors: [],
      createdAtDate: '',
      pagesCount: 0,
      limit: 2,
      editIndex: 0,
      actionType: "",
      noArticles: false,
      searchedValue: "",
      showUpdateMessage: false,
      showActionType: '',
      sucess: '',
      currentPage: 1,
    }
  },
  methods: {
    async getArticles(page) {
      let totalPages = page < 0 || !page ? 1 : page
      const response = await Methods.getArticlesByPage(totalPages, this.limit, this.searchedValue)
      this.countPages(parseInt(response.headers['x-total-count']))
      if (response.data.length > 0) {
        this.articles = response.data
        this.noArticles = false
      }
      else {
        this.noArticles = true
      }

    },


    countPages(postsNumber) {
      let pages = Math.ceil(postsNumber / this.limit)
      this.pagesCount = pages
    },
    handlePageChange(data) {
      this.currentPage = data.page
      this.getArticles(data.page)
    },
    showEditModal(index) {
      this.editIndex = index
      this.actionType = 'edit'
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.editIndex = -1
      this.actionType = ''
    },
    closeActionModal() {
      this.showUpdateMessage = false;
      if (this.showActionType == 'delete' && this.sucess == 'sucess') {
        this.$router.go(0);
      }
      this.showActionType = ''
      this.sucess = ''
    },
    closeModalAfterAction(data) {
      this.isModalVisible = false;
      this.getArticles(1)
      this.currentPage = 1
      this.editIndex = -1
      this.showActionType = data.type
      this.sucess = data.sucess
      this.showUpdateMessage = true
    },
    setDeleteActionMessage(data) {
      this.showActionType = data.actionType
      this.sucess = data.sucess
      this.showUpdateMessage = true
    },


  },
  created() {
    this.getArticles(1)

  }
}
</script>
