<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ApiService from "@/core/ApiService.ts";
import type { AxiosResponse } from 'axios';
import { Vehicle } from '@/core/types';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { getAssetPath } from '@/core/helpers';
import {Button} from "primevue";
import StageTitle from '@/ui/StageTitle.vue';
import Typed from 'typed.js';

const appStore = useAppStore();
const { loading, stagesDataStored, activeStage } = storeToRefs(appStore);
const vehicles = ref<Vehicle[]>([]);
const vehiclesDisplay = computed(() => vehicles.value.filter((el: Vehicle) => el.documentId !== seletedVehicle.value?.documentId))
const seletedVehicle = ref<Vehicle>();

const getVehicles = async (): Promise<void> => {
    try {
        loading.value = true;
        const response: AxiosResponse<Vehicle> = await ApiService.get('/api/vehicles?populate=*');
        vehicles.value = response?.data?.data;
        seletedVehicle.value = vehicles.value[0];
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
    stagesDataStored.value[activeStage.value].transtortId = seletedVehicle.value.documentId;
    appStore.nextStage();
}

const initText = () => {
    new Typed(".vehicle-title", {
        strings: [seletedVehicle.value.name],
        typeSpeed: 50,
        showCursor: false
    })

    new Typed(".vehicle-description", {
        strings: [seletedVehicle.value.description],
        typeSpeed: 5,
        showCursor: false
    })
}

onMounted(() => {
    initText();
})

getVehicles();

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите транспорт" :index="3" />
        <div class="w-full">
            <div class="relative w-full h-80 rounded-xl border border-solid border-neutral-100 overflow-hidden">
                <img :src="getAssetPath(seletedVehicle?.photo[0]?.url)"
                    class="w-full absolute top-1/2 left-1/2 translate-center" alt="vehicle">
                <div class="absolute bottom-2 left-2">
                    <h1 class="vehicle-title  font-racing text-3xl"></h1>
                </div>
            </div>
            <div class="w-full min-h-20">
                <p class="vehicle-description text-white text-sm text-left mt-1"></p>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div v-if="seletedVehicle.people_allowed" class="flex items-center justify-between">
                <p class="text-base text-white font-medium">Вместимость одной машины</p>
                <p class="text-base text-white font-medium">{{ seletedVehicle.people_allowed }} человек</p>
            </div>
            <div v-if="seletedVehicle.price" class="flex items-center justify-between">
                <p class="text-base text-white font-medium">Стоимость</p>
                <p class="text-base text-white font-medium">{{ seletedVehicle.price }} руб/чел</p>
            </div>
        </div>
            <TransitionGroup tag="div" name="fade-list" class="flex gap-1.5 w-full relative">
                <div
                v-for="vehicle in vehiclesDisplay"
                :key="vehicle.documentId" 
                class="flex w-full h-20 rounded-lg border border-solid border-neutral-100 blurred shadow-md"
                @click="select(vehicle)"
            >
                <img class="rounded-lg h-full" :src="getAssetPath(vehicle.photo[0].url)" alt="">
                <div class="w-full h-full flex items-center justify-center"><p class="text-white text-sm font-semibold">{{ vehicle.name }}</p></div>
            </div>
            </TransitionGroup>
        </div>
        <Button label="Продолжить" severity="info" icon="pi pi-check" raised
            fluid class="mt-2.5" @click="confirm"></Button>
</template>