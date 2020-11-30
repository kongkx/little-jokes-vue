export default {
  mounted() {
    this.$store.commit('hideNav')
  },
  beforeDestroy() {
    this.$store.commit('showNav')
  },
  activated() {
    this.$store.commit('hideNav')
  },
  deactivated() {
    this.$store.commit('showNav')
  },
}
