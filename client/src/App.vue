<script setup lang="ts">
import HeaderComponent from './ui/HeaderComponent.vue';


</script>

<template>
  <HeaderComponent />
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
