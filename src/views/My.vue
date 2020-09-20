<template>
  <page class="My">
    <template v-slot:header>
      <PageHeader title="我的" />
    </template>
    <div class="My__content">
      <div class="LineItemList l_mt_16">
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

export default {
  components: {
    PageHeader,
  },
  methods: {
    navigateToCollection() {
      this.$router.push({
        name: 'my-collection',
      })
    },
    logout() {
      if (confirm('确定退出登录？')) {
        this.$store.dispatch('resetAuthInfo')
        this.$router.replace({ name: 'login' })
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
}
.LineItem {
  min-height: 44px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid var(--border-color);
  &:first-of-type {
    border-top: 1px solid var(--border-color);
  }
  &__title {
    margin-left: 16px;
  }
}
</style>
