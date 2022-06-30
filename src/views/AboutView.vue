<template>
  <div class="home">
    <l-map v-model="zoom" v-model:zoom="zoom" :center="[31.995809, 77.450126]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="[31.995809, 77.450126]" @moveend="check">
        <l-tooltip> Sunrise Restaurant Kalga </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      zoom: 16,
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  methods: {
    check() {
      console.log("Moved");
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
