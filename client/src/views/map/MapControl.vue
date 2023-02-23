<template>
    <div class="map-control">
        <ul class="map-buttons">
            <li>
                <div id="temp" class="map_logo temp"></div>
            </li>
            <li>
                <div id="pressure" class="map_logo pressure"></div>
            </li>
            <li>
                <div id="cloud" class="map_logo cloud"></div>
            </li>
            <li>
                <div id="wind" class="map_logo wind"></div>
            </li>
            <li>
                <div id="precipitation" class="map_logo precipitation"></div>
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
</style>
