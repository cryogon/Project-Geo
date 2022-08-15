import { createStore } from "vuex";
export default createStore({
  state: {
    token: "",
    currUser: "",
    onCreateMode: false,
    mapCenter: [],
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
    setMapCenter(state, val) {
      state.mapCenter = val;
    },
    setMarkerVisibility(state, value) {
      state.isPathMarkerVisible = value;
    },
  },
  actions: {
    loadToken(context) {
      const newToken = localStorage.getItem("apollo-token");
      newToken && context.commit("updateToken", newToken);
    },
  },
  modules: {},
});
