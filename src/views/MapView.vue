<template>
  <div class="home">
    <div v-if="!location">
      {{ locErr }}
    </div>
    <l-map
      v-if="location"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="currLocation"
      @zoom="zoomUpperBound"
      :options="{ zoomControls: false }"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="currLocation" @moveend="check">
        <l-tooltip> You </l-tooltip>
      </l-marker>
      <l-polyline
        :lat-lngs="[
          [31.995849, 77.45014],
          [31.996103, 77.449797],
          [31.996154, 77.449481],
          [31.995863, 77.450597],
        ]"
        color="red"
      ></l-polyline>
      <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
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
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      zoom: 2,
      geojson: null,
      currLocation: [31.995809, 77.450126],
      locErr: null,
      location: false,
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
  },
  methods: {
    check() {
      console.log("Moved");
    },
    zoomUpperBound() {
      if (this.zoom > 18) {
        this.zoom = 18;
      }
    },
  },
  created() {
    if (!("geolocation" in navigator)) {
      this.locErr = "GeoLocation is not available";
      this.location = false;
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.zoom = 18;
        this.currLocation = [pos.coords.latitude, pos.coords.longitude];
        this.location = true;
        console.log(this.currLocation);
      },
      (err) => {
        this.location = false;
        this.locErr = err.message;
      }
    );
  },
};
</script>
<style lang="scss">
.home {
  height: 50rem;
  width: 70rem;
  margin-inline-start: 20rem;
  l-tile-layer {
    height: 100%;
    width: 100%;
  }
}
</style>
