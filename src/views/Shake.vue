<template>
  <div class="Shake">
    <PageHeader title="摇一摇" />
    <div v-if="isFetching" class="Shake__loading">
      <loader inline />
    </div>
    <div class="Shake__placeholder" v-else-if="!post">
      <img
        class="Shake__placeholderIcon"
        :src="require('@/assets/imgs/shake.png')"
        :srcset="require('@/assets/imgs/shake@2x.png') + ' 2x'"
      />
      <button
        class="btn btn_primary"
        style="margin-top: 24px;"
        v-if="showInitFeatureHint"
        @click="initShakeService"
      >
        点击开启“摇一摇”
      </button>
    </div>
    <div class="Shake__main" v-else>
      <PostDetail :data="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchRandomPost } from '../api'
import PageHeader from '../components/PageHeader'
import PostDetail from '../components/PostDetail'
import Loader from '../components/Loader'

import shakeService from '../services/shake'
import { setCache, getCache } from '../services/cache'

export default {
  name: 'Shake',
  data: function(vm) {
    const cache = getCache(`route.${vm.$route.name}`) || {}
    return {
      post: null,
      isFetching: false,
      fetchedAt: null,
      showInitFeatureHint: !vm.$store.state.device.onceTouched,
      ...cache,
    }
  },
  computed: mapState({
    hasMotionFeature: state => state.device.features.motion,
    onceTouched: state => state.device.onceTouched,
  }),
  components: {
    PageHeader,
    PostDetail,
    Loader,
  },
  methods: {
    initShakeService() {
      this.showInitFeatureHint = false
      shakeService.start()
    },
    handleShake() {
      const vm = this
      if (
        this.isFetching ||
        (this.fetchedAt && Date.now() - this.fetchedAt < 1000)
      ) {
        return
      }
      vm.isFetching = true
      navigator.vibrate =
        navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate
      if (navigator.vibrate) {
        navigator.vibrate(300)
      }
      fetchRandomPost({
        page: 1,
        page_size: 1,
        seed: Date.now(),
      })
        .then(res => {
          vm.post = res.data[0]
          vm.fetchedAt = Date.now()
          vm.isFetching = false
        })
        .catch(err => {
          console.log(err)
          vm.isFetching = false
        })
    },
    handleShakeInitFailed(e) {
      switch (e.detail.code) {
        case 'FEATURE_DISABLED':
          alert('机身抖动功能已禁用')
          break
        case 'FEATURE_NOT_ALLOWED':
          this.showInitFeatureHint = true
          break
      }
    },
  },
  mounted() {
    window.addEventListener('shake', this.handleShake)
    window.addEventListener('shake_init_failed', this.handleShakeInitFailed)
    if (this.onceTouched) {
      shakeService.start()
    }
  },
  updated() {
    setCache(`route.${this.$route.name}`, this.$data)
  },
  beforeDestroy() {
    shakeService.stop()
    window.removeEventListener('shake', this.handleShake)
    window.addEventListener('shake_init_failed', this.handleShakeInitFailed)
  },
}
</script>

<style lang="scss">
.Shake {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  &__placeholder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__loading {
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
  }
  &__main {
    flex: 1;
  }
}
</style>
