<template>
  <div class="profilePage">
    <div class="basicInfo">
      <img :src="profilePic" alt="User's Profile Pic" class="picture" />
      <div class="info">
        <h2 class="name">{{ name }}</h2>
        <h3 class="email">{{ email }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: this.$auth0.user.value.name,
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
.basicInfo {
  display: grid;
  place-items: center right;
  margin-block-start: 5rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  .picture {
    width: 8rem;
    margin-inline-end: 2rem;
    border-radius: 50%;
    grid-row: 1 / span 2;
  }
  .info {
    justify-self: start;
    grid-row: 1 / span 2;
  }
}
</style>
