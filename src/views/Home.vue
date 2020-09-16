<template>
  <div class="Home">
    <PageHeader title="小小笑话"></PageHeader>
    <div class="Home__content">
      <div class="tabs">
        <div class="tabItem" :class="{ 'is-active': currentTab === 'latest' }">
          <span class="tabItem__label" @click="setActiveTab('latest')"
            >最新</span
          >
        </div>
        <div class="tabItem" :class="{ 'is-active': currentTab === 'hotest' }">
          <span class="tabItem__label" @click="setActiveTab('hotest')"
            >最热</span
          >
        </div>
      </div>
      <joke-list
        class="Home__list"
        :fetchData="handleDataFetch"
        :key="currentTab"
      />
    </div>
    <div>
      <AuthAppLogo style="position: fixed; top: 100%; opacity: 0;" />
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
import JokeList from '../components/JokeList'
import AuthAppLogo from '../components/AuthAppLogo'
import { fetchLatestPost, fetchHottestPost } from '../api'

export default {
  name: 'Home',
  components: {
    PageHeader,
    JokeList,
    AuthAppLogo,
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
    handleDataFetch() {
      if (this.currentTab === 'latest') {
        return fetchLatestPost
      }
      return fetchHottestPost
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
  },
}
</script>

<style lang="scss">
.Home {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1;
    overflow: auto;
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
