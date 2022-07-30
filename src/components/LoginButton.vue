<template>
  <button v-if="!isAuth && !isLoading" @click="login" class="loginButton">
    Login
  </button>
</template>
<script>
export default {
  emits: ["login"],
  data() {
    return {
      isAuth: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      token: null,
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth0.loginWithPopup();
        await this.$nextTick();
        this.$emit("login");
        this.token = await this.$auth0.getAccessTokenSilently();
        this.token && this.$store.commit("updateToken", this.token);
        this.token && this.$router.push("/map");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss">
.loginButton {
  width: 8rem;
  height: 3rem;
  background: transparent;
  border-style: solid;
  border-radius: 2rem;
  &:hover {
    background: linear-gradient(rgb(172, 172, 46), yellow);
    box-shadow: 4px 4px 20px rgb(172, 172, 46);
  }
}
</style>
