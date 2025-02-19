<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ApiService from "@/core/ApiService";
import { Vehicle } from '@/core/types';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { getAssetPath, calcFullCost } from '@/core/helpers';
import type { AxiosResponse } from 'axios';
import { Divider, Skeleton } from "primevue";
import StageTitle from '@/ui/StageTitle.vue';
import Typed from 'typed.js';

const appStore = useAppStore();
const { loading, stagesDataStored } = storeToRefs(appStore);
const vehicles = ref<Vehicle[]>([]);
const vehiclesDisplay = computed(() => vehicles.value.filter((el: Vehicle) => el.documentId !== seletedVehicle.value?.documentId))
const seletedVehicle = ref<Vehicle>();

const getVehicles = async (): Promise<void> => {
    try {
        loading.value = true;
        const response: AxiosResponse<{ data: Vehicle[] }> = await ApiService.get('/api/vehicles?populate=*');
        vehicles.value = response?.data?.data;
        seletedVehicle.value = vehicles.value[0];
        if (seletedVehicle.value) initText();
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}

const select = (vehicle: Vehicle) => {
    seletedVehicle.value = vehicle;
    initText();
};

const confirm = () => {
    let data = {}
    if (seletedVehicle.value) {
        data = {
            transportId: seletedVehicle.value.documentId,
            transportName: seletedVehicle.value.name,
            price: seletedVehicle.value.price
        }
    }

    stagesDataStored.value[2] = data;
    appStore.nextStage();
}

const initText = () => {
    new Typed(".vehicle-title", {
        strings: [seletedVehicle.value?.name || ''],
        typeSpeed: 50,
        showCursor: false
    })
}

onMounted(async () => {
    await getVehicles();
    initText();
})

</script>

<template>
    <div v-if="loading" class="w-full flex flex-col gap-2 pt-5">
        <Skeleton width="100%" height="228px"></Skeleton>
        <Skeleton width="100%" height="16px"></Skeleton>
        <Skeleton width="100%" height="16px"></Skeleton>
        <Skeleton width="100%" height="16px"></Skeleton>
        <Skeleton width="100%" height="16px"></Skeleton>
        <Skeleton width="60%" height="16px"></Skeleton>

    </div>
    <div v-else class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите транспорт" :index="3" />
        <div class="w-full">
            <div class="relative w-full aspect-video rounded-xl border border-solid border-neutral-100 overflow-hidden">
                <img :src="getAssetPath(seletedVehicle?.photo[0].url || '')" class="w-full absolute bottom-0 left-0"
                    alt="vehicle">
                <div class="gradient-underlay absolute pt-2.5 pl-4 w-full h-12 flex items-end top-0 left-0">
                    <h1 class="vehicle-title font-raleway text-4xl font-semibold"></h1>
                </div>
            </div>
            <div class="w-full min-h-20">
                <p class="font-raleway text-white text-sm text-left font-medium mt-1">{{ seletedVehicle?.description }}</p>
            </div>
        </div>
        <Divider />

        <div class="flex flex-col w-full">
            <div v-if="seletedVehicle?.people_allowed" class="flex items-center justify-between">
                <p class="text-base font-raleway text-white font-medium">Вместимость одной машины</p>
                <p class="text-base text-white font-medium">{{ seletedVehicle.people_allowed }} человек</p>
            </div>
            <div v-if="seletedVehicle?.price" class="flex items-center justify-between">
                <p class="text-base font-raleway text-white font-medium">Стоимость</p>
                <p class="text-base text-white font-medium">{{ calcFullCost(seletedVehicle.price) }} руб/чел</p>
            </div>
        </div>
        <h2 class="text-neutral-100 text-lg font-raleway font-medium leading-none">Доступный транспорт:</h2>
        <TransitionGroup tag="div" name="fade-list" class="flex flex-col gap-1.5 w-full relative flex-wrap"
            :style="`height: ${(vehiclesDisplay.length - 1) * 192 + (vehiclesDisplay.length - 1) * 64}px;`">
            <div v-for="(vehicle, idx) in vehiclesDisplay" :key="vehicle.documentId"
                class="absolute left-0 flex justify-between w-full h-48 rounded-xl border border-solid border-neutral-100 shadow-xl"
                @click="select(vehicle)"
                :style="`background: linear-gradient(to bottom, #2F2F2F8a, #2F2F2F00), center / cover no-repeat url(${getAssetPath(vehicle.photo[0]?.url)}); top: ${idx * 64}px;`">
                <p class="text-neutral-100 font-raleway font-semibold absolute left-2 top-2 text-4xl">{{ vehicle.name }}
                </p>
                <p class="text-neutral-100 absolute right-2 top-2 text-2xl">{{ calcFullCost(vehicle.price) }} руб/чел</p>
            </div>
        </TransitionGroup>
        <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2 mt-4"
            @click="confirm">
            <p>Продолжить</p>
            <i class="pi pi-angle-right"></i>
        </button>
    </div>

</template>

<style scoped lang="scss">
.gradient-underlay {
    background: linear-gradient(180deg, #2F2F2F8a 0%, transparent 100%);
}
</style>