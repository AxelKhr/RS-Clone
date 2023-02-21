<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'params-list',
    props: {
        items: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        selected: {
            type: String,
            default: '',
        },
    },
    setup(props, context) {
        function setItem(item: string) {
            context.emit('update:selected', item);
        }
        return { setItem };
    },
});
</script>

<template>
    <ul class="list">
        <li class="list__item" v-for="item in items" :key="item" @click="setItem(item)">
            <div class="item__icon-box">
                <icon-svg
                    class="item__icon"
                    v-show="item === selected"
                    :iconPath="require('@/assets/icons/_check.svg')"
                />
            </div>
            <p class="item__text">{{ item }}</p>
            <slot name="itemSlot" v-bind="{ item }"></slot>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    padding: 5px;
    .list {
        &__item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 2px 15px;
            border-radius: 5px;

            &:hover {
                background-color: var(--background__color--hover);
                cursor: pointer;
            }
            &:active {
                background-color: var(--background__color--active);
            }

            .item {
                &__icon-box {
                    display: flex;
                    width: 24px;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
