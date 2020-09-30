<template>
  <page class="Login">
    <template v-slot:header>
      <PageHeader title="登录" backButton @back="goBack" />
    </template>
    <div class="Login__content">
      <div class="Login__logoWrap">
        <AuthAppLogo class="Login__logo" />
      </div>
      <div class="Login__form">
        <div v-if="$route.query.type === 'code'" class="FloatForm">
          <div class="FormControl PhoneWidget" style="margin-bottom: 20px;">
            <span class="PhoneWidget__regionSelect">{{ callingCode }}</span>
            <input
              v-model="phone"
              type="text"
              inputmode="numeric"
              class="PhoneWidget__input FormControl__input"
              placeholder="输入手机号码"
              ref="phoneInput"
            />
          </div>
          <div style="display: flex; margin-bottom: 20px;">
            <div class="FormControl" style="flex: 1;">
              <input
                v-model="code"
                type="text"
                inputmode="numeric"
                class="FormControl__input"
                placeholder="输入验证码"
              />
            </div>
            <button
              @click="sendCode"
              style="margin-left: 18px;"
              class="btn btn_primary"
              :disabled="fetchingCode || left > 0"
            >
              {{ left > 0 ? `${left}秒重试` : '获取验证码' }}
            </button>
          </div>
          <div class="l_my_5">
            <router-link
              :to="{
                name: 'login',
                query: { type: 'password', next: $route.query.next },
              }"
              replace
              >密码登录</router-link
            >
          </div>
          <button
            class="btn btn_primary btn_block l_mt_12"
            @click="loginWithCode"
            :disabled="submitting"
          >
            登录
          </button>
          <div class="btn l_mt_5" style="line-height: 44px; text-align:center;">
            <router-link
              :to="{ name: 'register', query: { next: $route.query.next } }"
              replace
              >注册</router-link
            >
          </div>
        </div>
        <div v-else class="FloatForm">
          <div class="FormControl PhoneWidget" style="margin-bottom: 20px;">
            <span class="PhoneWidget__regionSelect">{{ callingCode }}</span>
            <input
              v-model="phone"
              type="text"
              inputmode="numeric"
              class="PhoneWidget__input FormControl__input"
              placeholder="输入手机号码"
              ref="phoneInput"
            />
          </div>
          <div style="display: flex; margin-bottom: 20px;">
            <div class="FormControl" style="flex: 1;">
              <input
                v-model="password"
                type="password"
                class="FormControl__input"
                placeholder="输入密码"
              />
            </div>
          </div>
          <div class="l_my_5">
            <router-link
              :to="{
                name: 'login',
                query: { next: $route.query.next, type: 'code' },
              }"
              replace
              >验证码登录</router-link
            >
          </div>
          <button
            class="btn btn_primary btn_block l_mt_12"
            @click="loginWithPassword"
            :disabled="submitting"
            type="submit"
          >
            登录
          </button>
          <div class="btn l_mt_5" style="line-height: 44px; text-align:center;">
            <router-link
              :to="{ name: 'register', query: { next: $route.query.next } }"
              replace
              >注册</router-link
            >
          </div>
        </div>
      </div>
      <ThirdPartyLogin class="Login__3rdParty" />
    </div>
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
import ThirdPartyLogin from '../components/ThirdPartyLogin'
import AuthAppLogo from '../components/AuthAppLogo'
import { loginWithPassword, loginWithCode, sendLoginCode } from '../api'

export default {
  name: 'Login',
  components: {
    PageHeader,
    ThirdPartyLogin,
    AuthAppLogo,
  },
  data: function() {
    return {
      callingCode: '+86',
      phone: '',
      password: '',
      code: '',
      left: 0,
      submitting: false,
      fetchingCode: false,
      codeFetchedAt: undefined,
      // `timer`, `left` not reactive
    }
  },
  methods: {
    goBack() {
      this.$root.goBack()
    },
    sendCode() {
      if (!this.phone.trim()) {
        alert('请输入手机号码')
        return
      }
      this.fetchingCode = true
      sendLoginCode({
        phone: `${this.callingCode}${this.phone.trim()}`,
      })
        .then(() => {
          this.codeFetchedAt = Date.now()
          this.fetchingCode = false
          this.startCountDown()
        })
        .catch(err => {
          this.fetchingCode = false
          alert(err.message)
        })
    },
    loginWithPassword() {
      if (!this.phone.trim()) {
        alert('请输入手机号码')
        return
      }
      if (!this.password.trim()) {
        alert('请输入密码')
        return
      }
      this.submitting = true
      loginWithPassword({
        phone: `${this.callingCode}${this.phone.trim()}`,
        password: this.password.trim(),
      })
        .then(res => {
          this.submitting = false
          this.loginSuccess(res)
        })
        .catch(err => {
          this.submitting = false
          alert(err.message || err.code)
        })
    },
    loginWithCode() {
      if (!this.phone.trim()) {
        alert('请输入手机号码')
        return
      }
      if (!this.code.trim()) {
        alert('请输入验证码')
        return
      }
      this.submitting = true
      loginWithCode({
        phone: `${this.callingCode}${this.phone.trim()}`,
        code: this.code.trim(),
      })
        .then(res => {
          this.submitting = false
          this.loginSuccess(res)
        })
        .catch(err => {
          this.submitting = false
          if (err.message) {
            alert(err.message)
          }
        })
    },
    loginSuccess(res) {
      this.$store.dispatch('setAuthInfo', {
        user: res.data,
        api_token: res.meta.api_token,
      })
      this.$router.replace(this.$route.query.next || '/my')
    },
    updateCountDownLeft() {
      if (!this.codeFetchedAt) {
        return
      }
      const left = Math.max(
        Math.floor(this.resentLimit - (Date.now() - this.codeFetchedAt) / 1000),
        0
      )
      this.left = left
    },
    startCountDown() {
      var vm = this
      vm.timer = setInterval(() => {
        vm.updateCountDownLeft()
        if (vm.left <= 0) {
          clearInterval(vm.timer)
          vm.timer = undefined
        }
      }, 1000)
      vm.updateCountDownLeft()
    },
  },
  created() {
    this.timer = undefined
    this.resentLimit = 60
  },
  mounted() {
    this.$store.commit('hideNav')
    this.$nextTick(() => {
      this.$refs.phoneInput && this.$refs.phoneInput.focus()
    })
  },
  destroyed() {
    this.$store.commit('showNav')
  },
}
</script>

<style lang="scss">
.Login {
  &__content {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  &__logoWrap {
    margin-top: 46px;
    margin-bottom: 32px;
  }
  &__logo {
    display: block;
    margin: 0 auto;
  }
  &__form {
    padding-left: 16px;
    padding-right: 16px;
  }
  &__3rdParty {
    margin-top: 14px;
  }
}
</style>
