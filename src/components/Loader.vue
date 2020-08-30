<template>
  <div
    class="c-loader"
    :class="{ 'c-loader_inline': inline }"
    :style="sizeStyle"
  >
    Loading...
  </div>
</template>
<script>
export default {
  name: "loader",
  props: {
    inline: {
      type: Boolean
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    sizeStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    }
  }
};
</script>
<style lang="scss">
.c-loader {
  --bg-color: var(--meta-color);
  font-size: 10px;
  text-indent: -9999em;
  border-radius: 50%;
  background: var(--bg-color);
  background: linear-gradient(
    to right,
    var(--bg-color) 10%,
    rgba(94, 94, 94, 0) 42%
  );
  position: relative;
  animation: load3 1s infinite linear;
  transform: translateZ(0);
  &_inline {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    margin-right: 5px;
  }
}
.c-loader:before {
  width: 50%;
  height: 50%;
  background: var(--bg-color);
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.c-loader:after {
  background: var(--body-background-color);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
