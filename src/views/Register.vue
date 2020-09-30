<template>
  <page class="Register">
    <template v-slot:header>
      <PageHeader title="注册" backButton @back="goBack" />
    </template>
    <div class="Register__content">
      <div class="Register__logoWrap">
        <AuthAppLogo class="Register__logo" />
      </div>
      <div class="Register__form">
        <div v-if="$route.query.type === 'code'" class="FloatForm">
          <div class="FormControl PhoneWidget" style="margin-bottom: 20px;">
            <span class="PhoneWidget__regionSelect">+86</span>
            <input
              v-model="phone"
              type="text"
              inputmode="numeric"
              name="phone"
              class="PhoneWidget__input FormControl__input"
              placeholder="输入手机号码"
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
            <label>
              <input type="checkbox" name="agree" v-model="agreement" />
              <span>
                我已阅读并接受
                <router-link to="/terms">《用户协议》</router-link>
              </span>
            </label>
          </div>
          <button
            class="btn btn_primary btn_block l_mt_12"
            @click="registerWithCode"
            :disabled="submitting"
          >
            注册
          </button>
          <div class="btn l_mt_5" style="line-height: 44px; text-align:center;">
            已经有账号？ 点此
            <router-link to="/login" replace>登录</router-link>
          </div>
        </div>
        <div v-else class="FloatForm">
          <div class="FormControl PhoneWidget" style="margin-bottom: 20px;">
            <span class="PhoneWidget__regionSelect">+86</span>
            <input
              v-model="phone"
              type="text"
              inputmode="numeric"
              name="phone"
              class="PhoneWidget__input FormControl__input"
              placeholder="输入手机号码"
            />
          </div>
          <div class="FormControl" style="margin-bottom: 20px;">
            <input
              v-model="password"
              type="password"
              class="FormControl__input"
              placeholder="输入密码"
            />
          </div>
          <div class="l_my_5">
            <label>
              <input type="checkbox" name="agree" v-model="agreement" />
              <span>
                我已阅读并接受
                <router-link to="/terms">《用户协议》</router-link>
              </span>
            </label>
          </div>
          <button
            class="btn btn_primary btn_block l_mt_12"
            @click="registerWithPassword"
            :disabled="submitting"
          >
            注册
          </button>
          <div class="btn l_mt_5" style="line-height: 44px; text-align:center;">
            已经有账号？ 点此
            <router-link to="/login" replace>登录</router-link>
          </div>
        </div>
      </div>
      <ThirdPartyLogin />
    </div>
  </page>
</template>

<script>
import PageHeader from '../components/PageHeader'
import ThirdPartyLogin from '../components/ThirdPartyLogin'
import AuthAppLogo from '../components/AuthAppLogo'
import {
  sendRegisterCode,
  registerWithCode,
  registerWithPassword,
} from '../api'
export default {
  name: 'Register',
  components: {
    PageHeader,
    ThirdPartyLogin,
    AuthAppLogo,
  },
  data: function() {
    return {
      callingCode: '+86',
      phone: '',
      code: '',
      password: '',
      agreement: false,
      submitting: false,
      fetchingCode: false,
      codeFetchedAt: undefined,
      left: 0,
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
      sendRegisterCode({
        phone: `${this.callingCode}${this.phone.trim()}`,
      })
        .then(() => {
          this.codeFetchedAt = Date.now()
          this.fetchingCode = false
          this.startCountDown()
        })
        .catch(err => {
          this.fetchingCode = false
          alert(err.message || err.code)
        })
    },
    registerWithCode() {
      if (!this.phone.trim()) {
        alert('请输入手机号码')
        return
      }
      if (!this.code.trim()) {
        alert('请输入验证码')
        return
      }
      if (!this.agreement) {
        alert('注册前，请先接受《用户协议》')
        return
      }
      this.submitting = true
      registerWithCode({
        phone: `${this.callingCode}${this.phone.trim()}`,
        code: this.code.trim(),
      })
        .then(res => {
          this.submitting = false
          this.$store.dispatch('setAuthInfo', {
            user: res.data,
            api_token: res.meta.api_token,
          })
          this.$router.replace(this.$route.query.next || '/my')
        })
        .catch(err => {
          this.submitting = false
          console.log(err)
          alert(err.message || err.code)
        })
    },
    registerWithPassword() {
      if (!this.phone.trim()) {
        alert('请输入手机号码')
        return
      }
      if (!this.password.trim()) {
        alert('请输入密码')
        return
      }
      if (!this.agreement) {
        alert('注册前，请先接受《用户协议》')
        return
      }
      this.submitting = true
      registerWithPassword({
        phone: `${this.callingCode}${this.phone.trim()}`,
        password: this.password.trim(),
      })
        .then(res => {
          this.submitting = false
          this.$store.dispatch('setAuthInfo', {
            user: res.data,
            api_token: res.meta.api_token,
          })
          this.$router.replace(this.$route.query.next || '/my')
        })
        .catch(err => {
          this.submitting = false
          console.log(err)
          alert(err.message || err.code)
        })
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
    this.resentLimit = 5
  },
  mounted() {
    this.$store.commit('hideNav')
  },
  destroyed() {
    this.$store.commit('showNav')
  },
}
</script>

<style lang="scss">
.Register {
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
