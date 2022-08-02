<template>
  <nav>
    <ul>
      <li class="list">
        <h1 class="appName">Project Geo</h1>
      </li>
      <li class="list">
        <login-button />
      </li>
      <li v-if="isAuth && user" class="list user">
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
          <span @click="profile" ref="profileOption">
            <font-awesome-icon icon="user-astronaut" class="icon" />
            Profile</span
          >
          <span @click="map" ref="mapOption">
            <font-awesome-icon icon="map" class="icon" />
            Map</span
          >
          <span @click="logout" ref="logoutOption">
            <font-awesome-icon icon="right-to-bracket" class="icon" />
            Logout</span
          >
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
      this.$refs.profileOption.classList.remove("active");
      this.$refs.mapOption.classList.remove("active");
      localStorage.removeItem("apollo-token");
    },
    profile() {
      this.$router.push("/profile");
      this.$refs.profileOption.classList.add("active");
      this.$refs.mapOption.classList.remove("active");
    },
    map() {
      this.$router.push("/map");
      this.$refs.profileOption.classList.remove("active");
      this.$refs.mapOption.classList.add("active");
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
        .userProfilePic {
          border-radius: 5rem;
        }
        &:hover ~ .dropDownMenu,
        &:focus ~ .dropDownMenu {
          display: flex;
          flex-direction: column;
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
        &:hover,
        &:focus {
          display: flex;
          flex-direction: column;
        }
        span {
          padding: 0.5rem 0.6rem;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          &:hover,
          &:focus {
            background: wheat;
            color: black;
          }
        }
        .icon {
          margin-inline-end: 0.1rem;
        }
        .active {
          background: wheat;
          color: black;
        }
      }
    }
  }
  .appName {
    text-transform: uppercase;
    background: linear-gradient(45deg, #69c3ed, yellowgreen);
    background-clip: text;
    color: transparent;
  }
}
</style>
