<template>
  <div class="PostPage">
    <PageHeader backButton @back="goBack" />
    <PostDetail v-if="!!data" :data="data" />
  </div>
</template>

<script>
import { getPost } from "../api";
import PageHeader from "../components/PageHeader";
import PostDetail from "../components/PostDetail";

export default {
  name: "PostPage",
  components: {
    PostDetail,
    PageHeader
  },
  data: function() {
    return {
      data: null,
      fetching: false,
      fetchError: null
    };
  },
  methods: {
    goBack() {
      this.$root.goBack();
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    const postId = this.$route.params.id;
    this.fetching = true;
    getPost(postId)
      .then(res => {
        this.fetching = false;
        this.data = res.data;
      })
      .catch(err => {
        this.fetching = false;
        this.fetchError = err;
      });
  }
};
</script>

<style lang="scss">
.PostPage {
  height: 100%;
}
</style>
