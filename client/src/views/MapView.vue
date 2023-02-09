<template>
    <h2>Map</h2>
    <div style="height: 80vh; width: 100%">
        <l-map ref="map" v-model:zoom="zoom" :center="[51.5072, -0.1276]">
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></l-tile-layer>
            <l-grid-layer :child-render="childRender"></l-grid-layer>
            <l-control-layers />
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
            //http://maps.weatherbit.io/v2.0/singleband/{field}/{time}/{z}/{x}/{y}.png?key=a23d71951d4f4dd89ced2ad48627f1c1
            zoom: 6,
            childRender: (props) => () => {
                return h(
                    'div',
                    { style: 'border: 1px solid grey; height: 100%;' },
                    `x: ${props.coords.x} y: ${props.coords.y} z: ${props.coords.z}`
                );
            },
            geojson: null,
        };
    },
    async created() {
        const response = await fetch(
            'https://tile.openweathermap.org/map/pressure_new/10/3/31.png?appid=1d44eaad1808dee6a14e9f7c1db9bdf4'
            //'http://maps.weatherbit.io/v2.0/singleband/{field}/{time}/{z}/{x}/{y}.png?key=a23d71951d4f4dd89ced2ad48627f1c1'
            //'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&opacity=0.9&fill_bound=true&appid={API key}'
            //'https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson'
        );
        this.geojson = await response.json();
    },
};
</script>

<style></style>
