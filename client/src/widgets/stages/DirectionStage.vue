<script setup lang="ts">
import { ref } from 'vue';
import { getAssetPath } from '@/core/helpers';
import { Trip } from "@/core/types"
import StageTitle from '@/ui/StageTitle.vue';
import ApiService from "@/core/ApiService.ts";
import type { AxiosResponse } from 'axios';
import anime from "animejs";

const trips = ref<Trip[]>([]);
const tripsDisplay = ref<Trip[]>([]);
const isDetailedView = ref<boolean>(false);

const getTrips = async (): Promise<void> => {
    try {
        const response: AxiosResponse<Trip> = await ApiService.get('/api/trips?populate=photo');
        trips.value = tripsDisplay.value = response?.data?.data;
    } catch (e) {
        console.error(e);
    }
}

const select = (id: string) => {
    tripsDisplay.value = trips.value.filter((el: Trip) => el.documentId === id);
    isDetailedView.value = true;
}


getTrips();
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите направление" :index="2" />
        <div class="flex flex-wrap w-full">
            <TransitionGroup name="staggerY">
                <div v-for="trip in tripsDisplay" :key="trip.documentId"
                    class="relative w-full h-80 rounded-xl border border-solid border-[#F5F5F5] overflow-hidden transition-all duration-300 ease-out"
                    :class="{ '!h-12': isDetailedView }" @click="select(trip.documentId)">
                    <img class="absolute top-0 left-0 w-full" :src="getAssetPath(trip.photo[0].url)" alt="trip">
                    <div class="gradient-underlay absolute bottom-0 left-0 w-full pl-3 pb-3">
                        <h2 class="text-2xl text-zinc-100 font-medium leading-none">{{ trip.title }}</h2>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped lang="scss">
.gradient-underlay {
    background: linear-gradient(180deg, transparent 0%, #c7c7c707);
}
</style>