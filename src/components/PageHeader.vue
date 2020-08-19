<template>
  <header class="PageHeader">
    <span class="PageTitle">{{ title }}</span>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title"]
};
</script>

<style lang="scss">
.PageHeader {
  background-color: var(--primary-color);
  height: 40px; // TODO: pwa heading color
  display: flex;
  justify-content: center;

  .PageTitle {
    margin-top: auto;
    margin-bottom: 5px;
  }
}
.PageTitle {
  font-weight: bold;
  font-size: 18px;
}
</style>
