<script setup lang="ts">
import { shallowRef } from 'vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import CurrentTravel from '@/widgets/CurrentTravel.vue';
import ContactsDrawer from "@/widgets/ContactsDrawer.vue";
import TransferButton from '@/ui/TransferButton.vue';
import ReserveStages from '@/widgets/ReserveStages.vue';
import DateStage from '@/widgets/stages/DateStage.vue';
import DirectionStage from '@/widgets/stages/DirectionStage.vue';
import VehicleStage from '@/widgets/stages/VehicleStage.vue';
import PaymentStage from "@/widgets/stages/PaymentStage.vue";
import FinalStage from '@/widgets/stages/FinalStage.vue';
const appStore = useAppStore();
const { visibleStage } = storeToRefs(appStore);
const components = shallowRef([
    DateStage,
    DirectionStage,
    VehicleStage,
    PaymentStage,
    FinalStage
]);
</script>

<template>
    <ReserveStages />
    <Transition name="fade-down" mode="out-in">
        <component :is="components[visibleStage]" />
    </Transition>
    <Transition name="staggerY">
        <CurrentTravel v-if="appStore.activeStage > 0 && appStore.visibleStage < 3" />
        <div v-else class="flex items-center gap-2 my-2 fixed bottom-2"
            style="width: calc(100% - 20px);max-width: 700px;">
            <ContactsDrawer />
            <TransferButton />
        </div>
    </Transition>
</template>