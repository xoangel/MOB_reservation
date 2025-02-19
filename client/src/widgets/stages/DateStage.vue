<script setup lang="ts">
import { DatePicker, InputNumber } from 'primevue';
import { formatDate } from '@/core/helpers';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import StageTitle from '@/ui/StageTitle.vue';

const appStore = useAppStore();
const { stagesDataStored } = storeToRefs(appStore);

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите дату" :index="1" />
        <div class="flex flex-col gap-2.5">
            <DatePicker v-model="stagesDataStored[0].date" inline showWeek :showOtherMonths="false"
                class="w-full sm:w-[30rem]" :min-date="new Date()" :max-date="new Date('04.01.2025')" />
            <div class="flex flex-col items-end justify-center gap-1 w-full h-20 rounded-xl">
                <div class="flex items-center justify-between py-1 px-2 h-full w-full">
                    <p class="text-sm text-zinc-200 font-light">Выбраная дата: </p>
                    <p class="text-base">{{ formatDate(stagesDataStored[0].date as Date) }}</p>
                </div>
                <!-- <span class="h-1 w-full rounded-full bg-zinc-100"></span> -->
                <div class="flex items-center justify-between gap-2.5 py-1 px-2 h-full w-full">
                    <p class="text-sm text-zinc-200 font-light" @click="appStore.nextStage">Количество человек: </p>
                    <InputNumber v-model="stagesDataStored[0].persons" showButtons size="small" :min="1" :max="50" />
                </div>
            </div>
            <button class="flex w-full items-center justify-center gap-2 rounded-lg g-button px-4 py-2 mt-4"
                @click="appStore.nextStage">
                <p>Продолжить</p>
                <i class="pi pi-angle-right"></i>
            </button>
        </div>


    </div>
</template>

<style lang="scss">
.p-datepicker-header {
    background: none !important;
    border-block-end: 1px solid var(--white-color) !important;
}

.p-datepicker-header :where(.p-button-text.p-button-secondary:not(:disabled):hover, .p-datepicker-select-month:enabled:hover, .p-datepicker-select-year:enabled:hover) {
    background: var(--silver-color) !important;
    color: var(--blue-color) !important;
}

.p-datepicker-panel {
    background: #F5F5F512 !important;
    border: 1px solid var(--white-color) !important;
    backdrop-filter: blur(4px) !important;
    border-radius: 12px !important;
}

.p-datepicker-day-selected {
    background: var(--blue-color) !important;
    color: var(--white-color) !important;
}

.p-datepicker-day:not(.p-datepicker-day-selected):not(.p-disabled):hover {
    background: var(--silver-color) !important;
    color: var(--blue-color) !important;
}

.p-datepicker-today .p-datepicker-day {
    background: #3E92CC50 !important;

    &.p-datepicker-day-selected {
        background: var(--blue-color) !important;
        color: var(--white-color) !important;
    }
}

.p-datepicker-day-selected {
    outline: 1px solid var(--cyan-color) !important;
}


.p-inputtext {
    background: #F5F5F512 !important;
    border: 1px solid var(--silver-color) !important;
}

.p-inputtext:enabled:focus {
    border: 1px solid var(--white-color) !important;
}

.p-inputnumber-button:active {
    background: var(--blue-color) !important;
}

.p-inputnumber-button:hover {
    background: var(--silver-color) !important;

}
</style>