<template>
  <header class="PageHeader">
    <div v-if="backButton" class="PageHeader__left">
      <button class="PageHeader__btn" @click="$emit('back')">
        <BackIcon />
      </button>
    </div>
    <span class="PageTitle">{{ title }}</span>
  </header>
</template>

<script>
import BackIcon from "./BackIcon";
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String
    },
    backButton: {
      type: Boolean
    }
  },
  components: {
    BackIcon
  }
};
</script>

<style lang="scss">
.PageHeader {
  background-color: var(--primary-color);
  height: var(--page-header-height); // TODO: pwa heading color
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;

  &__left {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  &__btn {
    background-color: transparent;
    border: none;
    min-width: 36px;
    height: 36px;
  }

  .PageTitle {
    margin-top: auto;
    margin-bottom: 5px;
  }
}
.PageTitle {
  font-weight: bold;
  font-size: 18px;
}
</style>
