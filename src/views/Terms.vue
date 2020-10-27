<template>
  <page class="Terms">
    <template v-slot:header>
      <PageHeader title="用户协议" backButton @back="goBack" />
    </template>
    <div class="l_mx_12">
      <p>
        这个是简单的开源 vue 项目，源码：
        <br />
        <a target="_blank" href="https://github.com/kucial/little-jokes-vue"
          >little-jokes-vue</a
        >
      </p>
    </div>
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
export default {
  components: {
    PageHeader,
  },
  methods: {
    goBack() {
      this.$root.goBack()
    },
  },
  mounted() {
    this.$store.commit('hideNav')
  },
  destroyed() {
    this.$store.commit('showNav')
  },
  activated() {
    this.$store.commit('hideNav')
  },
  deactivated() {
    this.$store.commit('showNav')
  },
}
</script>
