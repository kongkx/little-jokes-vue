<template>
  <div class="Home">
    <PageHeader title="超级笑话"></PageHeader>
    <div class="tabs">
      <div class="tabItem" :class="{ 'is-active': currentTab === 'latest' }">
        <span class="tabItem__label" @click="setActiveTab('latest')">最新</span>
      </div>
      <div class="tabItem" :class="{ 'is-active': currentTab === 'hotest' }">
        <span class="tabItem__label" @click="setActiveTab('hotest')">最热</span>
      </div>
    </div>
    <div>
      <JokeCard v-for="item in data" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import JokeCard from "../components/JokeCard";
import { fetchLatestPost } from "../api";

export default {
  name: "Home",
  components: {
    PageHeader,
    JokeCard
  },
  data: function() {
    return {
      data: []
    };
  },
  created: function() {
    const vm = this;
    fetchLatestPost().then(res => {
      vm.data = res.data;
    });
  },
  methods: {
    setActiveTab(tab) {
      if (tab !== this.currentTab) {
        this.$router.push({
          name: "Home",
          query: {
            tab
          }
        });
      }
    }
  },
  computed: {
    currentTab() {
      return this.$route.query.tab || "latest";
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  width: 100vw;
  overflow: hidden;
  height: 32px;
  align-items: center;
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
          content: "";
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
