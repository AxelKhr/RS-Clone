<template>
    <div class="container">
        <div class="wrap">
            <map-control @click="toggleOverlay" />
            <div id="lmap" class="lmap">
                <l-map
                    ref="weatherMap"
                    style="height: 80vh; width: 100%"
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
                    <l-control-layers class="layer-control" :collapsed="true" />
                    <l-marker ref="marker" :lat-lng="markerLatLng" :icon="icon">
                        <l-popup ref="popup" :lat-lng="markerLatLng">
                            <div class="header__weather">
                                <div class="left">
                                    <h2 class="header__city">{{ weather.cityName }}</h2>
                                    <div class="temp_wrap">
                                        <div class="temp_logo"></div>
                                        <span class="header__temp">{{
                                            weather.temperature + ' ' + unit.temperature
                                        }}</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <img class="weather_img" :src="weather.weatherIcon" />
                                </div>
                            </div>
                            <div class="desc">
                                <span>{{ weather.weatherDescription }}</span>
                            </div>
                            <div class="info">
                                <div class="wind_wrap">
                                    <div class="wind_logo"></div>
                                    <span>{{
                                        weather.windSpeed.toFixed(2) +
                                        ' ' +
                                        unit.speed +
                                        ' ' +
                                        weather.windDirectionAbbr
                                    }}</span>
                                </div>
                                <div class="pressure_wrap">
                                    <div class="pressure_logo"></div>
                                    <span>{{ Math.round(weather.pressure / 1.333) + ' ' + unit.pressure }}</span>
                                </div>
                                <div class="cloud_wrap">
                                    <div class="cloud_logo"></div>
                                    <span>{{ weather.cloudCoverage }} %</span>
                                </div>
                                <div class="visibility_wrap">
                                    <div class="visibility_logo"></div>
                                    <span>{{ weather.visibility + ' ' + unit.length }}</span>
                                </div>
                            </div>
                        </l-popup>
                    </l-marker>
                    <map-legend
                        :temp="layersLegend.temp"
                        :press="layersLegend.press"
                        :cloud="layersLegend.cloud"
                        :wind="layersLegend.wind"
                        :prec="layersLegend.prec"
                    />
                </l-map>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import store from '@/store';
import MapControl from './map/MapControl.vue';
import MapLegend from './map/MapLegend.vue';
import { LatLng, Icon } from 'leaflet';
import { getForecastByLocation } from '@/api/forecast/weather';
import { LMap, LPopup, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet';
import { LUrlType, LTypeId } from './map/enum';
import { MapLayer } from './map/types';
import * as Api from '../api/constants';
import { defineComponent, computed } from 'vue';
import { unitData } from './utils/metricUtils';
import { useStore } from 'vuex';
import { IState } from '@/types/state';

export default defineComponent({
    components: {
        MapControl,
        MapLegend,
        LMap,
        LMarker,
        LPopup,
        LTileLayer,
        LControlLayers,
    },
    data() {
        let unit = unitData();
        return {
            unit,
            weather: store.state.forecast.current,
            zoom: 6,
            minZoom: 2,
            maxBounds: [
                [-90, -180],
                [90, 180],
            ],
            center: new LatLng(
                store.state.forecast.location.position.latitude,
                store.state.forecast.location.position.longitude
            ),
            markerLatLng: new LatLng(
                store.state.forecast.location.position.latitude,
                store.state.forecast.location.position.longitude
            ),
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
                    name: LTypeId.PRESSURE,
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LUrlType.PRESSURE),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: LTypeId.CLOUDS,
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LUrlType.CLOUDS),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: LTypeId.PRECIPITATION,
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LUrlType.PRECIPITATION),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: LTypeId.WIND,
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LUrlType.WIND),
                    layerType: 'overlay',
                    bounds: null,
                    visible: false,
                },
                {
                    name: LTypeId.TEMPERATURE,
                    url: Api.MAP_OVERLAY_URL.replace('{layer}', LUrlType.TEMPERATURE),
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
                                <div class="temp_wrap">
                                    <div class="temp_logo"></div>
                                    <span class="header__temp">${weather.temp} ${this.unit.temperature}</span>
                                </div>
                            </div>
                            <div class="right">
                                <img class="weather_img" src="${weather.weather.icon}" />
                            </div>
                        </div>
                        <div class="desc">
                            <span>${weather.weather.description}</span>
                        </div>
                        <div class="info">
                            <div class="wind_wrap">
                                <div class="wind_logo"></div>
                                <span>${weather.wind_spd.toFixed(2)} ${this.unit.speed} ${weather.wind_cdir}</span>
                            </div>
                            <div class="pressure_wrap">
                                <div class="pressure_logo"></div>
                                <span>${Math.round(weather.pres / 1.333) + ' ' + this.unit.pressure}</span>
                            </div>
                            <div class="cloud_wrap">
                                <div class="cloud_logo"></div>
                                <span>${weather.clouds} %</span>
                            </div>
                            <div class="visibility_wrap">
                                <div class="visibility_logo"></div>
                                <span>${weather.vis} ${this.unit.length}</span>
                            </div>
                        </div>`
                    )
                    .openOn((this.$refs.weatherMap as typeof LMap).leafletObject);
            }
        },
        toggleOverlay(event: Event) {
            const target = event.target as HTMLElement;
            if (target.closest('li')) {
                this.setLayer(target.id);
            }
        },
        setLayer(id: string) {
            const layers = this.layersEnable as MapLayer[];
            const ind = layers.findIndex((item) => item.id === id);
            if (ind >= 0) {
                this.tiles.forEach((el) => {
                    if (el.name == layers[ind].id) {
                        el.visible = layers[ind].enable;
                    }
                });
            }
        },
    },
    mounted() {
        const layers = this.layersEnable as MapLayer[];
        layers.forEach((el) => {
            this.setLayer(el.id);
        });
    },
    setup() {
        const store = useStore<IState>();
        const layersEnable = computed(() => store.state.settings.mapLayersEnable);
        const layersLegend = computed(() => {
            return {
                temp: layersEnable.value.find((el) => el.id === 'temp')?.enable || false,
                wind: layersEnable.value.find((el) => el.id === 'wind')?.enable || false,
                cloud: layersEnable.value.find((el) => el.id === 'cloud')?.enable || false,
                press: layersEnable.value.find((el) => el.id === 'pressure')?.enable || false,
                prec: layersEnable.value.find((el) => el.id === 'precipitation')?.enable || false,
            };
        });
        return { layersEnable, layersLegend };
    },
});
</script>

<style>
.pressure_logo {
    mask-image: url('../assets/map-icons/pressure.svg');
    -webkit-mask-image: url('../assets/map-icons/pressure.svg');
}

.cloud_logo {
    mask-image: url('../assets/map-icons/cloud.svg');
    -webkit-mask-image: url('../assets/map-icons/cloud.svg');
}

.wind_logo {
    mask-image: url('../assets/map-icons/wind.svg');
    -webkit-mask-image: url('../assets/map-icons/wind.svg');
}

.temp_logo {
    mask-image: url('../assets/map-icons/temp.svg');
    -webkit-mask-image: url('../assets/map-icons/temp.svg');
}

.precipitation_logo {
    mask-image: url('../assets/map-icons/precipitation.svg');
    -webkit-mask-image: url('../assets/map-icons/precipitation.svg');
}

.visibility_logo {
    mask-image: url('../assets/map-icons/visibility.svg');
    -webkit-mask-image: url('../assets/map-icons/visibility.svg');
}

.lmap {
    min-width: 100vw;
    height: 80vh;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 0;
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

.leaflet-control-layers-separator,
.leaflet-control-layers-overlays {
    display: none;
}

.leaflet-control-layers-toggle {
    background-image: url('@/assets/map-icons/map.svg');
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
    border: none;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.leaflet-control-layers-expanded {
    padding: 20px;
    background: whitesmoke;
    border-color: whitesmoke;
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

.leaflet-control-layers-selector + span:hover {
    cursor: pointer;
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

.leaflet-control-layers-selector:not(:disabled):not(:checked) + span:hover::before {
    border-color: #40b882;
}

.leaflet-control-layers-selector:not(:disabled):active + span::before {
    background-color: #40b882;
    border-color: #40b882;
}

.leaflet-control-layers-selector:focus + label::before {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.leaflet-control-layers-selector:focus:not(:checked) + span::before {
    border-color: #40b882;
}

.weather_img {
    width: 60px;
    height: 60px;
}

.temp_wrap,
.wind_wrap,
.pressure_wrap,
.cloud_wrap,
.visibility_wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 5px;
}

.temp_logo,
.wind_logo,
.pressure_logo,
.cloud_logo,
.visibility_logo {
    display: inline;
    width: 20px;
    height: 20px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    background-color: black;
}

.desc {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
