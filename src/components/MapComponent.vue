<template>
  <div class="home">
    <div class="options">
      <button @click="setCreateModeTrue">createPath</button>
      <input v-if="onCreateMode" type="text" v-model="pathName" />
      <button v-if="onCreateMode" @click="createPolyline">Create</button>
      <button v-if="onCreateMode" @click="cancel">Cancel</button>

      <div class="listOfPaths">
        <ol>
          <li
            v-for="path in paths"
            :key="path.name"
            class="path"
            @click="
              () => {
                this.locations = path.path.path;
                this.pathLocation = path.path.path[0];
                this.zoom = 18;
              }
            "
          >
            {{ path.path_name }}
          </li>
        </ol>
      </div>
    </div>
    <div class="mapView">
      <div v-if="!isLocAvailable">
        {{ locErr }}
      </div>
      <div v-if="gettingLocation">
        <img
          id="loadingAnimation"
          src="../../public/loading.gif"
          alt="Loading Animation"
        />
      </div>
      <l-map
        class="mainMap"
        ref="map"
        v-if="isLocAvailable"
        v-model="zoom"
        v-model:zoom="zoom"
        :center="pathLocation"
        @zoom="zoomUpperBound"
        :options="{ zoomControl: false, maxZoom: 18 }"
        @click="getCurrLoc"
      >
        <l-tile-layer
          name="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zoom="18"
          layer-type="base"
        ></l-tile-layer>

        <l-control-attribution
          position="topright"
          prefix="Jatin Thakur"
        ></l-control-attribution>

        <l-control-zoom
          position="bottomright"
          zoom-in-text="+"
          zoom-out-text="−"
          maxZoom="18"
          @zoom="zoomUpperBound"
        />

        <l-marker color="red" :lat-lng="currLocation" @moveend="check">
          <l-tooltip> You </l-tooltip>
          <l-popup>This is marker</l-popup>
        </l-marker>
        <l-polyline
          :name="pathName"
          class="testPoly"
          :lat-lngs="locations"
          color="red"
        ></l-polyline>
      </l-map>
    </div>
  </div>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPolyline,
  LControlZoom,
  LControlAttribution,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import gql from "graphql-tag";
export default {
  apollo: {
    paths: {
      query: gql`
        query myQuery {
          paths {
            path_name
            path
          }
        }
      `,
    },
  },
  data() {
    return {
      zoom: 2,
      geojson: null,
      currLocation: [31.995809, 77.450126],
      pathLocation: [],
      testLocation: [[31.995809, 77.450126]],
      locErr: null,
      locations: [],
      isLocAvailable: false,
      onCreateMode: false,
      pathName: "",
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
    LControlZoom,
    LControlAttribution,
    LPopup,
  },
  methods: {
    setCreateModeTrue() {
      this.onCreateMode = true;
      this.locations = [];
    },
    check() {
      console.log("Moved");
    },
    zoomUpperBound() {
      if (this.zoom >= 18) {
        this.zoom = 18;
      }
    },
    getCurrLoc(e) {
      if (this.onCreateMode === true) {
        try {
          const { lat, lng } = e.latlng;
          this.locations = [...this.locations, [lat, lng]];
        } catch (err) {
          console.warn(
            "It's working fine but there are some problems to be fixed" //Its a bug in vue/leaflet itself according to it's github page
          );
        }
      }
    },
    async createPolyline() {
      try {
        //Code
        if (this.locations.length > 1) {
          const data = this.$apollo.mutate({
            mutation: gql`
              mutation setPath($name: String!, $path: jsonb!) {
                insert_paths(objects: { path_name: $name, path: $path }) {
                  affected_rows
                  returning {
                    path_name
                    path
                  }
                }
              }
            `,
            variables: { name: this.pathName, path: { path: this.locations } },
          });
          console.log(data);
          //Reset Inputs
          this.pathName = "";
          this.onCreateMode = false;
          this.locations = [];
        } else {
          alert("Please enter a valid path");
        }
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.pathName = "";
      this.onCreateMode = false;
      this.locations = [];
    },
  },
  created() {
    if (!("geolocation" in navigator)) {
      this.locErr = "GeoLocation is not available";
      this.isLocAvailable = false;
      return;
    }
    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.zoom = 18;
        this.currLocation = [pos.coords.latitude, pos.coords.longitude];
        this.pathLocation = [pos.coords.latitude, pos.coords.longitude];
        this.isLocAvailable = true;
        this.gettingLocation = false;
      },
      (err) => {
        this.isLocAvailable = false;
        this.locErr = err.message;
        this.gettingLocation = false;
      }
    );
  },
};
</script>
<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100vh;
  width: 100vw;
  padding-inline-end: 1rem;
  .options {
    width: 15vw;
    height: inherit;

    .path {
      list-style-position: inside;
      transition: 0.2s;
      margin-block: 0.5rem;
      cursor: pointer;
      &:hover {
        background-color: #c2c0c0;
      }
    }
  }
  .mapView {
    width: 85vw;
    height: inherit;
  }
  .mainMap {
    width: inherit;
    height: inherit;
  }
  l-tile-layer {
    height: 100%;
    width: 100%;
  }
  #loadingAnimation {
    width: 40rem;
    height: 40rem;
  }
}
</style>
