<template>
  <LoginForm />
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  methods: {
    doLogin() {
      this.$store.dispatch("login");
    },
  },
  components: {
    LoginForm,
  },
};
</script>
<style lang="scss">
input {
  // display: block;
  margin: 0.2rem;
}
</style>
