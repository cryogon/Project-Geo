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
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpobEFocWQ5eXZHbWVldzRHWXVSViJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYyYzkxZjZiZjJjNzM1NzEzYWVlZTUwOCJ9LCJpc3MiOiJodHRwczovL2NhdGVycGlsbGVyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MmM5MWY2YmYyYzczNTcxM2FlZWU1MDgiLCJhdWQiOlsiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4iLCJodHRwczovL2NhdGVycGlsbGVyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTc2MDc2NzAsImV4cCI6MTY1NzYxNDg3MCwiYXpwIjoiOXoxZkNLWW9EY2dqTzN6SVA4RG5xdm9OQ0w4VEtIQ0kiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCJ9.r_Bx-NCsvKxFbj-qZsQmVNMlxmckMya27b8YPhC9boJ1LQWsyVTkpGwGeNlLJhkHVF4ANEJu1eb64TnyObCyjlOBw8QJcvV6QMCjydo8fxIH-JnraSMMSrjp0aJ4j6FHzSaMADCooLHtebhpz6z-bNWaOq0GPT1jCqtbeSbDG7_I_cfYzZuvIgHkII66nmDskwYBOWxVubhjTNviQiqjq-CemQNc0F4Z0cKHSKzrc7QnGXk5dBFkGpcIbdcuR5hxgqlkVMGx8rLkZYIJBN-6BwJ61RU6bxqLRqaqdwnurPdQvakfqYT4CU36aJujj8UWtgoKx6nF-JQ9XhTP35gI-w"
      );
      router.push("/about");
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
