<template>
  <div class="home">
    <button @click="onCreateMode = true">createPath</button>
    <input v-if="onCreateMode" type="text" v-model="pathName" />
    <button v-if="onCreateMode" @click="createPolyline">Done</button>
    <button v-if="onCreateMode" @click="cancel">Cancel</button>
    <span v-if="onCreateMode">Selected Path: {{ locations }}</span>
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
      :center="currLocation"
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
        class="testPoly"
        :lat-lngs="[
          [31.995849, 77.45014],
          [31.996103, 77.449797],
          [31.996154, 77.449481],
          [31.995863, 77.450597],
        ]"
        color="red"
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
  LControlZoom,
  LControlAttribution,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      zoom: 2,
      geojson: null,
      currLocation: [31.995809, 77.450126],
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
    check() {
      console.log("Moved");
    },
    zoomUpperBound() {
      if (this.zoom >= 18) {
        this.zoom = 18;
      }
    },
    getCurrLoc(e) {
      try {
        const { lat, lng } = e.latlng;
        if (this.onCreateMode === true) {
          this.locations.push([lat, lng]);
        }
      } catch (err) {
        console.log("what is err");
      }
    },
    createPolyline() {
      console.log(this.locations);
      //Code

      //Reset Inputs
      this.pathName = "";
      this.onCreateMode = false;
      this.locations = [];
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
  height: inherit;
  width: inherit;
  padding-inline-end: 1rem;
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
