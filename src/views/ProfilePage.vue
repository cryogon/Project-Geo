<template>
  <div class="profilePage">
    <div class="basicInfo">
      <img :src="profilePic" alt="User's Profile Pic" class="picture" />
      <div class="info">
        <h2 class="name">{{ name }}</h2>
        <h3 class="email">{{ email }}</h3>
      </div>
    </div>
    <div class="optionBar">
      <h2 class="optionItem path">YOUR PATHS</h2>
    </div>
    <div class="pathContainer">
      <h3
        class="path"
        :class="{ a: index }"
        v-for="(value, index) in path"
        :key="index"
        @click="test"
      >
        {{ value.path_name }}
        <font-awesome-icon icon="pencil" />
      </h3>
    </div>
  </div>
</template>
<script>
import { GET_PATH } from "@/graphql";

export default {
  data() {
    return {
      name: this.$auth0.user.value.name,
      email: this.$auth0.user.value.email,
      profilePic: this.$auth0.user.value.picture,
      path: null,
    };
  },
  methods: {
    returnToMap() {
      this.$router.push("/map");
    },
    test(e) {
      console.log(e.target);
    },
  },
  async mounted() {
    const { data } = await this.$apollo.query({
      query: GET_PATH,
    });
    this.path = data.paths;
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
.optionBar {
  text-align: center;
  padding-block-start: 1rem;
  .optionItem {
    font-weight: bolder;
  }
}
.pathContainer {
  h3 {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
}
</style>
