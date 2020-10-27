<template>
  <div id="app" class="app" :class="{ hasBottomNav: showBottomNav }">
    <router-view />
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
  }),
  created() {
    if (this.isWeixin) {
      loadWechatSDK()
    }
  },
}
</script>

<style lang="scss">
:root {
  --body-background-color: #fafafa;
  --text-color: #111111;
  --primary-color: #fdcd31;
  --border-color: #eeeeee;
  --danger-color: #cc0000;
  --link-color: #1276d4;
  --wechat-color: #62c852;
  --weibo-color: #e90f24;
  --qq-color: #1786df;
  --github-color: #111111;
  --meta-color: #999999;

  /* bottom nav */
  --bottom-nav-height: 45px;

  --page-header-height: 40px;
}
html {
  height: 100%;
}
body {
  margin: 0;
  background-color: var(--body-background-color);
  color: var(--text-color);
  font-family: sans-serif;
  height: 100%;
  // native-like pwa
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
a {
  color: var(--link-color);
  text-decoration: none;
}
div {
  box-sizing: border-box;
}
.app {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  padding-top: 40px;
  &.hasBottomNav {
    padding-bottom: var(--bottom-nav-height);
  }
}
/* utilies */
.l_mt_12 {
  margin-top: 12px;
}
.l_mt_16 {
  margin-top: 16px;
}
.l_my_5,
.l_mt_5 {
  margin-top: 5px;
}
.l_my_5,
.l_mb_5 {
  margin-bottom: 5px;
}
.l_ml_5,
.l_mx_5 {
  margin-left: 5px;
}
.l_ml_12,
.l_mx_12 {
  margin-left: 12px;
}
.l_mr_12,
.l_mx_12 {
  margin-right: 12px;
}
.t_center {
  text-align: center;
}
.t_meta {
  color: var(--meta-color);
}
.btn {
  border: none;
  font-size: 16px;
  border-radius: 4px;
  padding-left: 18px;
  padding-right: 18px;
  height: 44px;
  &_sm {
    height: 36px;
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
  }
  &_block {
    display: block;
    width: 100%;
  }
  &_primary {
    background-color: var(--primary-color);
  }
  &_link {
    background-color: transparent;
    color: var(--link-color);
  }
}
.well {
  padding: 24px 16px;
  &_hint {
    color: var(--meta-color);
    text-align: center;
  }
}
// toasted style overwrite
.toasted-container.top-right {
  top: var(--page-header-height) !important;
}
.toasted.toasted-primary.default {
  background-color: var(--primary-color);
  color: var(--text-color);
}
// login form related
.FloatForm {
  padding: 24px 24px 8px 24px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
}
.FormControl {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  &__input {
    width: 100%;
    border: none;
    height: 42px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 12px;
  }
}
.FormInput {
  width: 100%;
  box-sizing: border-box;
  border: none;
  padding: 5px;
  font-size: 16px;
  font-family: sans-serif;
}
.PhoneWidget {
  display: flex;
  &__regionSelect {
    border-right: 1px solid var(--border-color);
    padding: 10px 16px;
  }
}
</style>
