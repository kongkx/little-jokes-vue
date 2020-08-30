<template>
  <div class="Terms">
    <PageHeader title="用户协议" backButton @back="goBack" />
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
export default {
  components: {
    PageHeader
  },
  methods: {
    goBack() {
      this.$root.goBack();
    }
  },
  mounted() {
    this.$store.commit("hideNav");
  },
  destroyed() {
    this.$store.commit("showNav");
  }
};
</script>
