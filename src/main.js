import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import { apolloProvider } from "./vue-apollo";
import { createAuth0 } from "@auth0/auth0-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import mitt from "mitt";
import {
  faUser,
  faUserAstronaut,
  faRightToBracket,
  faMap,
  faPencil,
  faX,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId as client_id, audience } from "../auth_config.json";
library.add(
  faUser,
  faRightToBracket,
  faUserAstronaut,
  faMap,
  faPencil,
  faX,
  faLocationArrow
);
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app
  .use(store)
  .use(router)
  .use(apolloProvider)
  .use(
    createAuth0({
      domain,
      client_id,
      redirect_uri: window.location.origin,
      audience,
      // cacheLocation: "localstorage",
    })
  )
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
