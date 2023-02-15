<template>
    <transition name="bounce">
        <pressure-legend v-show="press" />
    </transition>
    <transition name="bounce">
        <clouds-legend v-show="cloud" />
    </transition>
    <transition name="bounce">
        <precipitation-legend v-show="prec" />
    </transition>
    <transition name="bounce">
        <wind-legend v-show="wind" />
    </transition>
    <transition name="bounce">
        <temp-legend v-show="temp" />
    </transition>
</template>

<script lang="ts">
import TempLegend from './legend/TempLegend.vue';
import PressureLegend from './legend/PressureLegend.vue';
import CloudsLegend from './legend/CloudsLegend.vue';
import WindLegend from './legend/WindLegend.vue';
import PrecipitationLegend from './legend/PrecipitationLegend.vue';

export default {
    components: {
        PrecipitationLegend,
        WindLegend,
        PressureLegend,
        CloudsLegend,
        TempLegend,
    },
    props: ['temp', 'press', 'cloud', 'wind', 'prec'],
};
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.9s;
}
.bounce-leave-active {
    animation: bounce-in 0.9s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
