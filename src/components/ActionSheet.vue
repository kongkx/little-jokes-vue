<template>
  <Modal
    :open="open"
    class="ActionSheet"
    placement="bottom"
    @cancel="$emit('cancel')"
  >
    <div class="ActionSheet__actions">
      <template v-for="(item, i) in actions">
        <div class="ActionSheet__action" :key="i" @click.stop="item.onClick">
          {{ item.label }}
        </div>
      </template>
      <div
        class="ActionSheet__action ActionSheet__action_cancel"
        @click.stop="$emit('cancel')"
      >
        取消
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'ActionSheet',
  props: {
    open: {
      type: Boolean,
    },
    actions: {
      type: Array,
    },
  },
  components: {
    Modal,
  },
}
</script>

<style lang="scss">
.ActionSheet {
  &__actions {
    background-color: white;
  }

  &__action {
    height: 50px;
    font-size: 18px;
    text-align: center;
    line-height: 48px;
    // font-weight: bold;
    &_cancel {
      border-top: 1px solid var(--border-color);
    }
  }
}
</style>
