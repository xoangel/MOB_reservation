<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderComponent from '@/ui/HeaderComponent.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

onMounted(()=>{
  appStore.loadActiveStage();
})
</script>

<template>
  <HeaderComponent @click="appStore.reloadAppState()" />
  <router-view />
</template>
