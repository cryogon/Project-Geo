<template>
  <div class="home">
    <div v-if="!location">
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
      v-if="location"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="currLocation"
      @zoom="zoomUpperBound"
      :options="{ zoomControl: false }"
    >
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :url="tileProvider.url"
        :visible="tileProvider.visible"
        :zoom="tileProvider.zoom"
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
  LControlLayers,
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
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          zoom: 18,
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          zoom: 17,
        },
      ],
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
    LControlLayers,
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
  },
  created() {
    if (!("geolocation" in navigator)) {
      this.locErr = "GeoLocation is not available";
      this.location = false;
      return;
    }
    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.zoom = 18;
        this.currLocation = [pos.coords.latitude, pos.coords.longitude];
        this.location = true;
        console.log(this.currLocation);
        this.gettingLocation = false;
      },
      (err) => {
        this.location = false;
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
  // margin-inline-start: 20rem;
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
