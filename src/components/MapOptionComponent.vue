<template>
  <div class="options">
    <div class="listOfPaths" v-cloak>
      <ol>
        <li
          v-for="path in paths"
          :key="path.name"
          class="path"
          @click="setPath(path)"
        >
          {{ path.path_name }}
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import { GET_PATH, INSERT_PATH } from "@/graphql";
import { mapState } from "vuex";
export default {
  apollo: {
    paths: {
      query: GET_PATH,
    },
  },

  data() {
    return {
      pathName: "",
      pathSelected: false,
      distance: null,
      zoom: null,
    };
  },
  methods: {
    setPath({ path }) {
      this.$store.commit("setLocations", path.latLng);
      this.emitter.emit("pathSelected", path);
      this.$store.commit("setMarkerVisibility", true);
      this.pathSelected = true;
    },
    setCreateModeTrue() {
      this.$store.commit("setCreateMode", true);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
    async createPolyline() {
      try {
        this.$store.commit("setMarkerVisibility", false);
        if (this.locations.length > 1) {
          await this.$apollo.mutate({
            mutation: INSERT_PATH,
            variables: {
              name: this.pathName,
              path: { latLng: this.locations },
            },
          });
          this.pathName = "";
          this.$store.commit("setCreateMode", false);
          this.$store.commit("setLocations", []);
          this.$apollo.queries.paths.refetch();
        } else {
          alert(
            "Please select path on the map first before hitting create button"
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.pathName = "";
      this.$store.commit("setCreateMode", false);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
  },
  beforeMount() {
    this.$apollo.queries.paths.refetch();
  },
  created() {
    this.emitter.on("createMode", () => {
      this.setCreateModeTrue();
    });
    this.emitter.on("cancelPath", () => {
      this.cancel();
    });
    this.emitter.on("createPath", (name) => {
      this.pathName = name;
      this.createPolyline();
    });
  },
  computed: {
    ...mapState(["locations", "onCreateMode"]),
  },
};
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
.options {
  position: absolute;
  z-index: 999;
  width: 15vw;
  height: inherit;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
  left: 0;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-track {
    background: darkgray;
    border-radius: 2rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 2rem;
  }

  #createPath {
    margin-inline-start: 2rem;
    background: linear-gradient(125deg, hotpink, rgb(42, 175, 216));
    background: -moz-linear-gradient(125deg, hotpink, rgb(42, 175, 216));
    background-clip: text;
    color: transparent;
    border-radius: 2rem;
    padding: 0.3rem;
    &:hover {
      box-shadow: 0px 0px 0.5rem #000;
    }
  }
  .path {
    word-wrap: break-word;
    list-style-position: inside;
    transition: 0.2s;
    margin-block: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    &:hover {
      background-color: #c2c0c0;
    }
    &::marker {
      color: hotpink;
    }
  }
}
@media screen and (max-width: 35rem) {
  .options {
    width: 10rem;
    height: 20rem;
    border-radius: 1rem;
    left: 12rem;
  }
}
</style>
