<script setup lang="ts">
import { shallowRef } from 'vue';
import { useAppStore } from '@/stores/app';
import ReserveStages from '@/widgets/ReserveStages.vue';
import DateStage from '@/widgets/stages/DateStage.vue';
import DirectionStage from '@/widgets/stages/DirectionStage.vue';
import VehicleStage from '@/widgets/stages/VehicleStage.vue';
import PaymentStage from "@/widgets/stages/PaymentStage.vue";
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { visibleStage } = storeToRefs(appStore);
const components = shallowRef([
    DateStage,
    DirectionStage,
    VehicleStage,
    PaymentStage
]);
</script>

<template>
    <ReserveStages />
    <Transition name="fade-down" mode="out-in">
        <component :is="components[visibleStage]" />
    </Transition>
</template>