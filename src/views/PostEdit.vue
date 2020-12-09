<template>
  <page class="PostCreate">
    <template v-slot:header>
      <PageHeader title="编辑" backButton @back="goBack">
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
    <div v-if="data" class="PostCreate__content">
      <div class="FieldSet">
        <label class="FieldSet__label" for="title"> 标题 </label>
        <input class="FormInput" v-model="title" placeholder="标题" />
      </div>
      <div class="FieldSet">
        <label for="content" class="FieldSet__label">内容</label>
        <AutoGrowingTextarea
          ref="input"
          class="FormInput"
          placeholder="内容"
          rows="10"
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
import hideBottomBar from '../mixins/hideBottomBar'
export default {
  name: 'PostEdit',
  components: {
    LoadingMask,
  },
  mixins: [hideBottomBar],
  data() {
    return {
      submitting: false,
      submitted: false,
      title: '',
      content: '',
      data: null,
      fetchError: null,
      fetching: true,
    }
  },
  computed: {
    isDirty(vm) {
      return !vm.submitted && vm.data && vm.data.content !== vm.content.trim()
    },
  },
  methods: {
    handleSubmit() {
      const content = this.content.trim()
      const title = this.title.trim()
      if (!content) {
        alert('请输入内容')
        return
      }
      let dirty = false
      const patch = {}
      if (title !== this.data.title) {
        dirty = true
        patch.title = title
      }
      if (content !== this.data.content) {
        dirty = true
        patch.content = content
      }

      if (!dirty) {
        this.goBack()
        return
      }

      this.submitting = true
      updatePost(this.$route.params.id, patch)
        .then(() => {
          this.submitting = false
          this.submitted = true
          this.$toasted.success('修改成功')
          sessionStorage &&
            sessionStorage.setItem('myListUpdatedAt', Date.now())
          this.goBack()
        })
        .catch(() => {
          this.submitting = false
        })
    },
    goBack() {
      const hasHistory = window.history.length > 2 || window.location.state
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'my',
        })
      }
    },
  },
  watch: {
    content: function() {
      this.submitted = false
    },
  },
  mounted() {
    const postId = this.$route.params.id
    getPost(postId)
      .then(res => {
        this.data = res.data
        this.content = res.data.content
        this.title = res.data.title
        this.$nextTick(() => {
          this.$refs.input && this.$refs.input.focus()
        })
      })
      .catch(err => {
        this.fetchError = err
      })
      .finally(() => {
        this.fetching = false
      })
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDirty) {
      next(window.confirm('放弃修改笑话？'))
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
  textarea {
    background-color: transparent;
  }
  @media (prefers-color-scheme: dark) {
    background-color: #3e3f46;
  }
}
</style>
