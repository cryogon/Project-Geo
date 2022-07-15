import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    token: "",
    visible: false,
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
      context.commit(
        "updateToken",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpobEFocWQ5eXZHbWVldzRHWXVSViJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYyYzkxZjZiZjJjNzM1NzEzYWVlZTUwOCJ9LCJpc3MiOiJodHRwczovL2NhdGVycGlsbGVyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MmM5MWY2YmYyYzczNTcxM2FlZWU1MDgiLCJhdWQiOlsiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4iLCJodHRwczovL2NhdGVycGlsbGVyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTc2MjI4MTgsImV4cCI6MTY1NzYzMDAxOCwiYXpwIjoiOXoxZkNLWW9EY2dqTzN6SVA4RG5xdm9OQ0w4VEtIQ0kiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCJ9.xw61atHPlzQw33UhOqec6JBYplX9GERb9OlFP7zELhgMK1YEEd_EsF5rCHzUlYUzNGODrFxsgtSopJRF6EGa8vqK2GlDAWzkjZ_ONN1WzBoxZYOUchOHAkYri59yArB-Fr1oZJVO70pNfwvF9Wmvg24w-DxjdNTVi2PF-uFJP5qLjqFMlsAFST6xpB_tfxIm_d0yNftjv4d-HyJ-r0ku57RPxkYreMaS5ZJ6u5qaWL1fqloIWW7OBXyN4VVl94bhmy3Nisap_PFueFoztfKN7kigZMRloQB3JhOM5MzrQLjtwRBLOHwjtTXE5K7ndplpKMqwUs4ZhBow8jBlFEcIWQ"
      );
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
