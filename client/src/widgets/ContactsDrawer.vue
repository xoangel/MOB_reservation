<script setup lang="ts">
import { ref } from "vue";
import DrawerTemp from '@/ui/DrawerTemp.vue';

//elements
const contactsDrawer = ref(null);
</script>

<template>
    <button class="w-full rounded-full text-white py-2 transition-all bg-sky-400 hover:bg-sky-500 active:!bg-sky-600 active:text-white" @click="(contactsDrawer as any)?.open">
        Контакты
    </button>

    <DrawerTemp ref="contactsDrawer" class-name="!bg-sky-900" :height="'300px'">
        <template #title>
            <h1 class=" text-xl font-semibold font-raleway text-center">Контакты</h1>
        </template>
        <template #body>
            <div class="flex md:gap-8 justify-center max-[720px]:justify-between">
                <div class="flex flex-col items-start gap-3 text-white text-sm font-semibold">
                    <div class="gap-1 flex items-center">
                        <img src="/phone.svg" alt="">
                        <a target="_blank" href="tel:+79140001380">8 (914) 000-13-80</a>
                    </div>
                    <div class="gap-1 flex items-center">
                        <img src="/tg.svg" alt="">
                        <a target="_blank" href="https://t.me/call_problems">Telegram</a>
                    </div>
                    <div class="gap-1 flex items-center">
                        <img src="/wa.svg" alt="">
                        <a target="_blank" href="https://wa.me/+79140001380">What's App</a>
                    </div>

                </div>
                <div class="flex flex-col items-start justify-end gap-3">
                    <div class="gap-1 flex items-center">
                        <img src="/globe.svg" alt="">
                        <a target="_blank" href="magicofbaikal.ru">magicofbaikal.ru</a>
                    </div> 
                    <div class="gap-1 flex items-center">
                        <img src="/person.svg" alt="">
                        <p>Дулин Илья Андреевич</p>
                    </div> 

                </div>
            </div>
        </template>
    </DrawerTemp>
</template>

<style lang="scss">
.contacts_drawer {
    background: #0767d53a;
    backdrop-filter: blur(44px);
}
</style>