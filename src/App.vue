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
      localStorage.removeItem("apollo-token");
      this.$store.commit("updateToken", "");
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("loadToken");
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@200&display=swap");
$primaryBackgroundColor: white;
$secondaryBackgroundColor: rgb(219, 198, 198);
* {
  font-family: "Inter", sans-serif;
  color: black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  button {
    cursor: pointer;
  }
  background: linear-gradient(
    $primaryBackgroundColor,
    $secondaryBackgroundColor
  );
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.container {
  display: grid;
  grid-template-columns: 4vw 96vw;
  width: 100%;
  height: 100%;
  .routerView {
    z-index: -1;
  }
}
</style>
