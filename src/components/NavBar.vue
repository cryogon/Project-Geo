<template>
  <nav>
    <ul>
      <li class="list">
        <h1 class="appName">Project Geo</h1>
      </li>
      <li v-if="!isAuth" class="list">
        <login-button />
      </li>
      <li v-if="isAuth" class="list user">
        <span class="userInfo">
          <img
            :src="user.picture"
            alt="User's Profile Pic"
            width="50"
            class="userProfilePic"
          />
          <h5 class="name">{{ user.name }}</h5>
        </span>
        <div class="dropDownMenu">
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
    height: 4rem;
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
        .userProfilePic {
          border-radius: 5rem;
        }
        &:hover ~ .dropDownMenu {
          display: block;
        }
      }
      .dropDownMenu {
        position: absolute;
        display: none;
        background: white;
        right: 0;
        padding-inline: 1em;
        cursor: pointer;
        text-align: center;
        &:hover {
          display: block;
        }
        .profileOption,
        .logoutOption {
          padding: 0.5rem 1rem;
          border-radius: 10px;
          &:hover {
            background: wheat;
          }
        }
      }
    }
  }
  .appName {
    text-transform: uppercase;
  }
}
</style>
