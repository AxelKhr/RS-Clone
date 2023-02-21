<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'settings-item',
    props: {
        titleParam: {
            type: String,
        },
        valueParam: {
            type: String,
        },
        isDrop: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    setup(props, context) {
        const dropBox = ref<HTMLElement>();
        function toggleDrop() {
            context.emit('update:isDrop', !props.isDrop);
        }
        function enter(elem: HTMLElement) {
            dropAnimation(elem, false);
        }
        function leave(elem: HTMLElement) {
            dropAnimation(elem, true);
        }
        function dropAnimation(elem: HTMLElement, reverse: boolean) {
            dropBox.value?.animate([{ height: '0' }, { height: `${elem.offsetHeight}px` }], {
                duration: 250,
                iterations: 1,
                direction: reverse ? 'reverse' : 'normal',
            });
        }
        return { dropBox, toggleDrop, enter, leave };
    },
});
</script>

<template>
    <div class="settings-item">
        <div class="settings-item__line" @click="toggleDrop()">
            <p class="settings-item__text">{{ titleParam }}</p>
            <p class="settings-item__text">{{ valueParam }}</p>
        </div>
        <div ref="dropBox" class="drop-box">
            <transition name="drop" @enter="enter" @leave="leave">
                <div class="test" v-if="isDrop">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings-item {
    .settings-item {
        &__line {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            border-radius: 5px;
            &:hover {
                background-color: var(--background__color--hover);
                cursor: pointer;
            }
            &:active {
                background-color: var(--background__color--active);
            }
        }
        &__text {
            font-size: 1rem;
        }
    }
    .drop-box {
        overflow: hidden;
    }

    .drop-enter-from,
    .drop-leave-to {
        transform: translateY(-100%);
    }
    .drop-enter-active,
    .drop-leave-active {
        transition: all 0.2s linear;
    }
}
</style>
