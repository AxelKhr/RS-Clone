<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ParamCheckItem } from '@/types/params';

export default defineComponent({
    name: 'params-check',
    props: {
        items: {
            type: Array as PropType<ParamCheckItem[]>,
            default: () => [],
        },
    },
    setup(props, context) {
        function toggleItem(item: ParamCheckItem) {
            const ind = props.items.findIndex((el) => el.name === item.name);
            if (ind >= 0) {
                const newItems = props.items;
                newItems[ind].checked = !item.checked;
                context.emit('update:items', newItems);
            }
        }
        return { toggleItem };
    },
});
</script>

<template>
    <ul class="list">
        <li class="list__item" v-for="item in items" :key="item.name" @click="toggleItem(item)">
            <div class="item__icon-box">
                <icon-svg class="item__icon" v-show="item.checked" :iconPath="require('@/assets/icons/_check.svg')" />
            </div>
            <p class="item__text">{{ item.name }}</p>
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
