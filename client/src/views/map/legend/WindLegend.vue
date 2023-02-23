<template>
    <l-control position="bottomleft">
        <div class="scale-details">
            <div>{{ lang.wind + ', ' + unit.speed }}</div>
            <div class="scale-gradient" style="width: 260px">
                <div class="scale-dividers">
                    <div>0</div>
                    <div>2</div>
                    <div>3</div>
                    <div>6</div>
                    <div>12</div>
                    <div>25</div>
                    <div>50</div>
                    <div>100</div>
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
        to left,
        rgb(158, 128, 177),
        rgba(116, 76, 172, 0.9),
        rgb(164, 123, 170),
        rgba(170, 128, 177, 0.84),
        rgba(176, 128, 177, 0.71),
        rgba(170, 128, 177, 0.54),
        rgba(170, 128, 177, 0.44),
        rgba(255, 255, 0, 0)
    );
}
</style>
