<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button v-if="visible" @click.prevent="doLogout">Logout</button>
  </nav>
  <router-view />
</template>
<script>
import { mapState } from "vuex";
// import { mapState } from "vuex";
export default {
  name: "MainComponents",
  created() {
    this.$store.dispatch("loadToken");
  },
  methods: {
    doLogout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapState(["visible"]),
  },
};
</script>
<style lang="scss">
body {
  // background-color: #67e0a3;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #747b81;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
//
</style>
