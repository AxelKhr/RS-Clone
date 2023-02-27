import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './styles/main.scss';

import IconSvg from '@/components/IconSvg.vue';
import IconSvgButton from '@/components/IconSvgButton.vue';

const app = createApp(App);
app.component('icon-svg', IconSvg);
app.component('icon-svg-button', IconSvgButton);
app.use(store);
app.use(router);
app.mount('#app');
