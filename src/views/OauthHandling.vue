<template>
  <div class="Page">
    <PageHeader
      :title="$route.query.error ? 'Error' : 'Authorizing'"
      :backButton="!!$route.query.error"
      @back="goBack"
    />
    <div v-if="!!$route.query.error" class="l_mx_12 l_mt_12">
      {{ $route.query.error_description }}
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
import { loginWithOauthCode } from '../api'
export default {
  name: 'OauthHandling',
  components: {
    PageHeader,
  },
  methods: {
    goBack() {
      this.$root.goBack()
    },
  },
  mounted() {
    this.$store.commit('hideNav')
    if (!this.$route.query.error) {
      loginWithOauthCode(this.$route.params.provider, this.$route.query)
        .then(res => {
          this.$store.dispatch('setAuthInfo', {
            user: res.data,
            api_token: res.meta.api_token,
          })
          this.$router.replace(this.$route.query.next || '/my')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  },
  destroyed() {
    this.$store.commit('showNav')
  },
}
</script>
