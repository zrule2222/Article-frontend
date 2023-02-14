export default {
    data() {
        return {
            isModalVisible: false,
        }
    },

    methods: {
        showModal(bool) {
            this.isModalVisible = bool;
        }
    }
};