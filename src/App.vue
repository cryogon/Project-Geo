<template>
  <div class="container">
    <nav>
      <h1 class="appName">Project Geo</h1>
      <h2>{{ hello }}</h2>
      <button v-if="visible" @click.prevent="doLogout" class="logout">
        Logout
      </button>
    </nav>
    <main class="mainView">
      <router-view />
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import gql from "graphql-tag";

export default {
  name: "MainComponents",
  apollo: {
    hello: gql`
      query {
        todos {
          id
          title
        }
      }
    `,
  },
  data() {
    "";
  },
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@200&display=swap");
body {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container {
  display: grid;
  grid-template-columns: 1vw 99vw;
  grid-template-rows: 7vh 93vh;
  width: 100%;
  height: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 1/3;
    padding: 30px;
    text-align: right;
    .appName {
      text-transform: uppercase;
    }
    .logout {
      height: 2vw;
      width: 3vw;
      font-size: 1em;
      border: solid 1px;
      background-color: transparent;
      transition: 0.2s;
      border-image: linear-gradient(to bottom left, hotpink, rebeccapurple);
      border-image-slice: 10;
      &:hover {
        box-shadow: 0 0 20px greenyellow;
      }
    }
  }
  .mainView {
    grid-column: 2 / span 3;
    width: 100%;
    height: 100%;
  }
}
</style>
