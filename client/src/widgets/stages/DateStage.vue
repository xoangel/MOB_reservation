<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker, InputNumber } from 'primevue';
import { formatDate } from '../../core/helpers';
import StageTitle from './../../ui/StageTitle.vue';

const date = ref<Date | Date[] | (Date | null)[] | null | undefined>(new Date());
const peopleCount = ref<number>(1);
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Выберите дату" :index="1" />
        <div class="flex flex-col gap-2.5">
            <DatePicker v-model="date" inline showWeek :showOtherMonths="false" class="w-full sm:w-[30rem]"
                :min-date="new Date()" />
            <div class="flex flex-col items-end justify-center gap-1 w-full h-20 rounded-xl">
                <div class="flex items-center justify-between py-1 px-2 h-full w-full">
                    <p class="text-sm text-zinc-200 font-light">Выбраная дата: </p>
                    <p class="text-base">{{ formatDate(date as Date) }}</p>
                </div>
                <span class="h-1 w-full rounded-full bg-zinc-100"></span>
                <div class="flex items-center justify-between gap-2.5 py-1 px-2 h-full w-full">
                    <p class="text-sm text-zinc-200 font-light">Количество человек: </p>
                    <InputNumber v-model="peopleCount" showButtons size="small" :min="1" :max="50" />
                </div>
            </div>
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

.p-inputnumber-button:active{
    background: var(--blue-color) !important;
}

.p-inputnumber-button:hover{
    background: var(--silver-color) !important;

}
</style>