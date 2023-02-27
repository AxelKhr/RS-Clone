<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'page-404',
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    setup() {
        const router = useRouter();
        function routeBack() {
            router.back();
        }

        return { routeBack };
    },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div class="about">
                <div class="about__back">
                    <icon-svg-button
                        class="back__icon"
                        :iconPath="require('@/assets/icons/_arrow-left.svg')"
                        @click.stop="routeBack"
                        >{{ langData.btnBackText }}</icon-svg-button
                    >
                </div>
                <div class="about__wrapper">
                    <p class="about__title">{{ langData.aboutTitle }}</p>
                    <p class="about__text">{{ langData.aboutText }}</p>
                    <p class="about__desinged">{{ langData.aboutAuthor }}</p>
                    <div class="about__author">
                        <a class="author__link" href="https://github.com/AxelKhr" target="_blank">
                            <icon-svg class="author__icon" :iconPath="require('@/assets/icons/_author1.svg')" />
                        </a>
                        <a class="author__link" href="https://github.com/Guramiart" target="_blank">
                            <icon-svg class="author__icon" :iconPath="require('@/assets/icons/_author2.svg')" />
                        </a>
                        <a class="author__link" href="https://github.com/gru6" target="_blank">
                            <icon-svg class="author__icon" :iconPath="require('@/assets/icons/_author3.svg')" />
                        </a>
                    </div>
                    <p class="about__desinged">2023</p>
                    <a class="rss__link" href="https://rs.school/" target="_blank">
                        <icon-svg class="rss__icon" :iconPath="require('@/assets/icons/_rslogo.svg')" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding-top: 40px;
    .about {
        position: relative;
        margin: 0 auto;
        .about {
            &__wrapper {
                max-width: 400px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                .rss__link {
                    color: var(--font__color);
                    opacity: 0.5;
                    &:hover {
                        opacity: 1;
                    }
                }
                .rss__icon {
                    width: 120px;
                    height: 50px;
                }
            }
            &__title {
                font-size: 1.8rem;
                margin-bottom: 10px;
            }
            &__text {
                font-size: 1.2rem;
                margin-bottom: 40px;
            }
            &__desinged {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            &__author {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 20px;

                .author {
                    &__link {
                        color: var(--font__color);
                        border: 2px solid var(--border__color);
                        border-radius: 50%;
                        &:hover {
                            background-color: var(--background__color--hover);
                            border-color: var(--font__color);
                        }
                    }
                    &__icon {
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }
    }
}
</style>
