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
    };
  },
  methods: {
    calculateDistance(p1, p2) {
      const R = 6371e3;
      const φ1 = (p1[0] * Math.PI) / 180; // φ, λ in radians
      const φ2 = (p2[0] * Math.PI) / 180;
      const Δφ = ((p2[0] - p1[0]) * Math.PI) / 180;
      const Δλ = ((p2[1] - p1[1]) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c;
      return d / 1000;
    },
    setPath({ path }) {
      let distance = this.calculateDistance(
        path.latLng[0],
        path.latLng[path.latLng.length - 1]
      );

      this.$store.commit("setLocations", path.latLng);
      this.$store.commit("setMapCenter", path.latLng[0]);
      this.$store.commit("setMarkerVisibility", true);
      setTimeout(() => {
        if (distance < 20) {
          this.$store.commit("setZoom", 16);
        } else if (distance > 20 && distance < 30) {
          this.$store.commit("setZoom", 10);
        } else if (distance > 30 && distance < 100) {
          this.$store.commit("setZoom", 8);
        } else if (distance > 100 && distance < 400) {
          this.$store.commit("setZoom", 6);
        } else {
          this.$store.commit("setZoom", 3);
        }
      }, 300);
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
    right: 2rem;
  }
}
</style>
