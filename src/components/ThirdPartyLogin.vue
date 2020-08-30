<template>
  <div class="ThirdPartyLogin">
    <div class="ThirdPartyLogin__label">第三方账号登录</div>
    <div class="ThirdPartyLogin__Options">
      <div class="ThirdPartyLogin__Option">
        <button class="ThirdPartyLogin__wechat" @click="handleWechatLogin">
          <WechatIcon />
        </button>
      </div>
      <div class="ThirdPartyLogin__Option">
        <button class="ThirdPartyLogin__weibo" @click="handleWeiboLogin">
          <WeiboIcon />
        </button>
      </div>
      <div class="ThirdPartyLogin__Option" @click="handleQQLogin">
        <button class="ThirdPartyLogin__qq">
          <QQIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import WechatIcon from "../components/WechatIcon";
import WeiboIcon from "../components/WeiboIcon";
import QQIcon from "../components/QQIcon";
export default {
  components: {
    WechatIcon,
    WeiboIcon,
    QQIcon
  },
  methods: {
    handleWechatLogin() {
      if (this.toasted) {
        this.toasted.text("微信登录未接入");
      } else {
        this.toasted = this.$toasted.show("微信登录未接入", {
          duration: 3000,
          singleton: true,
          onComplete: () => {
            this.toasted = undefined;
          }
        });
      }
    },
    handleWeiboLogin() {
      if (this.toasted) {
        this.toasted.text("微博登录未接入");
      } else {
        this.toasted = this.$toasted.show("微博登录未接入", {
          duration: 3000,
          singleton: true,
          onComplete: () => {
            this.toasted = undefined;
          }
        });
      }
    },
    handleQQLogin() {
      if (this.toasted) {
        this.toasted.text("QQ登录未接入");
      } else {
        this.toasted = this.$toasted.show("QQ登录未接入", {
          duration: 3000,
          singleton: true,
          onComplete: () => {
            this.toasted = undefined;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
%loginOptionBtn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border-style: solid;
  border-width: 1.5px;
  background-color: transparent;
  padding: 0;
  overflow: hidden;
}
.ThirdPartyLogin {
  padding-top: 30px;
  padding-bottom: 30px;
  &__label {
    text-align: center;
    margin-bottom: 30px;
  }
  &__Options {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__Option {
    margin-left: 18px;
    margin-right: 18px;
  }

  &__wechat,
  &__weibo,
  &__qq {
    @extend %loginOptionBtn;
    .icon {
      fill: currentColor;
    }
  }
  &__wechat {
    color: var(--wechat-color);
    border-color: var(--wechat-color);
  }
  &__weibo {
    color: var(--weibo-color);
    border-color: var(--weibo-color);
  }
  &__qq {
    color: var(--qq-color);
    border-color: var(--qq-color);
  }
}
</style>
