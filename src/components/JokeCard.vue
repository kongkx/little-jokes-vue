<template>
  <div class="JokeCardWrap">
    <div
      class="JokeCardWrap__main JokeCard"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchmove="handleTouchMove"
      :style="swipeAnimation"
      :class="{ hasArchived: data.like && data.like.archived_at }"
    >
      <div class="JokeCard__main">{{ data.content }}</div>
      <div class="JokeCard__footer">
        <button class="ActionButton" @click="openExtraMenu">
          <DotsIcon />
        </button>
        <button class="ActionButton" @click="openSharePanel">
          <ShareIcon />
        </button>
        <button class="ActionButton" @click="toggleLike(data)">
          <LikeIcon :liked="liked" />
        </button>
      </div>
      <ActionSheet
        :open="extraMenuOpened"
        :actions="actions"
        @cancel="closeExtraMenu"
      />
      <Modal
        :open="sharePanelOpend"
        @cancel="closeSharePanel"
        placement="bottom"
      >
        <div class="ShareModal" @click.stop>
          <div class="ShareModal__title">分享到</div>
          <div class="ShareModal__content ShareOptions">
            <button class="ShareOptionBtn" @click="handleLinkShare">
              <LinkIcon
                class="ShareOptionBtn__icon ShareOptionBtn__icon_link"
              />
              <span class="ShareButtonBtn__label">复制链接</span>
            </button>
            <button class="ShareOptionBtn" @click="handleWechatShare">
              <WechatIcon
                class="ShareOptionBtn__icon ShareOptionBtn__icon_wechat"
              />
              <span class="ShareButtonBtn__label">微信</span>
            </button>
            <button
              v-if="isWeixin"
              class="ShareOptionBtn"
              @click="handleFriendGroupShare"
            >
              <WechatFeedIcon
                class="ShareOptionBtn__icon ShareOptionBtn__icon_wechat"
              />
              <span class="ShareButtonBtn__label">朋友圈</span>
            </button>
            <button class="ShareOptionBtn" @click="handleWeiboShare">
              <WeiboIcon
                class="ShareOptionBtn__icon ShareOptionBtn__icon_weibo"
              />
              <span class="ShareButtonBtn__label">微博</span>
            </button>
            <button class="ShareOptionBtn" @click="handleQQShare">
              <QQIcon class="ShareOptionBtn__icon ShareOptionBtn__icon_qq" />
              <span class="ShareButtonBtn__label">QQ</span>
            </button>
          </div>
          <div class="ShareModal__cancel" @click.stop="closeSharePanel">
            取消
          </div>
        </div>
      </Modal>
      <Modal :open="showReportForm" @cancel="hideReportForm" placement="bottom">
        <PostReportForm :postId="data.id" @submitted="hideReportForm" />
      </Modal>
    </div>
    <div
      ref="actions"
      class="JokeCardWrap__actions"
      :style="swipeAnimation"
      v-if="swipeActions"
    >
      <button
        class="JokeCardWrap__action"
        v-for="item in swipeActions"
        :key="item.id"
        @click="
          () => {
            item.callback(data, index).then(() => {
              showActions = false
            })
          }
        "
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
import LikeIcon from './LikeIcon'
import DotsIcon from './DotsIcon'
import ShareIcon from './ShareIcon'
import LinkIcon from './LinkIcon'
import WechatIcon from './WechatIcon'
import WechatFeedIcon from './WechatFeedIcon'
import WeiboIcon from './WeiboIcon'
import QQIcon from './QQIcon'
import ActionSheet from './ActionSheet'
import Modal from './Modal'
import PostReportForm from './PostReportForm'
import { likePost, unlikePost } from '../api'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'JokeCard',
  props: {
    data: {
      type: Object,
    },
    index: {
      type: Number,
    },
    swipeActions: {
      type: Array,
    },
  },
  components: {
    LikeIcon,
    DotsIcon,
    ShareIcon,
    LinkIcon,
    WechatIcon,
    WechatFeedIcon,
    WeiboIcon,
    QQIcon,
    PostReportForm,
    ActionSheet,
    Modal,
  },

  data() {
    return {
      extraMenuOpened: false,
      sharePanelOpend: false,
      showReportForm: false,
      swipeDelta: 0,
      isSwiping: false,
      showActions: false,
      actions: [{ label: '举报', onClick: this.report }],
    }
  },

  computed: {
    hasSwipeActions() {
      return this.swipeActions && this.swipeActions.length > 0
    },
    postPath() {
      if (this.data) {
        return `/posts/${this.data.id}`
      }
      return ''
    },
    liked() {
      if (this.isUnliking) {
        return false
      }
      if (this.isLiking) {
        return true
      }
      return !!this.data.like
    },
    swipeAnimation() {
      // if is swiping then
      if (this.isSwiping) {
        const style = {
          transition: 'transform 33ms linear',
        }
        if (this.swipeDelta < 0) {
          style.transform = `translateX(${this.swipeDelta}px)`
        }
        return style
      } else if (this.showActions) {
        if (!this.$refs.actions) {
          return {}
        }
        const { width } = this.$refs.actions.getBoundingClientRect()
        return {
          transform: `translateX(-${width}px)`,
        }
      } else {
        return {
          transform: `translateX(0px)`,
        }
      }
    },
    ...mapGetters(['isLoggedIn']),
    ...mapState({
      isWeixin: state => state.device.isWeixin,
    }),
  },

  methods: {
    confirmLogin(msg = '您需要先登录后才能进行操作') {
      return new Promise((resolve, reject) => {
        const result = window.confirm(msg)
        if (result) {
          resolve()
        } else {
          reject()
        }
      })
    },
    toggleLike(data) {
      if (!this.isLoggedIn) {
        this.confirmLogin()
          .then(() => {
            this.$router.push({
              name: 'login',
              next: this.postPath,
            })
          })
          .catch(() => {})
        return
      }
      if (this.isLiking || this.isUnliking) {
        return
      }

      if (data.like) {
        this.isLiking = true
        unlikePost(data.id).then(() => {
          data.like = null
          this.isLiking = false
        })
      } else {
        this.isUnliking = true
        likePost(data.id).then(res => {
          data.like = res.data.like
          this.isUnliking = false
        })
      }
    },
    openExtraMenu() {
      this.extraMenuOpened = true
    },
    closeExtraMenu() {
      this.extraMenuOpened = false
    },
    getShareInfo() {
      return {
        title: `小小笑话 -- ${this.data.content.substring(0, 4)}...`,
        text:
          this.data.content.length > 50
            ? this.data.content.substring(0, 50) + '...'
            : this.data.content.substring,
        url: this.getShareLink(),
        image_url: window.location.origin + '/AppIcon.png',
      }
    },
    openSharePanel() {
      if (navigator.share) {
        navigator
          .share(this.getShareInfo())
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing', error))
      } else {
        this.sharePanelOpend = true
      }
    },
    closeSharePanel() {
      this.sharePanelOpend = false
    },
    report() {
      if (!this.isLoggedIn) {
        this.confirmLogin()
          .then(() => {
            this.$router.push({
              name: 'login',
              next: this.postPath,
            })
          })
          .catch(() => {})
          .finally(this.closeExtraMenu)
        return
      }
      this.showReportForm = true
      this.closeExtraMenu()
    },
    hideReportForm() {
      this.showReportForm = false
    },
    // share feature
    getShareLink() {
      return window.location.origin + this.postPath
    },
    handleLinkShare() {
      var vm = this
      this.closeSharePanel()
      navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'denied') {
          this.$toasted.error('无法获取粘贴板写入权限', {
            duration: 3000,
          })
        } else if (result.state == 'granted') {
          navigator.clipboard
            .writeText(vm.getShareLink())
            .then(() => {
              const msg = '链接已复制'
              this.$toasted.show(msg, {
                duration: 3000,
              })
            })
            .catch(err => {
              alert(err.message)
            })
        }
      })
    },
    handleWechatShare() {
      var vm = this
      this.closeSharePanel()
      if (!this.isWeixin) {
        navigator.permissions
          .query({ name: 'clipboard-write' })
          .then(result => {
            if (result.state === 'denied') {
              this.$toasted.error('无法获取粘贴板写入权限', {
                duration: 3000,
              })
            } else if (result.state == 'granted') {
              navigator.clipboard
                .writeText(vm.getShareLink())
                .then(() => {
                  const msg = '链接已复制，请打开微信后，粘贴后发送'
                  this.$toasted.show(msg, {
                    duration: 3000,
                  })
                })
                .catch(err => {
                  alert(err.message)
                })
            }
          })
      }
    },
    handleFriendGroupShare() {
      this.closeSharePanel()
      // TODO: 是否有方法在微信中唤起ShareMenu
    },
    handleWeiboShare() {
      this.closeSharePanel()
      const share = this.getShareInfo()
      const shareText = this.$store.state.app.name + '--' + share.text
      const path =
        'https://service.weibo.com/share/share.php?url=' +
        encodeURIComponent(share.url) +
        '&title=' +
        encodeURIComponent(shareText) +
        '&appkey=' +
        process.env.VUE_APP_SHARE_WEIBO_APP_KEY +
        '&pic=' +
        encodeURIComponent(share.image_url) +
        '&searchPic=false'
      window.open(path)
    },
    handleQQShare() {
      this.closeSharePanel()
      const share = this.getShareInfo()
      console.log(share)
      const path =
        'https://connect.qq.com/widget/shareqq/index.html?' +
        'url=' +
        share.url +
        '&sharesource=qzone' +
        '&title=' +
        encodeURIComponent(share.title) +
        '&summary=' +
        share.text
      window.open(path)
    },
    // swipe feature
    handleTouchStart() {
      if (!this.$refs.actions) {
        return
      }
      let touch = event.changedTouches[0]
      this.initialX = touch.pageX
      this.initialY = touch.pageY
    },
    handleTouchMove() {
      if (!this.$refs.actions) {
        return
      }
      if (!this.initialX) {
        return
      }
      if (this.isSwiping) {
        event.stopPropagation()
        event.preventDefault()
      }
      const touch = event.changedTouches[0]
      const delta = touch.pageX - this.initialX
      const deltaY = touch.pageY - this.initialY
      this.swipeDelta = delta
      if (Math.abs(delta) > Math.max(Math.abs(deltaY, 10))) {
        this.isSwiping = true
      }
    },
    handleTouchEnd() {
      if (!this.$refs.actions) {
        return
      }
      // const { width } = this.$refs.actions.getBoundingClientRect();
      if (this.swipeDelta < -40) {
        this.showActions = true
      } else {
        this.showActions = false
      }
      this.isSwiping = false
      this.swipeDelta = 0
      this.initialX = undefined
    },
  },
}
</script>

<style lang="scss">
.JokeCardWrap {
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
  padding-bottom: 3px;
  &__main {
    transition: transform 300ms ease;
  }
  &__actions {
    position: absolute;
    top: 0;
    height: calc(100% - 3px); // shadow offset
    left: 100%;
    display: flex;
    z-index: 1;
    transition: transform 300ms ease;
  }
  &__action {
    position: relative;
    border: none;
    white-space: nowrap;
    padding-left: 20px;
    padding-right: 20px;
    background: var(--primary-color);
    font-size: 16px;

    &::after {
      content: '';
      width: 600%;
      height: 100%;
      top: 0;
      position: absolute;
      z-index: -1;
      background: inherit;
    }
  }
}
.JokeCard {
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  position: relative;
  &.hasArchived {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border: 8px solid var(--primary-color);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }
  }
  &__main {
    padding: 12px 16px;
  }
  &__footer {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
.ShareModal {
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  padding-top: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  &__title {
    font-size: 14px;
    text-align: center;
    margin-bottom: 8px;
  }

  &__content {
    padding-bottom: 8px;
  }

  &__cancel {
    height: 50px;
    text-align: center;
    border-top: 1px solid var(--border-color);
    font-size: 18px;
    line-height: 48px;
  }

  .ShareOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-left: 12px;
    padding-right: 12px;
  }
}
.ShareOptionBtn {
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: transparent;
  border: none;
  width: 66px;
  text-align: center;

  &__icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: white;
    display: block;
    margin: 0 auto;
    margin-bottom: 5px;
    fill: currentColor;

    &_link {
      background-color: #8d9cae;
    }
    &_wechat {
      background-color: var(--wechat-color);
    }
    &_weibo {
      background-color: var(--weibo-color);
    }
    &_qq {
      background-color: var(--qq-color);
    }
  }

  &__label {
    font-size: 12px;
  }
}
</style>
