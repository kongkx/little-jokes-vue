<template>
  <div id="app" class="app" :class="{ hasBottomNav: showBottomNav }">
    <keep-alive :exclude="excludeRoutes">
      <router-view />
    </keep-alive>
    <BottomNav v-if="showBottomNav" />
    <portal-target name="modal"></portal-target>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BottomNav from './components/BottomNav'
import { loadWechatSDK } from './utils'
export default {
  components: {
    BottomNav,
  },
  computed: mapState({
    showBottomNav: state => state.showBottomNav,
    isWeixin: state => state.device.isWeixin,
    excludeRoutes: state => state.excludeRoutes,
  }),
  created() {
    if (this.isWeixin) {
      loadWechatSDK()
    }
  },
}
</script>

<style lang="scss"></style>
