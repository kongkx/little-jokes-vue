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
    </div>
    <PostDetail v-else :data="post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fetchRandomPost } from "../api";
import PageHeader from "../components/PageHeader";
import PostDetail from "../components/PostDetail";
import Loader from "../components/Loader";

import shakeService from "../services/shake";

export default {
  name: "Shake",
  data: function() {
    return {
      post: null,
      isFetching: false,
      fetchedAt: null
    };
  },
  computed: mapState({
    hasMotionFeature: state => state.device.features.motion
  }),
  components: {
    PageHeader,
    PostDetail,
    Loader
  },
  methods: {
    handleShake() {
      const vm = this;
      if (
        this.isFetching ||
        (this.fetchedAt && Date.now() - this.fetchedAt < 1000)
      ) {
        return;
      }
      vm.isFetching = true;
      fetchRandomPost({
        page: 1,
        page_size: 1,
        seed: Date.now()
      })
        .then(res => {
          vm.post = res.data[0];
          vm.fetchedAt = Date.now();
          vm.isFetching = false;
        })
        .catch(err => {
          console.log(err);
          vm.isFetching = false;
        });
    },
    handleShakeInitFailed(e) {
      console.log(e.detail);
      switch (e.detail.code) {
        case "FEATURE_DISABLED":
          alert("已禁用");
      }
    }
  },
  mounted() {
    window.addEventListener("shake", this.handleShake);
    // window.addEventListener("shake_init_failed", this.handleShakeInitFailed);
    shakeService.start();
  },
  beforeDestroy() {
    shakeService.stop();
    window.removeEventListener("shake", this.handleShake);
    // window.addEventListener("shake_init_failed", this.handleShakeInitFailed);
  }
};
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
  }
  &__loading {
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
  }
}
</style>
