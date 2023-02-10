<template>
    <div class="lmap">
        <l-map
            style="height: 85vh; width: 100%"
            :zoom="zoom"
            :center="center"
            :attribution="attribution"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            @click="openPopup"
        >
            <l-tile-layer
                v-for="tile in tiles"
                :key="tile.name"
                :name="tile.name"
                :url="tile.url"
                :layer-type="tile.layerType"
                :visible="tile.visible"
            />
            />
            <l-control-layers :collapsed="false" />
            <l-marker ref="marker" :lat-lng="marker">
                <l-popup ref="popup">PopUp</l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LControlLayers, LPopup, LMarker } from '@vue-leaflet/vue-leaflet';
import { LType } from './map/enum';
import * as Api from '../api/constants';

export default {
    components: {
        LMap,
        LPopup,
        LMarker,
        LTileLayer,
        LControlLayers,
    },
    data() {
        return {
            zoom: 5,
            center: [51.5072, -0.1276],
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            tiles: [
                {
                    name: 'Street-Map',
                    url: Api.MAP_BASE_URL,
                    layerType: 'base',
                    bounds: null,
                },
                {
                    name: 'Pressure',
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LType.PRESSURE),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'Clouds',
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LType.CLOUDS),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'Precipitation',
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LType.PRECIPITATION),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'Wind',
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LType.WIND),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'Temperature',
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LType.TEMPERATURE),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
            ],
            marker: [0, 0],
        };
    },
    methods: {
        zoomUpdated(zoom) {
            this.zoom = zoom;
        },
        centerUpdated(center) {
            this.center = center;
        },
        boundsUpdated(bounds) {
            this.bounds = bounds;
        },
        onClickMap(map) {
            const latlng = map.latlng;
            console.log(latlng);
        },
        openPopup(e) {
            this.marker = e.latlng;
            setTimeout(() => this.$refs.marker.leafletObject.openPopup(), 100);
        },
    },
};
</script>

<style>
.lmap {
    min-width: 100vw;
    margin-top: 100px;
    position: fixed;
    left: 0;
    right: 0;
}
</style>
