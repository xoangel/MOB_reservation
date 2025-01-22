<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app';

const appStore = useAppStore();
const {stages, activeStage} = storeToRefs(appStore);
</script>

<template>
<div class="flex items-center justify-center gap-1 w-full m-auto mt-6 mb-10">
    <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="flex items-center gap-1"
        :class="{'w-full': idx < stages.length - 1}"
    >
        <div 
            class="stage relative min-w-7 h-7 flex items-center justify-center rounded-full"
            :class="{'stage__passed': idx <= activeStage}"
        >
            <span class="leading-none">{{ idx + 1 }}</span>
        <p 
            v-if="idx === activeStage"
            class="absolute left-1/2 top-8 font-medium text-xs text-center" 
            :style="idx === 0 ? '' : 'transform: translateX(-50%);'"
        >
            {{ stage }}
        </p>
        </div>
        <span
            v-if="idx < stages.length - 1" 
            class="line w-full h-1 rounded-full" 
            :class="{
                'line__active': idx === activeStage,
                'line__passed': idx < activeStage,
            }"
        />

    </div>
</div>
</template>

<style lang="scss" scoped>
.stage{
    border: 1px solid var(--cyan-color);
    color: var(--silver-color);
    background-color: #3E92CC50;

    &__passed{
        border: none;
        color: var(--white-color);
        background: var(--blue-color);
    }
}

.line{
    background: var(--cyan-color);

    &__passed{
        background: var(--blue-color);
    }
    &__active{
        background: linear-gradient(90deg, var(--blue-color) 0%, var(--cyan-color) 100%);
    }
}
</style>