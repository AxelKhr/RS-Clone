<template class="container">
    <div class="container">
        <div class="wrap">
            <div class="forecast">
                <common-vue />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import CommonVue from './forecast/CommonView.vue';
export default {
    components: {
        CommonVue,
    },
};
</script>

<style scoped>
.forecast {
    margin-top: 40px;
    width: 100%;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    border: none;
}
</style>
