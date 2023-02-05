import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'forecast',
            component: () => import('../views/ForecastView.vue'),
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('../views/MapView.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue'),
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/HomeView.vue'),
        },
    ],
});

export default router;
