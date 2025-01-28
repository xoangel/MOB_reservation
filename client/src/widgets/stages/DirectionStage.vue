<script setup lang="ts">
import { ref } from 'vue';
import { getAssetPath } from '@/core/helpers';
import { Trip } from "@/core/types";
import { Button } from 'primevue';
import { Divider } from 'primevue';
import StageTitle from '@/ui/StageTitle.vue';
import ApiService from "@/core/ApiService.ts";
import type { AxiosResponse } from 'axios';
import anime from "animejs";

const trips = ref<Trip[]>([]);
const tripsDisplay = ref<Trip[]>([]);
const isDetailedView = ref<boolean>(false);
const showInfo = ref<boolean>(false);
const showMap = ref<boolean>(false);
const seletedTrip = ref();

const getTrips = async (): Promise<void> => {
    try {
        const response: AxiosResponse<Trip> = await ApiService.get('/api/trips?populate=*');
        trips.value = tripsDisplay.value = response?.data?.data;
    } catch (e) {
        console.error(e);
    }
}

const select = (id: string) => {
    seletedTrip.value = trips.value.find((el: Trip) => el.documentId === id);

    const index = trips.value.findIndex((el: Trip) => el.documentId === id);

    const [item] = trips.value.splice(index, 1);
    trips.value.push(item);

    isDetailedView.value = true;
    showInfo.value = true;
}


getTrips();
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите направление" :index="2" />
        <div class="flex flex-wrap w-full gap-2">
            <TransitionGroup name="staggerY">
                <div v-for="trip in trips" :key="trip.documentId"
                    class="trip relative w-full h-60 rounded-xl border border-solid border-[#F5F5F5] overflow-hidden transition-all duration-300 ease-out"
                    :class="{ '!h-12': isDetailedView && trip.documentId !== seletedTrip.documentId }"
                    @click="select(trip.documentId)"
                >
                        <img class="absolute top-0 left-0 w-full" :src="getAssetPath(trip.photo[0].url)" alt="trip">
                        <div class="gradient-underlay absolute bottom-0 left-0 w-full pl-3 pb-3">
                            <h2 class="text-xl text-zinc-100 font-medium leading-none">{{ trip.title }}</h2>
                        </div>
                </div>
            </TransitionGroup>
        </div>
        <Transition name="fade" mode="out-in">
            <div v-if="showInfo && !showMap"
                class="w-full rounded-xl border border-solid border-[#F5F5F5] bg-transparent-white p-2.5">
                <div class="flex w-full gap-3">
                    <div class="w-full flex flex-col gap-0.5">
                        <div
                            v-if="seletedTrip.title" 
                            class="flex items-center justify-between"
                        >
                            <h2 class="text-base text-white font-semibold">Направление: </h2>
                            <p class="text-base text-white">{{ seletedTrip.title }}</p>
                        </div>
                        <div
                            v-if="seletedTrip.duration" 
                            class="flex items-center justify-between"
                        >
                            <h2 class="text-base text-white font-semibold">Длительность: </h2>
                            <p class="text-base text-white">{{ seletedTrip.duration }} ч</p>
                        </div>
                        <div
                            v-if="seletedTrip.distance" 
                            class="flex items-center justify-between"
                        >
                            <h2 class="text-base text-white font-semibold">Расстояние: </h2>
                            <p class="text-base text-white">{{ seletedTrip.distance }} км</p>
                        </div>
                    </div>
                    <div class="w-full">
                        <Button label="Карта маршрута" severity="info" icon="pi pi-map" raised fluid variant="outlined" @click="showMap = true"></Button>
                    </div>
                </div>
                <Divider />
                <p class="text-zinc-100 pt-2.5">{{ seletedTrip.description }}</p>
                <Button :label="`Выбрать ${seletedTrip.title.toLowerCase()}`" severity="info" icon="pi pi-check" raised
                    fluid variant="outlined" class="mt-2.5"></Button>
            </div>
            <div v-else-if="showMap" class="w-full relative">
                <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" raised class="absolute left-3 top-14" @click="showMap = false"></Button>
                <iframe class="rounded-xl border border-solid border-[#F5F5F5]" src="https://yandex.ru/map-widget/v1/?um=constructor%3A355e2c787c3cbf345abb1f58a9b66a22a921d4379b1d230c3aac517b43570d63&amp;source=constructor" width="100%" height="556" frameborder="0"></iframe>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.gradient-underlay {
    background: linear-gradient(180deg, transparent 0%, #c7c7c707);
}
</style>