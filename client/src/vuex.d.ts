import { Store } from 'vuex';
import { IState } from './types/state';

declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<IState>;
    }
}
