<template>
  <nav
    class="mobileNav"
    :class="{ MapColorScheme: onMap, InitialNavColorScheme: !onMap }"
    ref="navbar"
  >
    <img src="@/assets/logo.svg" alt="GEO" class="logo" />
    <ul>
      <li class="list">
        <login-button />
      </li>
      <li
        class="pointer pathButton"
        :class="{ hidden: isHidden }"
        @click="pathListToggle"
        ref="pathToggle"
      >
        <font-awesome-icon icon="map" />
      </li>
      <li v-if="isAuth && user" class="list user space">
        <span class="userInfoMobile">
          <img
            :src="user.picture"
            alt="User's Profile Pic"
            width="50"
            class="userProfilePicM pointer"
            referrerpolicy="no-referrer"
          />
        </span>
        <div class="dropDownMenu pointer" ref="dropDown">
          <span
            @click="profile"
            :class="{ active: isProfileActive }"
            ref="profileOption"
          >
            <font-awesome-icon icon="user-astronaut" class="icon" />
            Profile</span
          >
          <span @click="map" :class="{ active: isMapActive }" ref="mapOption">
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
      showPathMenu: false,
      currRoute: this.$router.currentRoute,
      isHidden: null,
      onMap: null,
      isProfileActive: null,
      isMapActive: null,
    };
  },
  methods: {
    logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
      this.isProfileActive = false;
      this.isMapActive = false;
      this.$store.commit("updateToken", "");
    },
    profile() {
      this.$router.push("/profile");
      this.isProfileActive = true;
      this.isMapActive = false;
    },
    map() {
      this.$router.push("/map");
      this.isProfileActive = false;
      this.isMapActive = true;
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
  watch: {
    currRoute(path) {
      if (path.name != "map") {
        this.isHidden = true;
        this.onMap = false;
      } else {
        this.isHidden = false;
        this.onMap = true;
      }
    },
  },
};
</script>
<style lang="scss">
.MapColorScheme {
  background: linear-gradient(30deg, #f2efe9 50%, #bddab1 100%);
}
.InitialNavColorScheme {
  background: inherit;
}
.mobileNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  width: 100%;
  height: 4rem;
  z-index: 9999;
  .pointer {
    cursor: pointer;
  }
  .logo {
    width: 4.5rem;
  }

  .active {
    background: wheat;
    color: black;
  }
  .hidden {
    display: none;
  }
  ul {
    width: 10rem;
    display: flex;
    align-items: center;
    margin-inline-end: 1rem;
    list-style-type: none;
    justify-content: space-between;
    .userInfoMobile {
      position: relative;
      z-index: 1000;
      .userProfilePicM {
        border-radius: 5rem;
        margin-inline: 0.2rem;
        box-shadow: 0 0 5px grey;
      }
      &:hover {
        ~ .dropDownMenu {
          display: flex;
        }
      }
    }
    .dropDownMenu {
      position: absolute;
      background: white;
      display: none;
      flex-direction: column;
      min-width: 7rem;
      min-height: 5rem;
      top: 3.5rem;
      right: 2rem;
      border-radius: 1rem;
      z-index: 9999;
      &:hover,
      &:focus {
        display: flex;
      }
      span {
        padding: 0.5rem;
        &:hover,
        &:focus {
          background: wheat;
          color: black;
        }
      }
    }
    .pathButton {
      background: white;
      padding: 0.5rem;

      box-shadow: 0 0 5px grey;
      transform: scale(1.4);
      border-radius: 2rem;
      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
