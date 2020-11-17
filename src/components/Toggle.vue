<template>
  <label class="Toggle" :class="checked ? 'is-checked' : ''">
    <input
      type="checkbox"
      style="display: none"
      :checked="checked"
      v-on:change="handleChange"
    />
  </label>
</template>

<script>
export default {
  name: 'Toggle',
  props: ['checked'],
  model: {
    prop: 'checked',
    event: 'change',
  },
  methods: {
    handleChange() {
      this.$emit('change', !this.checked)
    },
  },
}
</script>

<style lang="scss">
.Toggle {
  $width: 50px;
  display: inline-block;
  width: $width;
  height: 26px;
  position: relative;
  border-radius: 14px;
  border: 1px solid #333;
  background-color: #f4f4f4;
  transition: background-color 0.3s ease;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    top: -1px;
    left: -1px;
    background-color: white;
    box-shadow: 0 0 2px rgba(128, 128, 128, 0.2);
    transition: transform 0.3s ease;
  }
  &.is-checked {
    background-color: var(--primary-color);
    &::after {
      transform: translateX(#{$width + 2px - 28px});
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: #202022;
    &::after {
      background-color: #5b5b62;
    }
  }
}
</style>
