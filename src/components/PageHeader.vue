<template>
  <header class="PageHeader">
    <div v-if="backButton" class="PageHeader__left">
      <button class="PageHeader__btn" @click="$emit('back')">
        <BackIcon />
      </button>
    </div>
    <span class="PageTitle">{{ title }}</span>
    <div class="PageHeader__right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import BackIcon from './BackIcon'
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
    },
    backButton: {
      type: Boolean,
    },
  },
  components: {
    BackIcon,
  },
}
</script>

<style lang="scss">
.PageHeader {
  background-color: var(--primary-color);
  height: calc(var(--page-header-height) + 20px); // TODO: pwa heading color
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  margin-top: -20px;

  &__left {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  &__btn {
    background-color: transparent;
    border: none;
    min-width: 44px;
    height: 44px;
    font-size: 16px;
    &:disabled {
      opacity: 0.6;
    }
  }
  &__right {
    position: absolute;
    right: 0;
    bottom: 0;
    // height: var(--page-header-height);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }

  .PageTitle {
    margin-top: auto;
    margin-bottom: 9px;
  }
  @media (prefers-color-scheme: dark) {
    background-color: #3e3f46;
    color: #e0e0e0;
  }
}
.PageTitle {
  font-weight: bold;
  font-size: 18px;
}
</style>
