<template>
  <div style="padding-top: 12px; height: 100%;">
    <mescroll-vue
      v-if="hasContent"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <JokeCard
        v-for="(item, index) in filtered"
        :key="item.id"
        :data="item"
        :index="index"
        :swipeActions="swipeActions(item)"
      />
    </mescroll-vue>
    <div class="well well_hint" v-else>{{ noContentHint || '无相关内容' }}</div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import JokeCard from './JokeCard'
import { deletePost } from '../api'

export default {
  name: 'post-list',
  components: {
    JokeCard,
    MescrollVue,
  },
  props: {
    fetchData: {
      type: Function,
    },
    noContentHint: {
      type: String,
    },
  },
  data: function() {
    return {
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback,
      },
      data: [],
      hasContent: true,
    }
  },
  computed: {
    filtered: vm => vm.data.filter(item => !item.is_deleted),
  },
  methods: {
    swipeActions() {
      // TODO: cache item.
      return [
        {
          key: 'edit',
          label: '编辑',
          callback: this.editItem,
        },
        {
          key: 'delete',
          label: '删除',
          modifier: 'danger',
          callback: this.deleteItem,
        },
      ]
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      this.fetchData({
        page: page.num,
        page_size: page.size,
      })
        .then(res => {
          // 请求的列表数据
          let arr = res.data
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.data = []
          // 把请求到的数据添加到列表
          this.data = this.data.concat(arr)
          this.hasContent = res.meta.total > 0
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endBySize(arr.length, res.meta.total)
          })
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    editItem(item) {
      this.$router.push({
        name: 'post-edit',
        params: {
          id: item.id,
        },
      })
      console.log(item)
    },
    deleteItem(item) {
      // var vm = this
      return deletePost(item.id)
        .then(() => {
          item.is_deleted = true
          this.data = [...this.data]
        })
        .catch(err => {
          alert(err.message)
        })
    },
  },
}
</script>
