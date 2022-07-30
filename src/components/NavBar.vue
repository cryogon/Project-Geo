<template>
  <nav>
    <ul>
      <li class="list">
        <h1 class="appName">Project Geo</h1>
      </li>
      <li v-if="!isAuth" class="list">
        <login-button />
      </li>
      <li v-if="isAuth" class="list user" @load="profile">
        <span @click="showDropDown" class="userInfo">
          <img
            :src="user.picture"
            alt="User's Profile Pic"
            width="50"
            class="userProfilePic"
          />
          <h5 class="name">{{ user.name }}</h5>
        </span>
        <div class="dropDownMenu hidden">
          <h4 @click="profile" class="profileOption">Profile</h4>
          <h4 @click="logout" class="logoutOption">Logout</h4>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import LoginButton from "@/components/LoginButton.vue";
export default {
  components: {
    LoginButton,
  },
  data() {
    return {
      user: this.$auth0.user || null,
      isAuth: this.$auth0.isAuthenticated,
    };
  },
  methods: {
    logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
      localStorage.removeItem("apollo-token");
    },
    showDropDown() {
      document.querySelector(".dropDownMenu").classList.toggle("hidden");
    },
    profile() {
      this.$router.push("/profile");
    },
  },
};
</script>
<style lang="scss">
nav {
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding-inline: 30px;
    text-align: right;
    position: sticky;
    top: 0;
    z-index: 999;
    list-style-type: none;
    .user {
      position: relative;
    }
    .list {
      .userInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;
      }
      .userProfilePic {
        border-radius: 5rem;
      }
      .hidden {
        display: none;
      }
      .dropDownMenu {
        position: absolute;
        right: 0;
        padding-inline: 1em;
        cursor: pointer;
        text-align: center;
        background: white;
      }
    }
  }
  .appName {
    text-transform: uppercase;
  }
}
</style>
