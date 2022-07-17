<template>
  <div class="container">
    <nav>
      <h1 class="appName">Project Geo</h1>
      <div class="userDetails">
        <span id="username">{{ username }}</span>
        <button v-if="visible" @click.prevent="doLogout" class="logout">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MainComponents",
  data() {
    return {
      username: localStorage.getItem("token"),
    };
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
  overflow-x: hidden;
}
.container {
  width: 100%;
  height: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 30px;
    text-align: right;
    .appName {
      text-transform: uppercase;
    }
    .userDetails {
      #username {
        margin-inline: 1rem;
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
  }
}
</style>
