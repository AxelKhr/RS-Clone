import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'forecast',
            component: () => import('../views/ForecastView.vue'),
            beforeEnter: beforeEnterHandler,
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('../views/MapView.vue'),
            beforeEnter: beforeEnterHandler,
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue'),
            beforeEnter: beforeEnterHandler,
        },
        {
            path: '/start',
            name: 'start',
            component: () => import('../views/StartView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/:catchAll(.*)',
            name: 'error',
            component: () => import('../views/Error404.vue'),
        },
    ],
});

function beforeEnterHandler(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (store.state.forecast.isStart) {
        next('/start');
    } else {
        next();
    }
}

export default router;
