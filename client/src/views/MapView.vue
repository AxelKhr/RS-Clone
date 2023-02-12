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
        >
            <l-tile-layer
                v-for="tile in tiles"
                :key="tile.name"
                :name="tile.name"
                :url="tile.url"
                :layer-type="tile.layerType"
                :visible="tile.visible"
            />
            <l-control-layers :collapsed="false" />
            <l-marker ref="marker" :lat-lng="markerLatLng" :icon="icon">
                <l-popup ref="popup" :lat-lng="markerLatLng">
                    {{ markerLatLng }}
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { getForecastByLocation } from '@/api/forecast/weather';
import { LMap, LPopup, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet';
import { LType } from './map/enum';
import * as Api from '../api/constants';
import { Icon } from 'leaflet';

export default {
    components: {
        LMap,
        LMarker,
        LPopup,
        LTileLayer,
        LControlLayers,
    },
    data() {
        return {
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
                iconSize: [35, 55],
                iconAnchor: [5, 50],
                popupAnchor: [18, -50],
            }), //require('../../node_modules/leaflet/dist/images/marker-icon.png'),
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
        async onMapClick(map: LMap) {
            const latlng = map.latlng;
            if (latlng != undefined) {
                this.markerLatLng = new LatLng(latlng.lat, latlng.lng);
                const data = await getForecastByLocation({ latitude: latlng.lat, longitude: latlng.lng }).then((data) =>
                    data.json()
                );
                const weather = data.data[0];
                weather.weather.icon = require(`../assets/icons/${weather.weather.icon}.png`);
                console.log(weather.weather.icon);
                (this.$refs.popup as LPopup).leafletObject
                    .setContent(
                        `<div class="header__weather">
                            <div class="left">
                                <h2>${weather.city_name}</h2>
                                <h3>${weather.temp}°C</h3>
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
                    .openOn((this.$refs.weatherMap as LMap).leafletObject);
            }
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

.header__weather {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    align-items: center;
    vertical-align: middle;
    border-bottom: 1px solid gray;
}

.weather_img {
    width: 30px;
    height: 30px;
}

.desc {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
