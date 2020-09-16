<template>
  <div class="MyCollection">
    <PageHeader title="我的收藏" backButton @back="goBack" />
    <collection-list class="MyCollection__list" :fetchData="handleDataFetch" />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
import CollectionList from '../components/CollectionList'
import { fetchUserCollection } from '../api'
export default {
  name: 'MyCollection',
  components: {
    PageHeader,
    CollectionList,
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
      return fetchUserCollection(userId, params)
    },
  },
  mounted() {
    this.$store.commit('hideNav')
  },
  beforeDestroy() {
    this.$store.commit('showNav')
  },
}
</script>

<style lang="scss">
.MyCollection {
  height: 100%;
  overflow: hidden;
  &__list {
  }
}
</style>
