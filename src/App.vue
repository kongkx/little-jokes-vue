<template>
  <div id="app" class="app">
    <router-view />
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav";
export default {
  components: {
    BottomNav
  }
};
</script>

<style>
:root {
  --body-background-color: #fafafa;
  --text-color: #111111;
  --primary-color: #fdcd31;

  /* bottom nav */
  --bottom-nav-height: 45px;
}
body {
  margin: 0;
  background-color: var(--body-background-color);
}
.app {
  padding-bottom: var(--bottom-nav-height);
}
</style>
