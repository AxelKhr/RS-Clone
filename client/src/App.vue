<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { mapState } from 'vuex';
import store from './store';
import { setTheme } from '@/themes/themes';
import LocationModal from '@/components/LocationModal.vue';

export default defineComponent({
    components: { RouterLink, RouterView, LocationModal },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
        getTheme() {
            const theme = store.state.settings.theme;
            console.log(theme);
            setTheme(theme);
            return theme;
        },
    },
    mounted() {
        store.dispatch('language/loadLanguage');
    },
});
</script>

<template>
    <header>
        <div class="container">
            <div class="wrap">
                <div class="header_wrap">
                    <div class="header_logo">
                        <div class="app-logo"></div>
                    </div>
                    <div class="wrapper">
                        <nav>
                            <RouterLink to="/">{{ langData.menuForecast }}</RouterLink>
                            <RouterLink to="/map">{{ langData.menuMap }}</RouterLink>
                            <RouterLink to="/settings">{{ langData.menuSettings }}</RouterLink>
                            <RouterLink to="/test">Test</RouterLink>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <RouterView />
    <location-modal v-model:isShow="$store.state.forecast.isShowModal" />
</template>

<style scoped>
header {
    padding: 10px 0px;
    width: 100%;
    min-height: 80px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
}

.header_wrap,
.header_logo {
    display: flex;
    align-items: center;
}

.header_logo {
    column-gap: 25px;
    width: 100%;
}

.app-logo {
    width: 200px;
    height: 80px;
    background-color: var(--font__color);
    mask-image: url('@/assets/applogo.svg');
    -webkit-mask-image: url('@/assets/applogo.svg');
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-position: center;
    -webkit-mask-position: center;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
}

.title {
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
}

.container {
    max-width: 1450px;
}

.wrapper {
    width: 100%;
}

.logo {
    display: block;
}

nav {
    width: 100%;
    font-size: 1.2rem;
    text-align: right;
}

nav a.router-link-exact-active {
    color: var(--font__color);
    font-weight: 500;
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 2rem;
}
</style>
