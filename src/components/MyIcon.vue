<template>
  <svg
    class="MyIcon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g transform="translate(1088 -185)">
      <circle
        class="MyIcon__activeHint"
        :class="{ 'is-active': active }"
        cx="5"
        cy="5"
        r="5"
        transform="translate(-1081 189)"
      />
      <path
        class="MyIcon__path"
        :class="{ 'is-active': active }"
        d="M400.858,738.551a.661.661,0,0,1-.661-.659,6.46,6.46,0,1,0-12.92,0,.66.66,0,0,1-1.32,0,7.806,7.806,0,0,1,4.907-7.219,5.578,5.578,0,1,1,5.669.042,7.879,7.879,0,0,1,4.984,7.175A.661.661,0,0,1,400.858,738.551Zm-11.425-12.632a4.447,4.447,0,0,0,1.2,2.921,4.094,4.094,0,0,0,3.068,1.312,4.4,4.4,0,0,0,3.566-1.931,4,4,0,0,0,.694-2.329,4.39,4.39,0,0,0-2.177-3.716,3.955,3.955,0,0,0-2.083-.545,4.406,4.406,0,0,0-3.351,1.633,4.036,4.036,0,0,0-.909,2.628A.085.085,0,0,1,389.433,725.919Z"
        transform="translate(-1469.957 -532.314)"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'MyIcon',
  props: {
    active: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss">
.MyIcon {
  fill: currentColor;
  &__activeHint {
    fill: transparent;
    &.is-active {
      fill: var(--primary-color);
    }
  }
  @media (prefers-color-scheme: dark) {
    &__path.is-active {
      fill: var(--primary-color);
    }
    &__activeHint.is-active {
      fill: #202022;
    }
  }
}
</style>
