import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    token: "",
    visible: false,
    currUser: "",
  },
  getters: {
    storeToken(state) {
      return state.token;
    },
  },
  mutations: {
    updateToken(state, val) {
      state.token = val;
      localStorage.setItem("loginToken", state.token);
    },
    updateVisible(state, val) {
      state.visible = val;
    },
  },
  actions: {
    login(context) {
      context.commit("updateToken", localStorage.getItem("token"));
      console.log(this.state.currUser);
      router.push("/map");
      context.commit("updateVisible", true);
    },
    logout(context) {
      context.commit("updateToken", "");
      router.push("/");
      context.commit("updateVisible", false);
    },
    loadToken(context) {
      const newToken = localStorage.getItem("loginToken");
      newToken && context.commit("updateVisible", true);
      newToken && context.commit("updateToken", newToken);
    },
  },
  modules: {},
});
