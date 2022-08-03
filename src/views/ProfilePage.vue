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
      <h2 class="popUpTitle">Update Path</h2>
      <font-awesome-icon icon="x" class="icon x" @click="onEditMode = false" />
      <input type="text" v-model="newPath" />
      <button @click="updatePathName">Update</button>
    </div>

    <div class="optionBar">
      <h2 class="optionItem path">YOUR PATHS</h2>
    </div>
    <div class="pathContainer" ref="pathDiv">
      <h3 class="path" v-for="(value, index) in paths" :key="index" ref="items">
        {{ value.path_name }}
        <div class="pathOption">
          <font-awesome-icon
            class="icon"
            icon="pencil"
            @click="showPopup(index)"
          />
          <font-awesome-icon class="icon" icon="x" @click="deletePath(index)" />
        </div>
      </h3>
    </div>
  </div>
</template>
<script>
import { DELETE_PATH, GET_PATH, UPDATE_PATH } from "@/graphql";

export default {
  apollo: {
    paths: {
      query: GET_PATH,
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
    deletePath(i) {
      let tempName = this.$refs.items[i].innerText;
      let conf = confirm("Are you sure?");
      if (conf) {
        this.$apollo.mutate({
          mutation: DELETE_PATH,
          variables: {
            path: tempName,
          },
        });
        this.$apollo.queries.paths.refetch();
      }
    },
  },
};
</script>
<style lang="scss">
.profilePage {
  position: relative;
  z-index: 0;
  .popup {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 80% 20%;
    place-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(30deg, white, rgb(194, 219, 101));
    height: 10rem;
    width: 20rem;
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(50px);
    .popUpTitle {
      margin-left: 1rem;
      justify-self: left;
    }
    .x {
      width: 1rem;
      padding: 0.5rem 0.6rem;
      justify-self: right;
      margin-inline-end: 1rem;
      background: white;
      border-radius: 5rem;
      transition: ease-out 0.3s;
      &:hover {
        box-shadow: inset 1rem 1rem 0 0 rgb(142, 146, 145);
        color: white;
      }
    }
    input {
      grid-column: 1 / span 2;
      height: 3rem;
      width: 90%;
      border: none;
      outline: none;
      border-block-end: 2px solid black;
      border-inline-start: 2px solid black;
      padding-inline-start: 0.5rem;
      background: transparent;
    }
    button {
      grid-column: 1 / span 2;
      outline: none;
      height: 2.6rem;
      width: 6rem;
      background: transparent;
      transition: ease-out 0.3s;
      font-weight: 900;
      border-radius: 2rem;
      &:hover {
        box-shadow: inset 6rem 0 0 0 rebeccapurple;
        color: white;
      }
    }
  }

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
    overflow-y: auto;
    height: 23em;
    h3 {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
    .pathOption {
      padding-inline: 1rem;
      .icon {
        margin-inline: 1rem;
      }
    }
  }
}
</style>
