<template>
    <div class="details">
        <collapse :when="isExpanded" class="v-collapse">
            <div class="sunrise-sunset">
                <div class="sunrise-sunset__chart"></div>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_sunrise">
                    <dt class="sunrise-sunset__label">
                        <span class="a11y-hidden">Sunrise</span
                        ><span class="sunrise-sunset__text" aria-hidden="true">Sunrise</span
                        ><i class="icon icon_sunrise icon_size_24" aria-hidden="true" data-width="24"></i>
                    </dt>
                    <dd class="sunrise-sunset__value">{{ sunrise }}</dd>
                </dl>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_sunset">
                    <dt class="sunrise-sunset__label">
                        <span class="a11y-hidden">Sunset</span
                        ><span class="sunrise-sunset__text" aria-hidden="true">Sunset</span
                        ><i class="icon icon_sunset icon_size_24" aria-hidden="true" data-width="24"></i>
                    </dt>
                    <dd class="sunrise-sunset__value">{{ sunset }}</dd>
                </dl>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_duration">
                    <dt class="sunrise-sunset__label"><span class="sunrise-sunset__text">Daylight hours</span></dt>
                    <dd class="sunrise-sunset__value">10&nbsp;ч 8&nbsp;мин</dd>
                </dl>
            </div>
            <div class="daily">
                <div class="morning">Morning</div>
                <div class="day">Day</div>
                <div class="evening">Evening</div>
                <div class="night">Night</div>
            </div>
        </collapse>
        <div class="details__size">
            <transition name="mode-fade" mode="out-in">
                <button @click="switchButton" class="details__btn">
                    <div ref="exBtn" class="collapse__btn"></div>
                </button>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import { Collapse } from 'vue-collapsed';
export default defineComponent({
    components: {
        Collapse,
    },
    data() {
        return {
            down: false,
            isExpanded: true,
            sunrise: store.state.forecast.current.sunRise,
            sunset: store.state.forecast.current.sunSet,
        };
    },
    methods: {
        switchButton() {
            this.isExpanded = !this.isExpanded;
            (this.$refs.exBtn as HTMLElement).classList.toggle('collapse__btn');
            (this.$refs.exBtn as HTMLElement).classList.toggle('expand__btn');
        },
    },
});
</script>

<style lang="scss" scoped>
.v-collapse {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    column-gap: 30px;
    width: 100%;
    transition: height var(--vc-auto-duration) ease-out;
}

.sunrise-sunset {
    width: 25%;
    margin: auto 0;

    &__chart {
        width: 100%;
        height: 31px;
        margin-bottom: 7px;
        background: url('@/assets/sunrise_chart.svg') center no-repeat;
    }

    &__description {
        text-align: center;
        margin: 0;
    }

    &__label {
        line-height: 24px;
        height: 24px;
        margin-bottom: 5px;
    }

    &__description_value_sunrise {
        float: left;
    }

    &__description_value_sunset {
        float: right;
    }
    .a11y-hidden {
        height: 1px;
        width: 1px;
        top: 0;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        position: absolute;
        left: -32767px;
    }

    .sunrise-sunset__text {
        display: none;
    }

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .icon_sunrise {
        -webkit-background-size: 100% 100%;
        background-size: 100%;
        background-image: url('@/assets/sunrise.svg');
    }

    .icon_sunset {
        -webkit-background-size: 100% 100%;
        background-size: 100%;
        background-image: url('@/assets/sunset.svg');
    }
    .icon_size_24 {
        width: 24px;
        height: 24px;
    }
}

.daily {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
}

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

.expand__btn {
    height: 15px;
    width: 15px;
    background-color: white;
    mask-image: url('@/assets/images/chevron-down.svg');
    --webkit-mask-image: url('@/assets/images/chevron-down.svg');
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
}

.collapse__btn {
    height: 15px;
    width: 15px;
    background-color: white;
    mask-image: url('@/assets/images/chevron-up.svg');
    --webkit-mask-image: url('@/assets/images/chevron-up.svg');
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
}

.block__title {
    font-size: 1.5rem;
}
.details {
    padding: 0 80px;
    height: 100%;
    transition: all 2s;
    margin-bottom: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    &__collapsed {
        max-height: 100px;
    }
    &__container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
    &__top {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    &__btn {
        position: absolute;
        background-color: #222222;
        top: 10px;
        width: 32px;
        height: 25px;
        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    }
    &__subtitle {
        text-decoration: underline;
        font-size: 1.2rem;
        text-align: center;
        position: relative;
    }
    &__info {
        margin-left: 5px;
    }
    &__description {
        opacity: 0;
        transition: 0.5s;
        position: absolute;
        padding: 5px;
        color: black;
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        width: 250px;
        top: 25px;
        right: -80px;
        border: none;
        border-radius: 10px;
    }
    &__value {
        font-size: 1rem;
        text-align: center;
    }

    &__size {
        position: relative;
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
}
.collapse {
    height: 0;
    overflow: hidden;
    transition: height 2s;
}
.mode-fade-enter-active,
.no-mode-fade-leave-active {
    transition: opacity 0.5s;
}

.mode-fade-enter-from,
.no-mode-fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
