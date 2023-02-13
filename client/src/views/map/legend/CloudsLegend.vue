<template>
    <l-control position="bottomleft">
        <div class="scale-details">
            <div>Clouds, %</div>
            <div class="scale-gradient" style="width: 260px">
                <div class="scale-dividers">
                    <div>0</div>
                    <div>25</div>
                    <div>50</div>
                    <div>75</div>
                    <div>100</div>
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
    data: () => ({
        show: true,
    }),
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
        rgba(247, 247, 255, 0) 0%,
        rgba(251, 247, 255, 0) 10%,
        rgba(244, 248, 255, 0.1) 20%,
        rgba(240, 249, 255, 0.2) 30%,
        rgba(221, 250, 255, 0.4) 40%,
        rgba(224, 224, 224, 0.9) 50%,
        rgba(224, 224, 224, 0.76) 60%,
        rgba(228, 228, 228, 0.9) 70%,
        rgba(232, 232, 232, 0.9) 80%,
        rgb(214, 213, 213) 90%,
        rgb(210, 210, 210) 95%,
        rgb(183, 183, 183) 100%
    );
}
</style>
