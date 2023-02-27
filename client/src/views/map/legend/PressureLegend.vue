<template>
    <l-control position="bottomleft">
        <div class="scale-details">
            <div>{{ lang.pressure + ', ' + unit.pressure }}</div>
            <div class="scale-gradient">
                <div class="scale-dividers">
                    <div>740</div>
                    <div>745</div>
                    <div>750</div>
                    <div>755</div>
                    <div>760</div>
                </div>
                <div class="horizontal-gradient-line"></div>
            </div>
        </div>
    </l-control>
</template>

<script lang="ts">
import { LControl } from '@vue-leaflet/vue-leaflet';
import { unitData } from '@/views/utils/metricUtils';
import { langData } from '@/views/utils/langUtils';

export default {
    components: {
        LControl,
    },
    data() {
        let unit = unitData();
        let lang = langData();
        return {
            unit,
            lang,
        };
    },
};
</script>

<style scoped>
.scale-details {
    padding: 10px;
    width: 260px;
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
        rgb(0, 115, 255) 0%,
        rgb(0, 170, 255) 8.35059%,
        rgb(75, 208, 214) 24.9192%,
        rgb(141, 231, 199) 41.4879%,
        rgb(176, 247, 32) 49.7722%,
        rgb(240, 184, 0) 58.0565%,
        rgb(251, 85, 21) 74.6251%,
        rgb(243, 54, 59) 91.1938%,
        rgb(198, 0, 0) 100%
    );
}
@media (max-width: 500px) {
    .scale-details {
        width: 150px;
    }
}
</style>
