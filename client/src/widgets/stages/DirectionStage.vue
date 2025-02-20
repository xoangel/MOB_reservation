<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAssetPath } from '@/core/helpers';
import { Trip } from "@/core/types";
import { Button } from 'primevue';
import { Divider, Skeleton, Galleria } from 'primevue';
import StageTitle from '@/ui/StageTitle.vue';
import ApiService from "@/core/ApiService";
import type { AxiosResponse } from 'axios';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

const trips = ref<Trip[]>([]);
const tripsDisplay = ref<Trip[]>([]);
const isDetailedView = ref<boolean>(false);
const showInfo = ref<boolean>(false);
const showMap = ref<boolean>(false);
const seletedTrip = ref();
const images = computed(() => seletedTrip.value.photo)
const appStore = useAppStore();
const { stagesDataStored, loading } = storeToRefs(appStore);

const getTrips = async (): Promise<void> => {
    try {
        loading.value = true;
        const response: AxiosResponse<{ data: Trip[] }> = await ApiService.get('/api/trips?populate=*');
        trips.value = tripsDisplay.value = response?.data?.data;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
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

const confirm = () => {
    stagesDataStored.value[1].tripId = seletedTrip.value.documentId;
    stagesDataStored.value[1].tripName = seletedTrip.value.title;
    stagesDataStored.value[1].tripPhoto = seletedTrip.value.photo[0].url;
    stagesDataStored.value[1].map = seletedTrip.value.map;
    appStore.nextStage();
}


getTrips();
</script>

<template>
    <div v-if="loading" class="w-full flex flex-col gap-5 pt-5">
        <Skeleton width="100%" height="208px"></Skeleton>
        <Skeleton width="100%" height="208px"></Skeleton>
    </div>
    <div v-else class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите направление" :index="2" />
        <div class="flex flex-wrap w-full gap-2">
            <TransitionGroup name="staggerY">
                <div v-for="trip in trips" :key="trip.documentId"
                    class="trip relative w-full h-52 rounded-xl border border-solid border-neutral-100 overflow-hidden transition-all duration-300 ease-out"
                    :class="{ '!h-12': isDetailedView && trip.documentId !== seletedTrip.documentId }"
                    @click="select(trip.documentId)">
                    <img class="w-full absolute top-0 left-0" :src="getAssetPath(trip.photo[0].url)" alt="trip">
                    <div class="gradient-underlay absolute bottom-0 left-0 w-full pl-3 pb-3 h-12 flex items-end">
                        <h2 class="text-xl text-zinc-100 font-medium font-raleway leading-none">{{ trip.title }}</h2>
                    </div>
                </div>
            </TransitionGroup>
        </div>
        <Transition name="fade" mode="out-in">
            <div v-if="showInfo && !showMap"
                class="w-full rounded-xl border border-solid border-neutral-100 bg-transparent-white p-2.5">
                <div class="flex w-full flex-wrap gap-2.5 items-center px-2 pt-2">
                    <div v-if="seletedTrip.title"
                        class="flex items-center gap-1.5 rounded-full border border-solid border-neutral-50 blurred px-4 w-max py-2">
                        <i class="pi pi-compass text-slate-300" style="font-size: 16px;"></i>
                        <p class="text-base text-slate-300 font-semibold leading-none">{{ seletedTrip.title }}</p>
                    </div>
                    <div v-if="seletedTrip.duration"
                        class="flex items-center gap-1.5 rounded-full border border-solid border-neutral-50 blurred px-4 w-max py-2">
                        <i class="pi pi-clock text-slate-300" style="font-size: 16px;"></i>
                        <p class="text-base text-slate-300 font-semibold leading-none">{{ seletedTrip.duration }} ч</p>
                    </div>
                    <div v-if="seletedTrip.distance"
                        class="flex items-center gap-1.5 rounded-full border border-solid border-neutral-50 blurred px-4 w-max py-2">
                        <i class="pi pi-map-marker text-slate-300" style="font-size: 16px;"></i>
                        <p class=" text-base text-slate-300 font-semibold leading-none">{{ seletedTrip.distance }} км
                        </p>
                    </div>
                    <div class="flex items-center gap-1.5 rounded-full border border-solid border-neutral-50 blurred px-4 w-max py-2">
                        <img src="/dish.svg" class="w-5" alt="">
                        <p class=" text-base text-slate-300 font-semibold leading-none">Питание включено в стоимость
                        </p>
                    </div>
                    <button
                        class="flex items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2"
                        @click="showMap = true">
                        <i class="pi pi-map"></i>
                        <p>Карта маршрута</p>
                    </button>
                </div>
                <Divider />
                <Galleria v-if="images.length > 1" :value="images" :numVisible="5" :circular="true" :showItemNavigators="true" containerStyle="width: 100%;">
                    <template #item="slotProps">
                        <img :src="getAssetPath(slotProps.item.url)" alt="photo" style="width: 100%" />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="getAssetPath(slotProps.item.formats.thumbnail.url)" :alt="slotProps.item.alt" />
                    </template>
                </Galleria>
                <p class="text-zinc-100 pt-2.5">{{ seletedTrip.description }}</p>
                <button
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2 mt-4"
                    @click="confirm">
                    <i class="pi pi-check"></i>
                    <p>Выбрать {{ seletedTrip.title.toLowerCase() }}</p>
                </button>
            </div>
            <div v-else-if="showMap" class="w-full relative">
                <Button label="Назад" severity="info" icon="pi pi-arrow-left" raised class="absolute left-3 top-14"
                    @click="showMap = false"></Button>
                <iframe class="rounded-xl border border-solid border-neutral-100" :src="seletedTrip.map" width="100%"
                    height="556" frameborder="0"></iframe>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.gradient-underlay {
    background: linear-gradient(180deg, transparent 0%, #2F2F2F8a);
}
</style>