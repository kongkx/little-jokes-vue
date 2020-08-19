<template>
  <div class="Home">
    <PageHeader title="超级笑话"></PageHeader>

    <div class="tabs">
      <div class="tabItem is-active">
        <span class="tabItem__label">最新</span>
      </div>
      <div class="tabItem">
        <span class="tabItem__label">最热</span>
      </div>
    </div>

    <div>
      <JokeCard />
      <JokeCard />
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import JokeCard from "../components/JokeCard";

export default {
  name: "Home",
  components: {
    PageHeader,
    JokeCard
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
