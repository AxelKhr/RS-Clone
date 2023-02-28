<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ParamBlockItem } from '@/types/params';

export default defineComponent({
    name: 'params-blocks',
    props: {
        items: {
            type: Array as PropType<ParamBlockItem[]>,
            default: () => [],
        },
    },
    setup(props, context) {
        function moveUp(index: number) {
            if (index > 0) {
                const newItems = props.items;
                [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                context.emit('update:items', newItems);
            }
        }
        function moveDown(index: number) {
            if (index < props.items.length - 1) {
                const newItems = props.items;
                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                context.emit('update:items', newItems);
            }
        }
        function toggleVisible(index: number) {
            const newItems = props.items;
            newItems[index].visible = !newItems[index].visible;
            context.emit('update:items', newItems);
        }
        return { moveUp, moveDown, toggleVisible };
    },
});
</script>

<template>
    <ul class="list">
        <transition-group name="flip-list" tag="ul">
            <li class="list__item" v-for="(item, index) in items" :key="item.id">
                <p class="item__text">{{ item.name }}</p>
                <div class="item__icons">
                    <icon-svg-button
                        :enable="index !== 0"
                        class="item__icon"
                        :iconPath="require('@/assets/icons/_arrow-up.svg')"
                        @click.stop="moveUp(index)"
                    ></icon-svg-button>
                    <icon-svg-button
                        :enable="index < items.length - 1"
                        class="item__icon"
                        :iconPath="require('@/assets/icons/_arrow-down.svg')"
                        @click.stop="moveDown(index)"
                    ></icon-svg-button>
                    <icon-svg-button
                        class="item__icon"
                        :iconPath="
                            item.visible ? require('@/assets/icons/_eye.svg') : require('@/assets/icons/_eye-off.svg')
                        "
                        @click.stop="toggleVisible(index)"
                    ></icon-svg-button>
                </div>
            </li>
        </transition-group>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    padding: 5px;
    .list {
        &__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2px 15px;
            border-radius: 5px;

            &:hover {
                background-color: var(--background__color--hover);
            }
            &:active {
                background-color: var(--background__color--active);
            }

            .item__text {
                flex: 1 0 0%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .item__icons {
                flex: 0 0 auto;
            }
        }
    }
}
.flip-list-move {
    transition: transform 0.8s ease;
}
</style>
