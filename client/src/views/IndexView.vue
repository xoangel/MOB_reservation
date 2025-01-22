<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useAppStore } from '../stores/app';
import ReserveStages from '../widgets/ReserveStages.vue';
import DateStage from '../ui/stages/DateStage.vue';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { activeStage } = storeToRefs(appStore);
const components = shallowRef([
    DateStage
])
</script>

<template>
    <ReserveStages />
    <Transition name="fade">
        <component :is="components[activeStage]" />
    </Transition>
</template>