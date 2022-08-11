<template>
  <div class="profilePage">
    <div class="basicInfo">
      <img :src="profilePic" alt="User's Profile Pic" class="picture" />
      <div class="info">
        <h2 class="name">{{ name }}</h2>
        <h3 class="email">{{ email }}</h3>
      </div>
      <button @click="deleteUser" class="deleteUser">Delete</button>
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
import {
  DELETE_PATH,
  GET_PATH,
  UPDATE_PATH,
  DELETE_USER,
  DELETE_ALL_PATH,
} from "@/graphql";

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
      id: this.$auth0.user.value.sub,
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
      let cnfrm = confirm("Are you sure?");
      if (cnfrm) {
        this.$apollo.mutate({
          mutation: DELETE_PATH,
          variables: {
            path: tempName,
          },
        });
        this.$apollo.queries.paths.refetch();
      }
    },
    deleteUser() {
      let cnfrm = confirm(
        " Are You Sure? You Want to Delete your Account.\n \n All of your Paths will be removed and cannot be restored"
      );
      if (cnfrm) {
        let prmpt = prompt(`Write "CONFIRM" to delete your account`);
        if (prmpt === "CONFIRM") {
          this.$apollo.mutate({
            mutation: DELETE_ALL_PATH,
            variables: {
              id: this.id,
            },
          });
          this.$nextTick(() => {
            this.$apollo.mutate({
              mutation: DELETE_USER,
              variables: {
                id: this.id,
              },
            });
          });
          this.$nextTick(() => {
            localStorage.setItem("apollo-token", "");
            this.$auth0.logout();
          });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.profilePage {
  position: relative;
  z-index: 0;
  margin-inline-start: 2rem;
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
    grid-template-columns: 1fr 1fr 10rem;
    .picture {
      width: 8rem;
      margin-inline-end: 2rem;
      border-radius: 50%;
      grid-row: 1 / span 2;
      box-shadow: 0 0 10px grey;
    }
    .info {
      justify-self: start;
      grid-row: 1 / span 2;
    }
    .deleteUser {
      color: white;
      font-size: 14px;
      background: #d03c38;
      outline: none;
      height: 3rem;
      width: 5rem;
      margin-inline-end: 5rem;
      border-radius: 1rem;
      grid-row: 1 / span 2;
      font-weight: 600;
      border: none;
      &:hover {
        background: rgb(196, 44, 44);
      }
    }
  }
  .optionBar {
    text-align: center;
    padding-block-start: 1rem;
    margin-block-start: 1.7rem;

    .optionItem {
      font-weight: 900;
    }
  }
  .pathContainer {
    overflow-y: auto;
    height: 23em;
    &::-webkit-scrollbar {
      width: 0.8rem;
    }
    &::-webkit-scrollbar-track {
      border-radius: 2rem;
      background: repeating-linear-gradient(rgba(0, 0, 0, 0.207), grey);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(63, 55, 55, 0.221);
      outline: 1px solid slategrey;
      border-radius: 2rem;
      height: 1rem;
    }

    h3 {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
    .pathOption {
      padding-inline: 1rem;
      .icon {
        padding: 0.3rem 0.5rem;
        border-radius: 2rem;
        transition: 0.2s;
        margin-inline: 0.3rem;
        &:hover {
          background: rgb(165, 162, 162);
        }
      }
    }
  }
}
</style>
