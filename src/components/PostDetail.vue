<template>
  <div class="PostDetail">
    <div class="PostDetail__main">
      <JokeCard :data="data" />
      <div class="PostDetail__votes">
        <button :disabled="voting" class="VoteBtn" @click="vote(1)">
          <ThumbUpIcon />
          <span class="VoteBtn__label">顶</span>
        </button>
        <button :disabled="voting" class="VoteBtn" @click="vote(-1)">
          <ThumbDownIcon />
          <span class="VoteBtn__label">踩</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JokeCard from './JokeCard'
import ThumbUpIcon from './ThumbUpIcon'
import ThumbDownIcon from './ThumbDownIcon'
import { votePost } from '../api'

export default {
  name: 'PostDetail',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      voting: false,
    }
  },
  computed: mapGetters(['isLoggedIn']),
  components: {
    JokeCard,
    ThumbUpIcon,
    ThumbDownIcon,
  },
  methods: {
    vote(voteType) {
      if (!this.isLoggedIn) {
        this.$router.push({
          name: 'login',
          query: {
            next: this.$route.fullPath,
          },
        })
      } else {
        this.voting = true
        votePost(this.data.id, {
          vote_type: voteType,
        })
          .then(() => {
            this.$toasted.show('投票成功')
            this.voting = false
          })
          .catch(err => {
            this.$toasted.error(err.message)
            this.voting = false
          })
      }
    },
  },
}
</script>

<style lang="scss">
.PostDetail {
  background-color: white;
  height: 100%;
  padding-top: 40px;
  .JokeCard {
    box-shadow: none;
  }
  &__votes {
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VoteBtn {
    margin-left: 24px;
    margin-right: 24px;
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--background-color);
    .JokeCard {
      background-color: var(--background-color);
    }
  }
}
.VoteBtn {
  border: none;
  background-color: transparent;
  .icon {
    fill: currentColor;
  }
}
</style>
