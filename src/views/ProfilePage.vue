<template>
  <div class="profilePage">
    <div class="basicInfo">
      <img :src="profilePic" alt="User's Profile Pic" class="picture" />
      <div class="info">
        <h2 class="name">{{ name }}</h2>
        <h3 class="email">{{ email }}</h3>
      </div>
    </div>
    <div class="popup" v-if="onEditMode">
      <font-awesome-icon icon="x" @click="onEditMode = false" />
      <input type="text" v-model="newPath" />
      <button @click="updatePathName">Update</button>
    </div>
    <div class="optionBar">
      <h2 class="optionItem path">YOUR PATHS</h2>
    </div>
    <div class="pathContainer" ref="pathDiv">
      <h3 class="path" v-for="(value, index) in paths" :key="index" ref="items">
        {{ value.path_name }}
        <font-awesome-icon icon="pencil" @click="showPopup(index)" />
      </h3>
    </div>
  </div>
</template>
<script>
import { GET_PATH, UPDATE_PATH } from "@/graphql";

export default {
  apollo: {
    paths: {
      query: GET_PATH,
      fetchPolicy: "network-only",
    },
  },
  data() {
    return {
      name: this.$auth0.user.value.name,
      email: this.$auth0.user.value.email,
      profilePic: this.$auth0.user.value.picture,
      newPath: "",
      oldPath: "",
      onEditMode: false,
    };
  },
  methods: {
    returnToMap() {
      this.$router.push("/map");
    },
    showPopup(i) {
      this.oldPath = this.$refs.items[i].innerText;
      this.newPath = this.oldPath;
      this.onEditMode = true;
    },
    async updatePathName() {
      try {
        if (this.newPath.length > 0) {
          await this.$apollo.mutate({
            mutation: UPDATE_PATH,
            variables: {
              oldName: this.oldPath,
              newName: this.newPath,
            },
          });
          this.$apollo.queries.paths.refetch();
          this.onEditMode = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style lang="scss">
.profilePage {
  position: relative;
  .basicInfo {
    display: grid;
    place-items: center right;
    margin-block-start: 5rem;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    .popus {
      height: 30rem;
      width: 30rem;
      position: absolute;
      box-shadow: -5px 5px 10px grey;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
    overflow-y: auto;
    height: 23em;
    h3 {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
  }
}
</style>
