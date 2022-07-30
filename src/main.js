import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import { apolloProvider } from "./vue-apollo";
import { createAuth0 } from "@auth0/auth0-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(apolloProvider)
  .use(
    createAuth0({
      domain: "project-geo.us.auth0.com",
      client_id: "XzpFDog1u2Ld7D8oWOj6ORfQT76139wF",
      redirect_uri: window.location.origin,
      audience: "https://tidy-seasnail-24.hasura.app/v1/graphql",
      useRefreshTokens: true,
    })
  )
  .mount("#app");
