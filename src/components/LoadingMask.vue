<template>
  <div class="LoadingMask">
    <Loader />
  </div>
</template>

<script>
import Loader from './Loader'
export default {
  name: 'LoadingMask',
  components: { Loader },
}
</script>

<style lang="scss">
.LoadingMask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(128, 128, 128, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
