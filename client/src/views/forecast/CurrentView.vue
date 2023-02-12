<template>
    <div class="weather-actions">
        <div class="locations">
            <img class="locations__img" src="../../assets/images/location.svg" alt="locations" />
            <div class="locations__text">
                {{ $store.state.forecast.current.cityName }}
            </div>
        </div>
        <button class="refresh-btn" @click="$store.dispatch('forecast/updateForecast')">
            <img
                src="../../assets/images/refresh.svg"
                alt="refresh"
                @click="$store.dispatch('forecast/updateForecast')"
            />
        </button>
    </div>

    <div class="weather">
        <div class="weather__text">
            <!-- обновлять раз в минутут -->
            <div class="timezone">Time: TODO время в API не правильное<!-- {{ weatherData.ob_time.slice(-5) }} --></div>
            <div class="temperature">{{ Math.round($store.state.forecast.current.temperature) }}°C</div>
            <div class="weather__desc">
                <div class="feelings">
                    Feelings like
                    {{ Math.round($store.state.forecast.current.feelsLikeTemp) }}°C
                </div>
                <div>{{ $store.state.forecast.current.weatherDescription }}</div>
                <div>
                    Precipitation:
                    {{ $store.state.forecast.daily.days[1].precipitationProbability }}%
                </div>
            </div>
        </div>
        <img class="weather__img" :src="$store.state.forecast.current.weatherIcon" />
    </div>
</template>

<script lang="ts">
import store from '@/store';

export default {
    data() {
        let details = [
            {
                id: 0,
                subtitle: 'Temp',
                value: `${Math.round(store.state.forecast.daily.days[1].temperatureMin)} ... ${Math.round(
                    store.state.forecast.daily.days[1].temperatureMax
                )}°C`,
            },
            {
                id: 1,
                subtitle: 'Humidity',
                value: `${store.state.forecast.current.humidityRelative} %`,
            },
            {
                id: 2,
                subtitle: 'Precipitation',
                value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
            },
            {
                id: 3,
                subtitle: 'Sunrise',
                value: `${store.state.forecast.current.sunRise}`,
            },
            {
                id: 4,
                subtitle: 'Sunset',
                value: `${store.state.forecast.current.sunSet}`,
            },
            {
                id: 5,
                subtitle: 'Wind',
                value: `${store.state.forecast.current.windSpeed.toFixed(2)} m/s ${
                    store.state.forecast.current.windDirectionAbbr
                }`,
            },
            {
                id: 6,
                subtitle: 'Pressure',
                value: `${Math.round(store.state.forecast.current.pressure / 1.333)} mmHg`,
            },
            {
                id: 7,
                subtitle: 'Clouds Cov.',
                value: `${store.state.forecast.current.cloudCoverage} %`,
            },
            {
                id: 8,
                subtitle: 'Visibility',
                value: `${store.state.forecast.current.visibility} km`,
            },
        ];
        return { details, down: false };
    },
};
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: rgb(205, 205, 205);

    &:hover {
        background-color: rgb(228, 228, 228);
    }

    &:active {
        background-color: rgb(205, 205, 205);
    }
}

.weather-actions {
    display: flex;
    justify-content: space-between;
}
.locations {
    display: flex;
    align-items: center;

    &__img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }

    &__text {
        font-size: 1.5rem;
    }
}

.refresh-btn {
    width: 45px;
    height: 45px;
    padding: 10px;
}
.weather {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;

    &__desc {
        font-size: 0.8rem;
    }

    &__img {
        margin-top: 20px;
        width: 150px;
        height: 150px;
    }
}
.temperature {
    font-size: 3rem;
}
.feelings {
    font-size: 0.8rem;
}
</style>
