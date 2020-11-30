<template>
  <page>
    <template v-slot:header>
      <PageHeader
        :title="$route.query.error ? 'Error' : 'Authorizing'"
        :backButton="!!$route.query.error"
        @back="goBack"
      />
    </template>
    <div v-if="!!$route.query.error" class="l_mx_12 l_mt_12">
      {{ $route.query.error_description }}
    </div>
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
import { loginWithOauthCode } from '../api'
import hideBottomBar from '../mixins/hideBottomBar'
export default {
  name: 'OauthHandling',
  components: {
    PageHeader,
  },
  mixins: [hideBottomBar],
  methods: {
    goBack() {
      this.$root.goBack()
    },
  },
  mounted() {
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
}
</script>
