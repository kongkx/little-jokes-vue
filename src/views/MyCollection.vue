<template>
  <page class="MyCollection">
    <template v-slot:header>
      <PageHeader title="我的收藏" backButton @back="goBack" />
    </template>
    <div class="LineItem">
      <div class="LineItem__title">显示归档</div>
      <div class="LineItem__actions">
        <Toggle v-model="showArchived" />
      </div>
    </div>
    <collection-list
      class="MyCollection__list"
      :showArchived="showArchived"
      :fetchData="handleDataFetch"
    />
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
import CollectionList from '../components/CollectionList'
import Toggle from '../components/Toggle'
import { fetchUserCollection } from '../api'
export default {
  name: 'MyCollection',
  components: {
    PageHeader,
    CollectionList,
    Toggle,
  },
  data: function() {
    return {
      showArchived: true,
    }
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
    toggleArchived(e) {
      console.log(123, e)
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

<style lang="scss"></style>
