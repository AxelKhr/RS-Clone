<template>
    <div class="lmap">
        <l-map
            ref="weatherMap"
            style="height: 85vh; width: 100%"
            :zoom="zoom"
            :minZoom="minZoom"
            :maxBounds="maxBounds"
            :center="center"
            :attribution="attribution"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @click="onMapClick"
            @overlayadd="overlayAdd"
            @overlayremove="overlayRemove"
        >
            <l-tile-layer
                v-for="tile in tiles"
                :key="tile.name"
                :name="tile.name"
                :url="tile.url"
                :layer-type="tile.layerType"
                :visible="tile.visible"
            />
            <l-control-layers class="layer-control" :collapsed="true" />
            <l-marker ref="marker" :lat-lng="markerLatLng" :icon="icon">
                <l-popup ref="popup" :lat-lng="markerLatLng">
                    {{ markerLatLng }}
                </l-popup>
            </l-marker>
            <temp-legend v-if="showTemp" />
            <wind-legend v-if="showWind" />
            <precipitation-legend v-if="showPrec" />
            <clouds-legend v-if="showClouds" />
            <pressure-legend v-if="showPress" />
        </l-map>
    </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import { LatLng, LayersControlEvent } from 'leaflet';
import TempLegend from './map/legend/TempLegend.vue';
import PressureLegend from './map/legend/PressureLegend.vue';
import CloudsLegend from './map/legend/CloudsLegend.vue';
import WindLegend from './map/legend/WindLegend.vue';
import PrecipitationLegend from './map/legend/PrecipitationLegend.vue';
import { getForecastByLocation } from '@/api/forecast/weather';
import { LMap, LPopup, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet';
import { LType } from './map/enum';
import * as Api from '../api/constants';
import { Icon } from 'leaflet';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        PrecipitationLegend,
        WindLegend,
        PressureLegend,
        CloudsLegend,
        TempLegend,
        LMap,
        LMarker,
        LPopup,
        LTileLayer,
        LControlLayers,
    },
    data() {
        return {
            showTemp: false,
            showWind: false,
            showClouds: false,
            showPress: false,
            showPrec: false,
            zoom: 6,
            minZoom: 2,
            maxBounds: [
                [-90, -180],
                [90, 180],
            ],
            center: new LatLng(51.5072, -0.1276),
            markerLatLng: new LatLng(51.5072, -0.1276),
            icon: new Icon({
                iconUrl: require('../assets/marker.png'),
                iconSize: [35, 50],
                iconAnchor: [5, 45],
                popupAnchor: [18, -45],
            }),
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            tiles: [
                {
                    name: 'OSM Map',
                    url: Api.OSM_MAP_BASE_URL,
                    layerType: 'base',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'CartoDB (Dark)',
                    url: Api.CARTO_MAP_DARK_URL,
                    layerType: 'base',
                    bounds: null,
                    visible: false,
                },
                {
                    name: 'CartoDB (Light)',
                    url: Api.CARTO_MAP_LIGHT_URL,
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
        };
    },
    methods: {
        zoomUpdated(zoom: number) {
            this.zoom = zoom;
        },
        centerUpdated(center: LatLng) {
            this.center = center;
        },
        async onMapClick(map: typeof LMap) {
            const latlng = map.latlng;
            if (latlng != undefined) {
                this.markerLatLng = new LatLng(latlng.lat, latlng.lng);
                const data = await getForecastByLocation({ latitude: latlng.lat, longitude: latlng.lng }).then((data) =>
                    data.json()
                );
                const weather = data.data[0];
                weather.weather.icon = require(`../assets/icons/${weather.weather.icon}.png`);
                (this.$refs.popup as typeof LPopup).leafletObject
                    .setContent(
                        `<div class="header__weather">
                            <div class="left">
                                <h2 class="header__city">${weather.city_name}</h2>
                                <h3 class="header__temp">${weather.temp}°C</h3>
                            </div>
                            <div class="right">
                                <img class="weather_img" src="${weather.weather.icon}" />
                            </div>
                        </div>
                        <div class="desc">
                            <span>${weather.weather.description}</span>
                        </div>
                        <div class="info">
                            <div>Wind: ${weather.wind_spd.toFixed(2)} m/s ${weather.wind_cdir}</div>
                            <div>Pressure: ${Math.round(weather.pres / 1.333)} mmHg</div>
                            <div>Clouds Cov: ${weather.clouds} %</div>
                            <div>Visibility: ${weather.vis} km</div>
                        </div>
                        `
                    )
                    .openOn((this.$refs.weatherMap as typeof LMap).leafletObject);
            }
        },
        overlayAdd(event: LayersControlEvent) {
            const overlay = event.name;
            switch (overlay) {
                case 'Temperature':
                    this.showTemp = true;
                    break;
                case 'Wind':
                    this.showWind = true;
                    break;
                case 'Pressure':
                    this.showPress = true;
                    break;
                case 'Clouds':
                    this.showClouds = true;
                    break;
                case 'Precipitation':
                    this.showPrec = true;
                    break;
            }
        },
        overlayRemove(event: LayersControlEvent) {
            const overlay = event.name;
            switch (overlay) {
                case 'Temperature':
                    this.showTemp = false;
                    break;
                case 'Wind':
                    this.showWind = false;
                    break;
                case 'Pressure':
                    this.showPress = false;
                    break;
                case 'Clouds':
                    this.showClouds = false;
                    break;
                case 'Precipitation':
                    this.showPrec = false;
                    break;
            }
        },
    },
});
</script>

<style>
.lmap {
    min-width: 100vw;
    margin-top: 100px;
    position: fixed;
    left: 0;
    right: 0;
}

.header__weather {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    align-items: center;
    vertical-align: middle;
    border-bottom: 1px solid gray;
}

.header__city,
.header__temp {
    font-size: 1.4rem;
}

.leaflet-control-layers-expanded {
    padding: 20px;
    background: whitesmoke;
}

.leaflet-control-layers-base label,
.leaflet-control-layers-overlays label {
    color: #181818;
    font-size: 1.2rem;
}

.leaflet-control-layers-selector {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.leaflet-control-layers-selector + span {
    display: inline-flex;
    align-items: center;
    user-select: none;
}
.leaflet-control-layers-selector + span::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
}
.leaflet-control-layers-selector:checked + span::before {
    border-color: #41b883;
    background-color: #41b883;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.weather_img {
    width: 60px;
    height: 60px;
}

.desc {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
