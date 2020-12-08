<template>
  <page class="MyPosts">
    <template v-slot:header>
      <PageHeader title="我的笑话" backButton @back="goBack">
        <template v-slot:right>
          <button
            class="PageHeader__btn"
            style="margin-right: 12px"
            @click="
              $router.push({
                name: 'post-create',
              })
            "
          >
            添加
          </button>
        </template>
      </PageHeader>
    </template>
    <post-list
      ref="postsList"
      class="MyPosts__list"
      :fetchData="handleDataFetch"
    />
  </page>
</template>

<script>
import { fetchUserPosts } from '../api'
import PostList from '../components/PostList'
import hideBottomBar from '../mixins/hideBottomBar'
export default {
  name: 'MyPosts',
  components: {
    PostList,
  },
  mixins: [hideBottomBar],
  methods: {
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
    handleDataFetch(params) {
      const userId = this.$store.getters.currentUserId
      return fetchUserPosts(userId, params)
    },
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
      vm.$refs.postsList.$refs.mescroll &&
        vm.$refs.postsList.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
    // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
    this.$refs.postsList.$refs.mescroll &&
      this.$refs.postsList.$refs.mescroll.beforeRouteLeave()
    next()
  },
}
</script>
