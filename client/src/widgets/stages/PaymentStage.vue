<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { validateEmail } from '@/core/helpers';
import { InputText, InputMask, Message, Button } from "primevue";
import StageTitle from '@/ui/StageTitle.vue';
import ApiService from '@/core/ApiService';

//uses
const appStore = useAppStore();

//data
const name = ref<string>("");
const surname = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const { stagesDataStored } = storeToRefs(appStore);

//service data
const validEmail = ref<boolean>(true);
const validateForm = computed(() => name.value && surname.value && phone.value && phone.value.length === 11);

const confirm = async () => {
    validEmail.value = validateEmail(email.value);
    if (!validEmail.value) return;

    try {
        return await ApiService.post('/api/reservations', {
            data: {
                person: name.value + ' ' + surname.value,
                count: stagesDataStored.value[0].persons,
                email: email.value,
                phone: phone.value,
                date: stagesDataStored.value[0].date,
                trip: stagesDataStored.value[1].tripId,
                vehicle: stagesDataStored.value[2].transportId
            }

        })
    } catch (e) {
        console.error(e)
    }
}

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Внесите предоплату" :index="4" />
        <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col gap-2 w-full">
                <label for="username">Имя*</label>
                <InputText id="username" v-model="name" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="surname">Фамилия*</label>
                <InputText id="surname" v-model="surname" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="email">Email*</label>
                <InputText id="email" v-model="email" placeholder="me@mail.ru" aria-describedby="username-help"
                    :invalid="!validEmail" />
                <Message v-if="!validEmail" size="small" severity="error" variant="simple">Такого адреса не существует
                </Message>
                <Message size="small" severity="secondary" variant="simple">Вводите существующий почтовый адрес, на него
                    придет подтверждение брони</Message>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="phone">Номер телефона*</label>
                <InputMask id="phone" v-model="phone" placeholder="+7 (999) 999-9999" mask="+7 (999) 999-9999"
                    aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-4 border border-dashed border-neutral-100 p-2.5 rounded-xl blurred mt-6">
                <p class="text-white text-sm tetxt-medium">Внимательно проверьте всю информацию перед подтверждением</p>
                <div class="flex items-center justify-between gap-7 w-full">
                    <div class="flex gap-2 items-center">
                        <i class="pi pi-info-circle text-xl text-gray-400"></i>
                        <p class="text-base text-white font-semibold">Экскурсия</p>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <span class="w-full border-t border-dashed border-neutral-100"></span>
                <div class="flex items-center justify-between gap-7 w-full">
                    <div class="flex gap-2 items-center">
                        <i class="pi pi-credit-card text-xl text-gray-400"></i>
                        <p class="text-base text-white font-semibold">Сумма</p>
                    </div>
                    <p>{{ stagesDataStored[2].price }} * {{ stagesDataStored[0].persons }} = <span>{{
                        stagesDataStored[2].price *stagesDataStored[0].persons }} руб.</span> </p>
                </div>
            </div>
            <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2 mt-4"
                @click="confirm">
                <p>Продолжить</p>
                <i class="pi pi-angle-right"></i>
            </button>
        </div>
    </div>
</template>