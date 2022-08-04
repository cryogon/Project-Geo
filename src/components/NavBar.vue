<template>
  <nav>
    <ul>
      <li class="list">
        <h1 class="appName">LOGO</h1>
      </li>
      <li class="list">
        <login-button />
      </li>
      <li v-if="isAuth && user" class="list user space">
        <span class="userInfo">
          <img
            :src="user.picture"
            alt="User's Profile Pic"
            width="50"
            class="userProfilePic"
          />
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
      <li class="space pathMenu pointer" @click="pathListToggle">
        <font-awesome-icon icon="map" class="icon" />
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
      showPathMenu: false,
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
    pathListToggle() {
      this.showPathMenu = !this.showPathMenu;
      this.emitter.emit("pathList", this.showPathMenu);
      if (!this.showPathMenu) {
        this.$store.commit("setMarkerVisibility", false);
        this.$store.commit("setLocations", []);
      }
    },
  },
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
}
nav {
  ul {
    display: flex;
    flex-direction: column;
    height: 100vh;
    // justify-content: space-between;
    align-items: center;
    background: rgb(218, 160, 52);
    padding-inline: 30px;
    text-align: right;
    position: sticky;
    top: 0;
    z-index: 999;
    list-style-type: none;
    .space {
      margin-block: 1rem;
    }
    .user {
      position: relative;
    }
    .pathMenu {
      background: white;
      padding: 0.7rem 0.8rem;
      transform: scale(1.2);
      border-radius: 2rem;
      &:hover {
        background: rgb(209, 198, 198);
        &::after {
          content: "ShowPath";
          font-size: 10px;
          text-align: left;
          position: absolute;
          left: 3rem;
          width: 3rem;
          background: wheat;
        }
      }
    }
    .list {
      .userInfo {
        display: flex;
        justify-content: center;
        column-gap: 1rem;
        &:hover ~ .dropDownMenu,
        &:focus ~ .dropDownMenu {
          display: flex;
          flex-direction: column;
        }
        .userProfilePic {
          border-radius: 5rem;
          margin-inline: 0.2rem;
        }
      }

      .dropDownMenu {
        z-index: -1;
        display: none;
        position: absolute;
        background: white;
        top: 0rem;
        left: 3.5rem;
        padding-inline: 1em;
        text-align: center;
        transition: ease-out 0.5s;
        animation: slideout 0.2s linear;
        cursor: pointer;
        @keyframes slideout {
          from {
            left: 2rem;
          }
          to {
            left: 3.5rem;
          }
        }
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
          animation: slideout 0.2s linear;
          margin-inline-end: 0.1rem;
          @keyframes slideout {
            from {
              margin-inline-end: 0.4rem;
            }
            to {
              margin-inline-end: 0.1rem;
            }
          }
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
