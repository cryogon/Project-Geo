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
        if (this.token) {
          this.$store.commit("updateToken", this.token);
          this.$router.push("/map");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss">
$btn-size: 3.3rem;
.loginButton {
  margin-block-start: 1rem;
  width: $btn-size;
  height: $btn-size;
  background: transparent;
  letter-spacing: 1px;
  border: solid rgb(150, 150, 150);
  border-radius: 5rem;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  outline: 0;
  &:hover {
    box-shadow: inset $btn-size 0 0 0 #51e368;
    transform: scale(1.1);
    color: white;
  }
}
</style>
