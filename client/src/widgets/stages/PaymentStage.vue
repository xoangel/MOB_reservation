<script lang="ts">
import {
    ref,
    computed
} from 'vue';
import {
    useAppStore
} from '@/stores/app';
import {
    storeToRefs
} from 'pinia';
import {
    getAssetPath,
    validateEmail,
    formatDate,
    calcFullCost
} from '@/core/helpers';
import {
    InputText,
    InputMask,
    Message
} from "primevue";
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
const pending = ref<boolean>(false);
const validEmail = ref<boolean>(true);
const validateForm = computed(() => name.value && surname.value && phone.value && phone.value.length === 11);

const confirm = async () => {
    validEmail.value = validateEmail(email.value);
    if (!validEmail.value) return;

    try {
        pending.value = true;
        // const response =  await ApiService.post('/api/reservations', {
        //     data: {
        //         person: name.value + ' ' + surname.value,
        //         count: stagesDataStored.value[0]?.persons,
        //         email: email.value,
        //         phone: phone.value,
        //         date: stagesDataStored.value[0]?.date,
        //         trip: stagesDataStored.value[1]?.tripId,
        //         vehicle: stagesDataStored.value[2]?.transportId
        //     }
        // });
        appStore.nextStage();
    } catch (e) {
        console.error(e)
    } finally {
        pending.value = false
    }
}

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full pt-2 mb-10 gap-5">
        <StageTitle title="Внесите предоплату" :index="4" />
        <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col gap-2 w-full">
                <label for="username">Имя*</label>
                <InputText id="username" v-model="name" aria-describedby="username-help" maxlength="30" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="surname">Фамилия*</label>
                <InputText id="surname" v-model="surname" aria-describedby="surname-help" maxlength="30" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="email">Email*</label>
                <InputText id="email" v-model="email" placeholder="me@mail.ru" aria-describedby="email-help"
                    :invalid="!validEmail" maxlength="50" />
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
                <div class="flex flex-col items-between justify-center gap-2.5 w-full">
                    <div class="flex gap-2 items-center px-2.5">
                        <i class="pi pi-directions text-xl text-gray-400"></i>
                        <p class="text-base text-white font-semibold">Экскурсия</p>
                    </div>
                    <div>
                        <img :src="getAssetPath(stagesDataStored[1]?.tripPhoto)" class="w-full rounded-xl" alt="">
                        <div class="flex flex-col gap-2.5 px-1.5 mt-2.5">
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Дата</p>
                                <p class="text-white text-base font-medium">{{ formatDate(stagesDataStored[0]?.date) }}
                                </p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Кол-во человек</p>
                                <p class="text-white text-base font-medium">{{ stagesDataStored[0]?.persons }} человек
                                </p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Направление</p>
                                <p class="text-white text-base font-medium">{{ stagesDataStored[1]?.tripName }}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Транспорт</p>
                                <p class="text-white text-base font-medium">{{ stagesDataStored[2]?.transportName }}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Полная стоимость</p>
                                <p class="text-white text-base font-medium">{{ calcFullCost(stagesDataStored[2]?.price)
                                    }} * {{ stagesDataStored[0]?.persons }} = <span>{{
                                        calcFullCost(stagesDataStored[2]?.price) * stagesDataStored[0]?.persons }}
                                        руб.</span> </p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-base font-semibold">Сумма предоплаты</p>
                                <p class="text-white text-base font-medium">{{ (stagesDataStored[2]?.price / 2) *
                                    stagesDataStored[0]?.persons }} руб.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="w-full border-t border-dashed border-neutral-100"></span>
                <div class="w-full flex flex-col items-center">
                    <h1 class="font-raleway font-bold m-auto">Предоплата</h1>
                    <div class="flex items-center justify-between gap-7 w-full">
                        <div class="flex gap-2 items-center">
                            <i class="pi pi-credit-card text-xl text-gray-400"></i>
                            <p class="text-base text-white font-semibold">К оплате</p>
                        </div>
                        <div class="flex flex-col gap-0.5 items-end">
                            <p>{{ (stagesDataStored[2]?.price / 2) * stagesDataStored[0]?.persons }} руб.</p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="w-full rounded-xl bg-slate-600 p-2.5 ">
                <i class="pi pi-info-circle text-xl text-red-400 float-left mr-4"></i>
                <p class="text-sm text-white">Остров Ольхон является заповедной зоной. Для посещения территорий, по
                    которым проходят наши экскурсии требуется наличие разрешения, котрое можно получить самостоятельно
                    <a href="https://baikalpass.ru/index.html#/tourists-data"
                        class=" text-sky-400 underline font-semibold">по этой ссылке</a>, либо наш гид поможет Вам это
                    сделать уже на острове!
                </p>
            </div>
            <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-100 g-button px-4 py-2 mt-4"
                @click="confirm">
                <Transition name="fade" mode="out-in">
                    <i v-if="pending" class="pi pi-spin pi-spinner text-white" style="font-size: 1.7rem"></i>
                    <div v-else class="flex items-center justify-center gap-2">
                        <p>Продолжить</p>
                        <i class="pi pi-angle-right"></i>
                    </div>
                </Transition>

            </button>
        </div>
    </div>
</template>
