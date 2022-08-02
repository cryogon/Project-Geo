<template>
  <div class="mapView">
    <div v-if="!isLocAvailable">
      {{ locErr }}
    </div>
    <div v-if="gettingLocation">
      <img
        id="loadingAnimation"
        src="../../public/loading.svg"
        alt="Loading Animation"
      />
    </div>
    <l-map
      class="mainMap"
      v-if="isLocAvailable"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="pathLocation"
      :maxZoom="18"
      :minZoom="4"
      :zoomAnimation="true"
      :options="{ zoomControl: false }"
      @click="getCurrLoc"
    >
      <l-tile-layer
        class="mapLayer"
        name="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
      ></l-tile-layer>

      <l-marker :lat-lng="currLocation">
        <l-tooltip class="black"> You </l-tooltip>
        <l-popup>This is your location</l-popup>
      </l-marker>

      <div class="marker" v-if="isPathMarkerVisible">
        <l-marker :lat-lng="locations[0]">
          <l-tooltip class="black"> Start </l-tooltip>
          <l-popup>This is the start of the route</l-popup>
        </l-marker>
        <l-marker :lat-lng="locations[locations.length - 1]">
          <l-tooltip class="black"> End </l-tooltip>
          <l-popup>This is the end of the route</l-popup>
        </l-marker>
      </div>

      <l-polyline
        :name="pathName"
        class="testPoly"
        :lat-lngs="locations"
        color="#229bb1"
      ></l-polyline>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPolyline,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapState } from "vuex";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
    LPopup,
  },
  data() {
    return {
      currLocation: [31.995809, 77.450126],
      locErr: null,
      isLocAvailable: false,
    };
  },
  methods: {
    getCurrLoc(e) {
      if (this.onCreateMode === true) {
        try {
          const { lat, lng } = e.latlng;
          this.$store.commit("setLocations", [...this.locations, [lat, lng]]);
          this.$store.commit("setMarkerVisibility", true);
        } catch (err) {
          console.warn(
            "It's working fine but there are some problems to be fixed" //Its a bug in vue/leaflet itself according to it's github page
          );
        }
      }
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
        this.$store.commit("setZoom", 8);
        this.currLocation = [pos.coords.latitude, pos.coords.longitude];
        this.$store.commit("setPathLoc", [
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
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

  computed: {
    ...mapState([
      "pathName",
      "locations",
      "pathLocation",
      "onCreateMode",
      "isPathMarkerVisible",
      "mapZoom",
    ]),
    zoom: {
      set(zoom) {
        this.$store.commit("setZoom", zoom);
      },
      get() {
        return this.mapZoom;
      },
    },
  },
};
</script>
<style lang="scss">
.mapView {
  width: 85vw;
  height: inherit;
}
.black {
  color: black;
}

.mainMap {
  width: inherit;
  height: inherit;
  // filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
l-tile-layer {
  height: 100%;
  width: 100%;
}
#loadingAnimation {
  width: 40rem;
  height: 40rem;
}
</style>
