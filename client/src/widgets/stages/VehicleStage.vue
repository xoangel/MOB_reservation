<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ApiService from "@/core/ApiService.ts";
import { Vehicle } from '@/core/types';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { getAssetPath } from '@/core/helpers';
import type { AxiosResponse } from 'axios';
import { Divider } from "primevue";
import StageTitle from '@/ui/StageTitle.vue';
import Typed from 'typed.js';

const appStore = useAppStore();
const { loading, stagesDataStored, activeStage } = storeToRefs(appStore);
const vehicles = ref<Vehicle[]>([]);
const vehiclesDisplay = computed(() => vehicles.value.filter((el: Vehicle) => el.documentId !== seletedVehicle.value?.documentId))
const seletedVehicle = ref<Vehicle>();

let titleText: Typed;
let descText: Typed;

const getVehicles = async (): Promise<void> => {
    try {
        loading.value = true;
        const response: AxiosResponse<Vehicle> = await ApiService.get('/api/vehicles?populate=*');
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
    titleText.reset(true);
    descText.reset(true)
};

const confirm = () => {
    const data = {
        transportId: seletedVehicle.value.documentId,
        transportName: seletedVehicle.value.name,
        price: seletedVehicle.value.price
    }

    stagesDataStored.value[activeStage.value] = data;
    appStore.nextStage();
}

const initText = () => {
    titleText = new Typed(".vehicle-title", {
        strings: [seletedVehicle.value.name],
        typeSpeed: 50,
        showCursor: false
    })

    descText = new Typed(".vehicle-description", {
        strings: [seletedVehicle.value.description],
        typeSpeed: 2,
        showCursor: false
    })
}

onMounted(async () => {
    await getVehicles();
})

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите транспорт" :index="3" />
        <div class="w-full">
            <div class="relative w-full aspect-video rounded-xl border border-solid border-neutral-100 overflow-hidden">
                <img :src="getAssetPath(seletedVehicle?.photo[0]?.url)"
                    class="h-full absolute top-1/2 left-1/2 translate-center" alt="vehicle">
                <div class="absolute top-2 left-2">
                    <h1 class="vehicle-title font-raleway text-4xl font-semibold"></h1>
                </div>
            </div>
            <div class="w-full min-h-20">
                <p class="vehicle-description font-raleway text-white text-sm text-left mt-1"></p>
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
                <p class="text-base text-white font-medium">{{ seletedVehicle.price }} руб/чел</p>
            </div>
        </div>
        <h2 class="text-neutral-100 text-lg font-raleway font-medium leading-none">Доступный транспорт:</h2>
        <TransitionGroup tag="div" name="fade-list" class="flex flex-col gap-1.5 w-full relative flex-wrap"
            :style="`height: ${(vehiclesDisplay.length - 1) * 192 + (vehiclesDisplay.length - 1) * 64}px;`">
            <div v-for="(vehicle, idx) in vehiclesDisplay" :key="vehicle.documentId"
                class="absolute left-0 flex justify-between w-full h-48 rounded-xl border border-solid border-neutral-100 shadow-xl"
                @click="select(vehicle)"
                :style="`background: linear-gradient(to bottom, #2F2F2F8a, #2F2F2F00), center / cover no-repeat url(${getAssetPath(vehicle.photo[0]?.url)}); top: ${idx * 64}px;`">
                <!-- <div class="w-full h-full rounded-xl absolute left-0 top-0" style="background: linear-gradient(0deg, #2f2f2f32, #2f2f2f00);"></div> -->
                <p class="text-neutral-100 font-raleway font-semibold absolute left-2 top-2 text-4xl">{{ vehicle.name }}
                </p>
                <p class="text-neutral-100 absolute right-2 top-2 text-2xl">{{ seletedVehicle.price }} руб/чел</p>
            </div>
        </TransitionGroup>
        <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2 mt-4"
            @click="confirm">
            <p>Продолжить</p>
            <i class="pi pi-angle-right"></i>
        </button>
    </div>

</template>