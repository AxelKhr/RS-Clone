<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { mapState } from 'vuex';
import LocationModal from '@/components/LocationModal.vue';
import StartView from './views/StartView.vue';

export default defineComponent({
    components: { RouterLink, RouterView, LocationModal, StartView },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    mounted() {
        this.$store.dispatch('language/loadLanguage');
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
                            <RouterLink to="/" class="forecast-route">
                                <div class="forecast-logo"></div>
                                <span class="forecast-title">{{ langData.menuForecast }}</span>
                            </RouterLink>
                            <RouterLink to="/map" class="map-route">
                                <div class="map-logo"></div>
                                <span class="map-title">{{ langData.menuMap }}</span>
                            </RouterLink>
                            <RouterLink to="/settings" class="setting-route">
                                <div class="setting-logo"></div>
                                <span class="setting-title">{{ langData.menuSettings }}</span>
                            </RouterLink>
                            <!--<RouterLink to="/test">Test</RouterLink>-->
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <StartView v-if="$store.state.forecast.isStart" />
    <RouterView v-else />
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
    width: 25%;
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
    display: flex;
    justify-content: end;
    width: 100%;
    font-size: 1.2rem;
}

nav a.router-link-exact-active {
    color: var(--font__color);
    font-weight: 500;
}

.forecast-route,
.map-route,
.setting-route {
    display: flex;
    align-items: center;
}
.forecast-logo,
.map-logo,
.setting-logo {
    display: none;
    width: 25px;
    height: 25px;
    background-color: black;
}
.forecast-logo {
    mask: url('@/assets/forecast-logo.svg') center no-repeat;
}
.map-logo {
    mask: url('@/assets/map-logo.svg') center no-repeat;
}
.setting-logo {
    mask: url('@/assets/setting-logo.svg') center no-repeat;
}
nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 2rem;
}

@media (max-width: 720px) {
    nav {
        font-size: 1rem;
    }

    nav a {
        padding: 0 1rem;
    }
}

@media (max-width: 450px) {
    header {
        min-height: 50px;
    }
    .header_logo {
        display: none;
    }

    nav {
        justify-content: space-between;
    }

    nav a {
        padding: 0 1.5rem;
    }

    .forecast-logo,
    .map-logo,
    .setting-logo {
        display: block;
    }

    .forecast-title,
    .map-title,
    .setting-title {
        display: none;
    }
}
</style>
