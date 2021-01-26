<template>
  <page class="My">
    <template v-slot:header>
      <PageHeader title="我的" />
    </template>
    <div class="My__content">
      <div class="LineItem My__info l_mt_16">账号： {{ currentUser.name }}</div>
      <div class="LineItemList l_mt_16">
        <div class="LineItem" @click="navigateToList">
          <div class="LineItem__title">我的笑话</div>
        </div>
        <div class="LineItem" @click="navigateToCollection">
          <div class="LineItem__title">我的收藏</div>
        </div>
      </div>
      <button class="My__logout" @click="logout">退出登录</button>
    </div>
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageHeader,
  },
  computed: mapGetters(['currentUser']),
  methods: {
    navigateToCollection() {
      this.$router.push({
        name: 'my-collection',
      })
    },
    navigateToList() {
      this.$router.push({
        name: 'my-posts',
      })
    },
    logout() {
      if (confirm('确定退出登录？')) {
        this.$store.dispatch('resetAuthInfo')
        window.location.reload()
      }
    },
  },
}
</script>

<style lang="scss">
.My {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  &__logout {
    margin-bottom: 24px;
    margin-top: auto;
    background-color: white;
    color: var(--danger-color);
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    height: 44px;
    font-size: 16px;
  }
  &__info {
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 12px;
  }
  @media (prefers-color-scheme: dark) {
    &__logout {
      background-color: #3e3f46;
    }
  }
}
</style>
