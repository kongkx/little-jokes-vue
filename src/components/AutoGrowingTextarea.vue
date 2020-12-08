<template>
  <label class="input-sizer stacked" :data-value="value">
    <textarea
      @input="handleInput"
      ref="input"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
  </label>
</template>

<script>
export default {
  name: 'AutoGrowingTextarea',
  props: ['value', 'rows', 'placeholder'],
  data() {
    return {
      content: this.value,
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss">
.input-sizer {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  border: solid 1px;
  padding: 0.25em 0.5em;
  box-sizing: border-box;

  &.stacked {
    padding: 0.5em;
    align-items: stretch;

    &::after,
    input,
    textarea {
      grid-area: 2 / 1;
    }
  }

  &::after,
  input,
  textarea {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    box-sizing: border-box;
  }

  span {
    padding: 0.25em;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }

  &:focus-within {
    // outline: solid 1px blue;
    // box-shadow: 4px 4px 0px blue;

    // > span {
    //   color: blue;
    // }

    // textarea:focus,
    // input:focus {
    //   outline: none;
    // }
  }
}
</style>
