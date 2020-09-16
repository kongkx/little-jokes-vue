<template>
  <div class="LineItem">
    <div class="LineItem__main">
      <slot></slot>
    </div>
    <div class="LineItem__actions">
      <button
        v-for="item in actions"
        :key="item.key"
        class="LineItem__action"
        :class="`LineItem__action_${item.modifier}`"
        @click="item.callback"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineItem',
  props: {
    actions: {
      type: Array, // { key: 'delete', modifier: 'string', callback: Function }
    },
  },
  data: function() {
    return {
      showActions: false,
      initialX: undefined,
    }
  },
}
</script>
