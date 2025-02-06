<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderComponent from '@/ui/HeaderComponent.vue';
import CurrentTravel from '@/widgets/CurrentTravel.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

onMounted(()=>{
  appStore.loadActiveStage();
})
</script>

<template>
  <HeaderComponent @click="appStore.reloadAppState()" />
  <router-view />
  <Transition name="staggerY">
      <CurrentTravel v-if="appStore.activeStage > 0" />
  </Transition>
</template>
