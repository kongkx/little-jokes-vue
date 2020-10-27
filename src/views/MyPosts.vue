<template>
  <page class="MyPosts">
    <template v-slot:header>
      <PageHeader title="我的笑话" backButton @back="goBack" />
    </template>
    <post-list class="MyPosts__list" :fetchData="handleDataFetch" />
  </page>
</template>

<script>
import { fetchUserPosts } from '../api'
import PostList from '../components/PostList'
export default {
  name: 'MyPosts',
  components: {
    PostList,
  },
  methods: {
    goBack() {
      const hasHistory = window.history.length > 2
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'my',
        })
      }
    },
    handleDataFetch(params) {
      const userId = this.$store.getters.currentUserId
      return fetchUserPosts(userId, params)
    },
  },
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
</script>
