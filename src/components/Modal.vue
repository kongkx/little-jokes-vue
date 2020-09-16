<template>
  <portal to="modal">
    <div
      class="Modal"
      :class="classNames"
      @click.stop="$emit('cancel')"
      @transition-end="updateActive"
      v-if="open"
    >
      <div class="Modal__wrap" @click.stop>
        <slot />
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    placement: {
      type: String,
    },
    open: {
      type: Boolean,
    },
  },
  data() {
    return {
      active: false,
    }
  },
  computed: {
    placementClass(vm) {
      switch (vm.placement) {
        case 'center':
          return 'Modal_placeCenter'
        case 'bottom':
          return 'Modal_placeBottom'
        default:
          return ''
      }
    },
    classNames(vm) {
      const classes = [this.placementClass]
      if (vm.active && vm.open) {
        classes.push('is-active')
      }
      return classes
    },
  },
  methods: {
    updateActive() {
      console.log(this)
    },
  },
}
</script>

<style lang="scss">
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;

  &_placeCenter {
    justify-content: center;
  }
  &_placeBottom {
    justify-content: flex-end;
  }
}
</style>
