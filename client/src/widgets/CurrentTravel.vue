<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { formatDate } from '@/core/helpers';
import { Vue3Lottie } from 'vue3-lottie';
import gradient from "@/assets/lottie/gradient.json";

// elements
const currentTravel = ref<HTMLElement | null>(null);
const containerWidth = ref<number>(350);

// uses
const appStore = useAppStore();
const { activeStage, stagesDataStored } = storeToRefs(appStore);

const updateWidth = () => {
  if (currentTravel.value) {
    containerWidth.value = currentTravel.value.clientWidth;
  }
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div ref="currentTravel" class="current_travel_container fixed bottom-2 w-full">
    <div class="relative w-full h-full">
      <div class="current_travel rounded-2xl flex flex-col gap-2 p-2">
        <p class="font-raleway text-lg">Текущее бронирование</p>
        <div class="flex gap-2 w-full">
          <div class="h-full w-full text-neutral-100 text-sm">
            <Transition name="staggerY">
              <p class="inline mr-1" v-if="activeStage > 0">
                Экскурсия <span class="underline font-semibold">{{ formatDate(stagesDataStored[0].date) }}</span> 
                из <span class="underline font-semibold">{{ stagesDataStored[0].persons }} человек(-а)</span>
              </p>
            </Transition>
            <Transition name="staggerY">
              <p class="inline mr-1" v-if="activeStage > 1">
                на <span class="underline font-semibold">{{ stagesDataStored[1].tripName }}.</span>
              </p>
            </Transition>
            <Transition name="staggerY">
              <p class="inline mr-1" v-if="activeStage > 2">
                Транспорт - <span class="underline font-semibold">{{ stagesDataStored[2].transportName }}.</span>
              </p>
            </Transition>
          </div>
          <img src="/mountain.svg" class="h-16" alt="" />
        </div>
      </div>
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[-1]">
        <Vue3Lottie :animation-data="gradient" :loop="true" :width="containerWidth" :height="120" :speed="2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.current_travel {
  background-color: #082f498a;
  backdrop-filter: blur(44px);
  border-top: 1px solid var(--white-color);
  border-left: 1px solid var(--white-color);
}

.current_travel_container {
  width: calc(100% - 20px);
  max-width: 700px;
}
</style>
