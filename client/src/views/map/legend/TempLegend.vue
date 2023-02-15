<template>
    <l-control position="bottomleft">
        <div class="scale-details">
            <div>Temperature, °C</div>
            <div class="scale-gradient" style="width: 260px">
                <div class="scale-dividers">
                    <div>-40</div>
                    <div>-20</div>
                    <div>0</div>
                    <div>20</div>
                    <div>40</div>
                </div>
                <div class="horizontal-gradient-line"></div>
            </div>
        </div>
    </l-control>
</template>

<script lang="ts">
import { LControl } from '@vue-leaflet/vue-leaflet';

export default {
    components: {
        LControl,
    },
};
</script>

<style scoped>
.scale-details {
    padding: 10px;
    color: black;
    background-color: white;
    border-radius: 5px;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.scale-dividers {
    display: flex;
    flex-direction: row;
}
.scale-dividers {
    justify-content: space-between;
    width: 100%;
}
.horizontal-gradient-line {
    height: 10px;
    background-image: linear-gradient(
        to right,
        rgb(159, 85, 181) 0%,
        rgb(44, 106, 187) 8.75%,
        rgb(82, 139, 213) 12.5%,
        rgb(103, 163, 222) 18.75%,
        rgb(142, 202, 240) 25%,
        rgb(155, 213, 244) 31.25%,
        rgb(172, 225, 253) 37.5%,
        rgb(194, 234, 255) 43.75%,
        rgb(255, 255, 208) 50%,
        rgb(254, 248, 174) 56.25%,
        rgb(254, 232, 146) 62.5%,
        rgb(254, 226, 112) 68.75%,
        rgb(253, 212, 97) 75%,
        rgb(244, 168, 94) 82.5%,
        rgb(244, 129, 89) 87.5%,
        rgb(244, 104, 89) 93.75%,
        rgb(244, 76, 73) 100%
    );
}
</style>
