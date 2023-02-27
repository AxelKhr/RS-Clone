<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { IState } from '@/types/state';
import { LTypeId } from './enum';

type LayersEnable = {
    [LTypeId.TEMPERATURE]: boolean;
    [LTypeId.WIND]: boolean;
    [LTypeId.CLOUDS]: boolean;
    [LTypeId.PRESSURE]: boolean;
    [LTypeId.PRECIPITATION]: boolean;
};

export default defineComponent({
    setup() {
        const store = useStore<IState>();
        const layersEnable = computed<LayersEnable>(() => {
            const layers = store.state.settings.mapLayersEnable;
            return {
                temp: layers.find((el) => el.id === 'temp')?.enable || false,
                wind: layers.find((el) => el.id === 'wind')?.enable || false,
                cloud: layers.find((el) => el.id === 'cloud')?.enable || false,
                pressure: layers.find((el) => el.id === 'pressure')?.enable || false,
                precipitation: layers.find((el) => el.id === 'precipitation')?.enable || false,
            };
        });
        function toggleLayer(id: string) {
            const layers = store.state.settings.mapLayersEnable;
            const ind = layers.findIndex((item) => item.id === id);
            if (ind >= 0) {
                layers[ind].enable = !layers[ind].enable;
            }
            store.dispatch('settings/updateSettings', { mapLayersEnable: layers });
        }
        return { layersEnable, toggleLayer };
    },
});
</script>

<template>
    <div class="map-control">
        <ul class="map-buttons">
            <li>
                <div
                    id="temp"
                    :class="[layersEnable.temp ? 'active' : '']"
                    class="map_logo temp"
                    @click="toggleLayer('temp')"
                ></div>
            </li>
            <li>
                <div
                    id="pressure"
                    :class="[layersEnable.pressure ? 'active' : '']"
                    class="map_logo pressure"
                    @click="toggleLayer('pressure')"
                ></div>
            </li>
            <li>
                <div
                    id="cloud"
                    :class="[layersEnable.cloud ? 'active' : '']"
                    class="map_logo cloud"
                    @click="toggleLayer('cloud')"
                ></div>
            </li>
            <li>
                <div
                    id="wind"
                    :class="[layersEnable.wind ? 'active' : '']"
                    class="map_logo wind"
                    @click="toggleLayer('wind')"
                ></div>
            </li>
            <li>
                <div
                    id="precipitation"
                    :class="[layersEnable.precipitation ? 'active' : '']"
                    class="map_logo precipitation"
                    @click="toggleLayer('precipitation')"
                ></div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.map-control {
    height: 80px;
}

.map-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
}

.map_logo {
    width: 40px;
    height: 40px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    background-color: var(--font__color);
}

.active {
    background-color: #40b882;
}

.map_logo:hover {
    transition: 0.5s;
    background-color: #40b882;
    cursor: pointer;
    transform: scale(1.5);
}

.pressure {
    mask-image: url('@/assets/map-icons/pressure.svg');
    -webkit-mask-image: url('@/assets/map-icons/pressure.svg');
}

.cloud {
    mask-image: url('@/assets/map-icons/cloud.svg');
    -webkit-mask-image: url('@/assets/map-icons/cloud.svg');
}

.wind {
    mask-image: url('@/assets/map-icons/wind.svg');
    -webkit-mask-image: url('@/assets/map-icons/wind.svg');
}

.temp {
    mask-image: url('@/assets/map-icons/temp.svg');
    -webkit-mask-image: url('@/assets/map-icons/temp.svg');
}

.precipitation {
    mask-image: url('@/assets/map-icons/precipitation.svg');
    -webkit-mask-image: url('@/assets/map-icons/precipitation.svg');
}

@media (max-width: 450px) {
    .map-control {
        height: 50px;
    }
    .map_logo {
        width: 30px;
        height: 30px;
    }
}
</style>
