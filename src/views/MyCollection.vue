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
import hideBottomBar from '../mixins/hideBottomBar'
export default {
  name: 'MyCollection',
  components: {
    PageHeader,
    CollectionList,
    Toggle,
  },
  mixins: [hideBottomBar],
  data: function() {
    return {
      showArchived: true,
    }
  },
  methods: {
    goBack() {
      this.$root.goBack('my')
    },
    handleDataFetch(params) {
      const userId = this.$store.getters.currentUserId
      return fetchUserCollection(userId, params)
    },
    toggleArchived(e) {
      console.log(123, e)
    },
  },
}
</script>

<style lang="scss"></style>
