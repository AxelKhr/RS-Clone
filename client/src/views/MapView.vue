<template>
    <h2>Map</h2>
    <div style="height: 85vh; width: 100%">
        <l-map ref="map" v-model:zoom="zoom" :center="center">
            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :url="tileProvider.url"
                :layer-type="tileProvider.layerType"/>
            <l-tile-layer
                v-for="weatherTile in weatherTiles"
                :key="weatherTile.name"
                :name="weatherTile.name"
                :url="weatherTile.url"
                :visible="weatherTile.visible"
                :layer-type="weatherTile.layerType"/>
            <l-control-layers />
            <l-grid-layer :child-render="childRender"></l-grid-layer>
            <l-geo-json :geojson="geojson"></l-geo-json>
        </l-map>
    </div>
</template>

<script>
import { h } from 'vue';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LGridLayer, LControlLayers, LGeoJson } from '@vue-leaflet/vue-leaflet';

export default {
    components: {
        LMap,
        LTileLayer,
        LGridLayer,
        LControlLayers,
        LGeoJson,
    },
    data() {
        return {
            center: [51.5072, -0.1276],
            zoom: 6,
            tileProviders: [
                {
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    temp_url: 'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4',
                    name: 'OpenMap',
                    layerType: 'base',
                },
            ],
            weatherTiles: [
                {
                    url: 'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4',
                    name: 'Pressure',
                    layerType: 'overlay',
                    visible: false,
                },
                {
                    url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4',
                    name: 'Clouds',
                    layerType: 'overlay',
                    visible: false,
                },
                {
                    url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4',
                    name: 'Precipitation',
                    layerType: 'overlay',
                    visible: false,
                },
                {
                    url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4',
                    name: 'Wind',
                    layerType: 'overlay',
                    visible: false,
                },
            ],
            childRender: (props) => () => {
                return h(
                    'div',
                    { style: 'border: 1px solid grey; height: 100%;' },
                    `x: ${props.coord.x} y: ${props.coords.y} z: ${props.coords.z}`
                );
            },
            geojson: null,
        };
    },
};
</script>

<style></style>
