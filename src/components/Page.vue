<template>
  <div class="Page">
    <slot name="header"></slot>
    <div class="Page__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
}
</script>

<style lang="scss">
.Page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  &__content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
