<!-- <template>
    <div class="daily">
        <div class="day"></div>
    </div>
</template>

<script lang="ts">
import { getForecastDaily } from '../../api/forecast/weather';
import type LocationForecastResponse from '../../api/types/response';

export default {
/*   props: {

  }, */
    async setup() {
        const data = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
        console.log('response :>> ', response);
        const weatherDataDaily: LocationForecastResponse = response.data[0];
        weatherDataDaily.weather.icon = require(`../../assets/icons/${weatherDataDaily.weather.icon}.png`);
        return { weatherDataDaily };
    },

    data() {
        return {};
    },
};
</script>

<style scoped></style>
 -->
