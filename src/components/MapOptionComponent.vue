<template>
  <div class="options">
    <button @click="setCreateModeTrue" v-if="!onCreateMode">createPath</button>
    <div class="pathInputBox">
      <input v-if="onCreateMode" type="text" v-model="pathName" />
      <button v-if="onCreateMode" @click="createPolyline">Create</button>
      <button v-if="onCreateMode" @click="cancel">Cancel</button>
    </div>

    <div class="listOfPaths">
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
import { GET_PATH, INSERT_PATH, SUBSCRIBE_PATH } from "@/graphql";
import { mapState } from "vuex";
import mitt from "mitt";
const emitter = mitt();
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
    setPath(path) {
      this.$store.commit("setLocations", path.path.latLng);
      this.$store.commit("setPathLoc", path.path.latLng[1]);
      this.$store.commit("setMarkerVisibility", true);
      this.zoom = 17;
    },
    setCreateModeTrue() {
      this.$store.commit("setCreateMode", true);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
    async createPolyline() {
      try {
        //Code
        this.$store.commit("setMarkerVisibility", false);
        if (this.locations.length > 1) {
          let data = await this.$apollo.mutate({
            mutation: INSERT_PATH,
            variables: {
              name: this.pathName,
              path: { latLng: this.locations },
            },
          });
          console.log(data);
          this.$apollo.queries.paths.subscribeToMore({
            document: SUBSCRIBE_PATH,
          });
          //Reset Inputs
          this.pathName = "";
          this.$store.commit("setCreateMode", false);
          this.$store.commit("setLocations", []);
        } else {
          alert("Please enter a valid path");
        }
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      emitter.emit("test");
      this.pathName = "";
      this.$store.commit("setCreateMode", false);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
  },
  computed: {
    ...mapState(["locations", "onCreateMode"]),
  },
};
</script>
<style lang="scss">
.options {
  width: 15vw;
  height: inherit;
  .pathInputBox {
    display: grid;
  }
  .path {
    list-style-position: inside;
    transition: 0.2s;
    margin-block: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #c2c0c0;
    }
    &::marker {
      color: hotpink;
    }
  }
}
</style>
