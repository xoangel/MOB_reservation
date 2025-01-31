<script setup lang="ts">
import { shallowRef } from 'vue';
import { useAppStore } from '@/stores/app';
import ReserveStages from '@/widgets/ReserveStages.vue';
import DateStage from '@/widgets/stages/DateStage.vue';
import DirectionStage from '@/widgets/stages/DirectionStage.vue';
import VehicleStage from '@/widgets/stages/VehicleStage.vue';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { activeStage } = storeToRefs(appStore);
const components = shallowRef([
    DateStage,
    DirectionStage,
    VehicleStage
]);
</script>

<template>
    <ReserveStages />
    <Transition name="fade" mode="out-in">
        <component :is="components[activeStage]" />
    </Transition>
</template>