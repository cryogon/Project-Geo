<template>
  <button v-if="!isAuth && !isLoading" @click="login" class="loginButton">
    Login
  </button>
</template>
<script>
export default {
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
$btn-width: 6rem;
.loginButton {
  width: $btn-width;
  height: 3rem;
  background: transparent;
  border-style: solid;
  border-radius: 1rem;
  transition: ease-out 0.3s;
  outline: none;
  perspective: 10px;

  &:hover {
    box-shadow: inset $btn-width 0 0 0 red;
  }
}
</style>
