<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITheme from '@/types/theme';
import { Themes } from '@/themes/themes';

export default defineComponent({
    name: 'themes-list',
    props: {
        items: {
            type: Array as PropType<ITheme[]>,
            default: () => [],
        },
        selected: {
            type: Object as PropType<ITheme>,
            default: Themes.default,
        },
    },
    setup(props, context) {
        function setItem(item: ITheme) {
            context.emit('update:selected', item);
        }
        return { setItem };
    },
});
</script>

<template>
    <ul class="list">
        <li class="list__item" v-for="item in items" :key="item.id" @click="setItem(item)">
            <div class="item__title">
                <div class="item__icon-box">
                    <icon-svg
                        class="item__icon"
                        v-show="item.id === selected.id"
                        :iconPath="require('@/assets/icons/_check.svg')"
                    />
                </div>
                <p class="item__text">{{ item.name }}</p>
            </div>
            <div class="item__shape" :style="{ 'background-color': item.color, color: item.fontColor }">TEXT</div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: center;
    .list {
        &__item {
            padding: 2px 15px;
            border-radius: 5px;
            width: 160px;

            &:hover {
                background-color: var(--background__color--hover);
                cursor: pointer;
            }
            &:active {
                background-color: var(--background__color--active);
            }

            .item {
                &__title {
                    display: flex;
                    align-items: center;
                }

                &__icon-box {
                    display: flex;
                    width: 24px;
                    margin-right: 5px;
                }

                &__shape {
                    height: 50px;
                    margin: 5px 0;
                    border-radius: 5px;
                    border: 1px solid var(--border__color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>
