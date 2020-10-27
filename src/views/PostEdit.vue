<template>
  <page class="PostCreate">
    <template v-slot:header>
      <PageHeader title="编辑" backButton @back="goBack">
        <template v-slot:right>
          <button
            class="PageHeader__btn"
            style="margin-right: 12px;"
            @click="handleSubmit"
            :disabled="submitting"
          >
            保存
          </button>
        </template>
      </PageHeader>
    </template>
    <div v-if="data" class="PostCreate__content">
      <div class="FieldSet">
        <textarea
          class="FormInput"
          placeholder="内容"
          style="min-height: 200px;"
          v-model="content"
        />
      </div>
    </div>
    <LoadingMask v-if="fetching" />
  </page>
</template>

<script>
import { getPost, updatePost } from '../api'
import LoadingMask from '../components/LoadingMask'
export default {
  name: 'post-edit',
  components: {
    LoadingMask,
  },
  data() {
    return {
      submitting: false,
      content: '',
      data: null,
      fetchError: null,
      fetching: true,
    }
  },
  methods: {
    handleSubmit() {
      const content = this.content.trim()
      if (!content) {
        alert('请输入内容')
        return
      }
      if (content === this.data.content) {
        alert('请进行修改后再提交')
        return
      }
      this.submitting = true
      updatePost(this.$route.params.id, {
        content,
      })
        .then(() => {
          this.submitting = false
          this.goBack()
        })
        .catch(() => {
          this.submitting = false
        })
    },
    goBack() {
      const hasHistory = window.history.length > 2
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'my',
        })
      }
    },
  },
  created() {
    const postId = this.$route.params.id
    getPost(postId)
      .then(res => {
        this.data = res.data
        this.content = res.data.content
      })
      .catch(err => {
        this.fetchError = err
      })
      .finally(() => {
        this.fetching = false
      })
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
}
</style>
