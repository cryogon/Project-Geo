<template>
  <div class="container">
    <nav-bar />
    <router-view />
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  name: "MainComponents",
  created() {
    if (!this.$auth0.isAuthenticated) {
      return localStorage.removeItem("apollo-token");
    }
    this.$store.dispatch("loadToken");
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@200&display=swap");
* {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #fff;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.container {
  width: 100%;
  height: 100%;
  .routerView {
    z-index: -1;
  }
}
</style>
