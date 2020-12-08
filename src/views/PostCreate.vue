<template>
  <page class="PostCreate">
    <template v-slot:header>
      <PageHeader title="新笑话" backButton @back="goBack">
        <template v-slot:right>
          <button
            class="PageHeader__btn"
            style="margin-right: 12px"
            @click="handleSubmit"
            :disabled="submitting"
          >
            保存
          </button>
        </template>
      </PageHeader>
    </template>
    <div class="PostCreate__content">
      <div class="FieldSet">
        <AutoGrowingTextarea
          ref="input"
          class="FormInput"
          placeholder="内容"
          rows="10"
          v-model="content"
        />
      </div>
    </div>
  </page>
</template>

<script>
import { createPost } from '../api'
import hideBottomBar from '../mixins/hideBottomBar'
export default {
  name: 'PostCreate',
  data() {
    return {
      submitting: false,
      saved: false,
      content: '',
    }
  },
  mixins: [hideBottomBar],
  methods: {
    handleSubmit() {
      const content = this.content.trim()
      if (!content) {
        alert('请输入内容')
        return
      }
      this.submitting = true
      createPost({
        content,
      })
        .then(() => {
          this.submitting = false
          this.saved = true
          this.$toasted.success('创建成功')
          sessionStorage &&
            sessionStorage.setItem('myListUpdatedAt', Date.now())
          this.goBack()
        })
        .catch(err => {
          this.submitting = false
          alert(err.message)
        })
    },
    goBack() {
      const hasHistory = window.history.length > 2 || location.state
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'my',
        })
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.content.trim() && !this.saved) {
      next(window.confirm('放弃添加新笑话？'))
    } else {
      next()
    }
  },
}
</script>

<style lang="scss">
.PostCreate {
  background-color: var(--body-background-color);
}
.FormLabel {
  margin-top: 8px;
  margin-bottom: 4px;
}
.FieldSet {
  background-color: white;
  margin-bottom: 12px;
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  @media (prefers-color-scheme: dark) {
    background-color: #3e3f46;
    textarea {
      background: transparent;
    }
  }
}
</style>
