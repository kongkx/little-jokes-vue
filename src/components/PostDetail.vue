<template>
  <div class="PostDetail">
    <div class="PostDetail__main">
      <JokeCard :data="data" />
    </div>
  </div>
</template>

<script>
import JokeCard from "./JokeCard";
export default {
  name: "PostDetail",
  props: {
    data: {
      type: Object
    }
  },
  components: {
    JokeCard
  }
};
</script>

<style lang="scss">
.PostDetail {
  background-color: white;
  height: 100%;
  padding-top: 40px;
  .JokeCard {
    box-shadow: none;
  }
}
</style>
