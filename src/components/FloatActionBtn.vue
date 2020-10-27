<template>
  <button class="FloatActionBtn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FloatActionBtn',
}
</script>

<style lang="scss">
.FloatActionBtn {
  position: fixed;
  width: 56px;
  height: 56px;
  background-color: var(--primary-color);
  border-radius: 28px;
  border: none;
  box-shadow: 1px 2px 3px rgba(128, 128, 128, 0.5);
  right: 36px;
  bottom: 72px;
}
</style>
