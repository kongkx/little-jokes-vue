<template>
  <form class="PostReportForm" @submit.prevent="handleSubmit">
    <div class="PostReportForm__title">请描述举报理由</div>
    <div class="PostReportForm__content">
      <textarea
        autofocus
        class="PostReportForm__input"
        v-model="description"
        @input="assertMaxChars"
      />
      <div class="PostReportForm__footer">
        <span class="PostReportForm__hint"
          >{{ inputCount }} / {{ maxLength }}</span
        >
        <button
          type="submit"
          class="btn btn_sm btn_primary"
          :disabled="submitting"
        >
          提交
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { reportPost } from '../api'
export default {
  name: 'PostReportForm',
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      description: '',
      submitting: false,
      maxLength: 100,
    }
  },
  computed: {
    inputCount() {
      return this.description.trim().length
    },
  },
  methods: {
    assertMaxChars() {
      if (this.description.length >= this.maxLength) {
        this.description = this.description.substring(0, this.maxLength)
      }
    },
    handleSubmit() {
      if (!this.description) {
        alert('请填入举报理由')
        return
      }
      this.submitting = true
      reportPost(this.postId, {
        description: this.description,
      })
        .then(() => {
          this.submitting = false
          this.$emit('submitted')
        })
        .catch(err => {
          this.submitting = false
          if (err.message) {
            alert(err.message)
          }
        })
    },
  },
}
</script>

<style lang="scss">
.PostReportForm {
  background: white;
  padding-top: 5px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  &__title {
    font-size: 14px;
    text-align: center;
    margin-bottom: 5px;
  }
  &__content {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
    overflow: hidden;
  }
  &__input {
    width: 100%;
    min-height: 60px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    font-size: 16px;
    font-family: sans-serif;
    padding: 4px;
  }
  &__footer {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__hint {
    color: var(--meta-color);
    font-size: 14px;
  }
}
</style>
