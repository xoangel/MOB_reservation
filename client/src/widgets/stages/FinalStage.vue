<script setup lang="ts">
import { formatDate, getAssetPath } from '@/core/helpers';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
//uses
const appStore = useAppStore();

//data
const { stagesDataStored } = storeToRefs(appStore);
</script>

<template>
    <div class="w-full flex flex-col gap-2.5">
        <div class="flex flex-col items-center bg-green-100 p-2 pt-3">
            <p class="text-lg text-gray-700 font-bold font-raleway">Информация</p>
            <p class="text-sm text-gray-900">{{ formatDate(stagesDataStored[0].date) }} в 12:00 вам необходимо будет
                прибыть по адресу <a href="https://2gis.ru/irkutsk/firm/70000001059097053"
                    class="text-sky-400 underline font-semibold">пос. Хужир, Ольхонский район, Народная улица,
                    22.</a><br><span class="font-semibold">Питание включено в стоимость экскурсии</span>, но по
                необходимости можете взять с собой перекус</p>
        </div>
        <div class="w-full relative">
            <iframe class="rounded-b-xl" :src="stagesDataStored[1].map" width="100%" height="556"
                frameborder="0"></iframe>
            <div class="data absolute left-2 bottom-2 rounded-lg flex flex-col gap-4">
                <div class="flex justify-between p-2.5">
                    <div class="flex flex-col gap-3">
                        <span class="py-1 px-4 text-base bg-green-400 rounded-full text-center"> {{
                            formatDate(stagesDataStored[0].date) }} | Оплачено</span>
                        <div>
                            <p class="text-base font-bold text-white font-semibold">Экскурсия на {{ stagesDataStored[1].tripName }} |
                                {{
                                    stagesDataStored[2].transportName }}</p>
                            <p class="text-sm font-bold text-white px-2">{{ stagesDataStored[0].persons }} человек</p>
                        </div>
                    </div>
                    <img :src="'/mountain.svg'" class="w-14" alt="">
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
.data {
    width: calc(100% - 16px);
    background-color: #082f498a;
    backdrop-filter: blur(44px);
    border-top: 1px solid var(--white-color);
    border-left: 1px solid var(--white-color);
}
</style>