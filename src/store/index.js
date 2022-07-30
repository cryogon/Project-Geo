import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    token: "",
    currUser: "",
    onCreateMode: false,
    pathLocation: [],
    locations: [],
    isPathMarkerVisible: false,
    mapZoom: 12,
  },
  getters: {
    storeToken(state) {
      return state.token;
    },
  },
  mutations: {
    updateToken(state, val) {
      state.token = val;
      localStorage.setItem("apollo-token", state.token);
    },
    setZoom(state, zoomLevel) {
      state.mapZoom = zoomLevel;
    },
    setCreateMode(state, val) {
      state.onCreateMode = val;
    },
    setLocations(state, val) {
      state.locations = val;
    },
    setPathLoc(state, val) {
      state.pathLocation = val;
    },
    setMarkerVisibility(state, value) {
      state.isPathMarkerVisible = value;
    },
  },
  actions: {
    login() {
      router.push("/map");
    },
    logout(context) {
      context.commit("updateToken", "");
      router.push("/");
    },
    loadToken(context) {
      const newToken = localStorage.getItem("apollo-token");
      newToken && context.commit("updateToken", newToken);
    },
  },
  modules: {},
});
