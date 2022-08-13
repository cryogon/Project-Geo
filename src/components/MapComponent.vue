<template>
  <div class="mapView">
    <div class="locationError" v-if="!isLocAvailable">
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
      ref="map"
      class="mainMap"
      v-if="isLocAvailable"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="mapCenter"
      @update:center="centerUpdated"
      :maxZoom="18"
      :minZoom="2"
      :zoomAnimation="true"
      :options="{ zoomControl: false }"
      @click="getCurrLoc"
      @moveend="moveEnded"
    >
      <l-tile-layer
        class="mapLayer"
        name="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
      ></l-tile-layer>

      <l-control position="topright" class="control">
        <font-awesome-icon
          icon="location-arrow"
          class="controlIcons"
          @click="myLocation"
        />
        <div>
          <font-awesome-icon
            icon="pencil"
            class="controlIcons createPath"
            @click="createModeOn"
          />
          <div class="pathDiv" ref="pathDiv">
            <h2>Create Path</h2>
            <input
              type="text"
              placeholder="Path Name"
              v-model="nameOfPath"
              ref="pathInput"
            />
            <button @click="createPath" class="createPath">Create</button>
            <button @click="cancelPath" class="cancelPath">Cancel</button>
          </div>
        </div>
      </l-control>
      <l-marker :lat-lng="currLocation">
        <l-icon :icon-size="iconSize" className="myCurrLocation">
          <img src="../../public/circle.svg" alt="myLoc"
        /></l-icon>
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
  LControl,
  LIcon,
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
    LControl,
    LIcon,
  },
  data() {
    return {
      currLocation: [31.995809, 77.450126],
      locErr: null,
      isLocAvailable: false,
      iconSize: [20, 20],
      nameOfPath: "",
      createPathMenuVisible: false,
      myLocationAccessed: false,
    };
  },
  methods: {
    moveEnded() {
      this.emitter.emit("mapMoved");
      this.myLocationAccessed && this.myLocation();
      return true;
    },
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
    myLocation() {
      this.$store.commit("setMapCenter", this.currLocation);
      this.myLocationAccessed = true;
      this.$store.commit("setZoom", 18);
      this.myLocationAccessed = false;
    },
    createModeOn() {
      this.createPathMenuVisible = !this.createPathMenuVisible;
      if (this.createPathMenuVisible) {
        this.$refs.pathDiv.style.display = "grid";
        this.emitter.emit("createMode");
        this.$refs.pathInput.focus();
      } else {
        this.$refs.pathDiv.style.display = "none";
        this.emitter.emit("cancelPath");
      }
    },
    createPath() {
      this.emitter.emit("createPath", this.nameOfPath);
      this.$refs.pathDiv.style.display = "none";

      this.nameOfPath = "";
    },
    cancelPath() {
      this.$refs.pathDiv.style.display = "none";
      this.emitter.emit("cancelPath");
    },
    centerUpdated(center) {
      this.$store.commit("setMapCenter", [center.lat, center.lng]);
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
        this.$store.commit("setMapCenter", [
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
        this.isLocAvailable = true;
        this.gettingLocation = false;
      },
      (err) => {
        this.isLocAvailable = false;
        this.locErr = err.message + "! Please Allow GeoLocation to Use the Map";
        this.gettingLocation = false;
      }
    );
  },
  computed: {
    ...mapState([
      "pathName",
      "locations",
      "mapCenter",
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
  width: 96vw;
  height: inherit;
  .locationError {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    font-size: larger;
    font-weight: 900;
    letter-spacing: 1.2px;
  }
}
.black {
  color: black;
}

.mainMap {
  width: inherit;
  height: inherit;

  .control {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 8rem;
    padding: 1rem;
    .createPath {
      position: relative;
    }
    .pathDiv {
      display: none;
      place-items: center;
      width: 15rem;
      height: 12rem;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      background: white;
      position: absolute;
      right: 3rem;
      top: 0;
      h2 {
        grid-column: 1 / span 2;
        text-transform: uppercase;
      }
      input {
        grid-column: 1 / span 2;
        height: 3rem;
        outline: none;
        border: none;
        border-inline-start: 1px solid black;
        border-block-end: 1px solid black;
        padding-inline-start: 5px;
      }
      button {
        width: 5rem;
        height: 3rem;
        outline: none;
        background: transparent;
        transition: ease-out 0.2s;
        border-radius: 1rem;
        &:hover {
          box-shadow: inset 5rem 1rem 0 0 rgb(104, 101, 101);
          color: white;
          font-weight: bolder;
        }
      }
    }
  }
  .myCurrLocation {
    background-color: rgba(51, 171, 207, 0.226);
  }
  .controlIcons {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    cursor: pointer;
    transform: scale(2);
    padding: 0.5rem;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
l-tile-layer {
  height: 100%;
  width: 100%;
}
#loadingAnimation {
  width: 40rem;
  height: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and(max-width:35rem) {
  .mapView {
    width: 100vw;
  }
}
</style>
