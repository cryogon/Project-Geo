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
  background-color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #67e0a3;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #747b81;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
