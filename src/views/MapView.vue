<template>
  <div class="home">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[31.995809, 77.450126]"
      @zoom="zoomUpperBound"
      :options="{ zoomControls: false }"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="[31.995809, 77.450126]" @moveend="check">
        <l-tooltip> Sunrise Restaurant Kalga </l-tooltip>
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
