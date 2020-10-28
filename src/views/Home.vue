<template>
  <page class="Home">
    <template v-slot:header>
      <PageHeader title="小小笑话"></PageHeader>
    </template>
    <div class="Home__content">
      <div class="tabs">
        <div class="tabItem" :class="{ 'is-active': currentTab === 'latest' }">
          <span class="tabItem__label" @click="setActiveTab('latest')"
            >最新</span
          >
        </div>
        <div class="tabItem" :class="{ 'is-active': currentTab === 'hottest' }">
          <span class="tabItem__label" @click="setActiveTab('hottest')"
            >最热</span
          >
        </div>
      </div>

      <keep-alive>
        <component :is="currentTab" class="Home__list" />
      </keep-alive>
      <FloatActionBtn v-if="$store.getters.isLoggedIn" @click="initCreatePost">
        <PlusIcon style="width: 24px; height: 24px;" />
      </FloatActionBtn>
    </div>
    <div>
      <!-- TODO: 使用 service worker 进行数据缓存 -->
      <AuthAppLogo style="position: fixed; top: 100%; opacity: 0;" />
    </div>
  </page>
</template>

<script>
import Hottest from '../components/Hottest'
import Latest from '../components/Latest'
import AuthAppLogo from '../components/AuthAppLogo'
import FloatActionBtn from '../components/FloatActionBtn'
import PlusIcon from '../components/PlusIcon'

export default {
  name: 'Home',
  components: {
    Hottest,
    Latest,
    AuthAppLogo,
    FloatActionBtn,
    PlusIcon,
  },
  data: function() {
    return {
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback,
      },
      data: [],
    }
  },
  computed: {
    currentTab() {
      return this.$route.query.tab || 'latest'
    },
  },
  methods: {
    setActiveTab(tab) {
      if (tab !== this.currentTab) {
        this.$router.push({
          name: 'home',
          query: {
            tab,
          },
        })
      }
    },
    initCreatePost() {
      this.$router.push({
        name: 'post-create',
      })
    },
  },
  beforeDestroy() {
    console.log('before Destroy')
  },
}
</script>

<style lang="scss">
.Home {
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &__list {
    flex: 1;
    overflow: hidden;
    margin-top: 5px;
  }
}
.tabs {
  display: flex;
  width: 100vw;
  overflow: hidden;
  height: 32px;
  align-items: center;
  background-color: var(--body-background-color);
  position: sticky;
  top: 0;
  .tabItem {
    flex-basis: 50%;
    text-align: center;
    &__label {
      position: relative;
      padding-left: 20px;
      padding-right: 20px;
    }
    &.is-active {
      .tabItem__label {
        font-weight: bold;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: calc(100% + 2px);
          height: 3px;
          width: 100%;
          background-color: var(--primary-color);
          border-radius: 2px;
        }
      }
    }
  }
}
.ActionButton {
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
}
</style>
