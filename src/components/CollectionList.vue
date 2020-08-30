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
        v-for="(item, index) in data"
        :key="item.id"
        :data="item"
        :index="index"
        :swipeActions="swipeActions(item)"
      />
    </mescroll-vue>
    <div class="well well_hint" v-else>{{ noContentHint || "无相关内容" }}</div>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import JokeCard from "./JokeCard";
import { archiveLike, unarchiveLike } from "../api";

export default {
  name: "collection-list",
  components: {
    JokeCard,
    MescrollVue
  },
  props: {
    fetchData: {
      type: Function
    },
    noContentHint: {
      type: String
    }
  },
  data: function() {
    return {
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback
      },
      data: [],
      hasContent: true
    };
  },
  methods: {
    swipeActions(item) {
      if (!item.like) {
        return undefined;
      }
      if (item.like.archived_at) {
        return [
          {
            key: "unarchive",
            label: "取消归档",
            modifier: "default",
            callback: this.unarchiveItem
          }
        ];
      } else {
        return [
          {
            key: "archive",
            label: "归档",
            modifier: "default",
            callback: this.archiveItem
          }
        ];
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      this.fetchData({
        page: page.num,
        page_size: page.size
      })
        .then(res => {
          // 请求的列表数据
          let arr = res.data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.data = [];
          // 把请求到的数据添加到列表
          this.data = this.data.concat(arr);
          this.hasContent = res.meta.total > 0;
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endBySize(arr.length, res.meta.total);
          });
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    archiveItem(item) {
      return archiveLike(item.like.id).then(res => {
        item.like = res.data;
      });
    },
    unarchiveItem(item) {
      return unarchiveLike(item.like.id)
        .then(res => {
          item.like = res.data;
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>
