<template>
  <div class="profilePage">
    <img :src="profilePic" alt="User's Profile Pic" class="picture" />
    <h2 class="name">Name: {{ name || "Username Not found" }}</h2>
    <h3 class="email">Email: {{ email }}</h3>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth0.user?.value.name,
      email: this.$auth0.user.value.email,
      profilePic: this.$auth0.user.value.picture,
    };
  },
  methods: {
    returnToMap() {
      this.$router.push("/map");
    },
  },
};
</script>
<style lang="scss">
.profilePage {
  display: grid;
  place-items: start start;
  margin-block-start: 5rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 35rem 1fr;
  .picture {
    border-radius: 50%;
    grid-row: 1 / span 2;
  }
}
</style>
