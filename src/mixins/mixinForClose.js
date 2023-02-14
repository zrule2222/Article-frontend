export default {
  props: {
    isActive: { type: Boolean, default: false, required: true },
  },

  methods: {
    close(message) {
      this.$emit(`${message}`);
    }
  }
};