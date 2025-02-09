<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import phoneJSON from "@/assets/lottie/gradient2.json";
</script>

<template>
    <div class="w-full relative ">
        <iframe class="rounded-xl"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A355e2c787c3cbf345abb1f58a9b66a22a921d4379b1d230c3aac517b43570d63&amp;source=constructor"
            width="100%" height="556" frameborder="0"></iframe>
        <div class="data h-24 absolute left-2 bottom-2 rounded-lg flex justify-start">
            <Vue3Lottie :animation-data="phoneJSON" :loop="false" :width="100" :speed="1" />
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