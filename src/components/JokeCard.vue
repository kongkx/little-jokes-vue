<template>
  <div class="JokeCard">
    <div class="JokeCard__main">
      一留学时认识的纽约朋友，在纽约待够了非要到北京玩，一日在商场参与抽奖，看到三等奖LV包包，二等奖笔记本一部，一等奖是神秘大奖，那一个眼红啊，还tm走了运的抽了一等奖，一看奖品，纽约七日游……
    </div>
    <div class="JokeCard__footer">
      <button class="ActionButton">
        <DotsIcon />
      </button>
      <button class="ActionButton">
        <ShareIcon />
      </button>
      <button class="ActionButton">
        <LikeIcon liked />
      </button>
    </div>
  </div>
</template>

<script>
import LikeIcon from "./LikeIcon";
import DotsIcon from "./DotsIcon";
import ShareIcon from "./ShareIcon";

export default {
  name: "JokeCard",
  components: {
    LikeIcon,
    DotsIcon,
    ShareIcon
  }
};
</script>

<style lang="scss">
.JokeCard {
  background-color: white;
  margin-bottom: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
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
</style>
