<template>
  <div class="container">
    <nav-bar-mobile v-if="mobileMode" />
    <nav-bar v-else />
    <router-view />
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import NavBarMobile from "@/components/NavBarMobile.vue";
import { mapState } from "vuex";
export default {
  components: { NavBar, NavBarMobile },
  name: "MainComponents",
  data() {
    return {
      mobileMode: false,
      isAuth: this.$auth0.isAuthenticated,
    };
  },
  created() {
    this.$store.dispatch("loadToken");
    let screenSize = window.matchMedia("(max-width:35rem)");
    if (screenSize.matches) {
      this.mobileMode = true;
    } else this.mobileMode = false;
  },
  mounted() {
    if (!this.isAuth) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState["token"],
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
  overflow-y: hidden;
  button {
    cursor: pointer;
  }
  background: -moz-linear-gradient(
    $primaryBackgroundColor,
    $secondaryBackgroundColor
  );
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
  grid-template-columns: 4vw 80vw;
  width: 100vw;
  height: 100vh;
}
@media screen and (max-width: 35rem) {
  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
