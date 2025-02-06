<script setup lang="ts">
defineProps({
  index: Number,
  title: String,
});
</script>

<template>
  <div class="flex gap-2.5">
    <div class="flex items-center gap-2.5">
      <span
        class="w-7 h-7 flex items-center justify-center rounded-full bg-[#0EA5E9] text-zinc-100"
        >{{ index }}</span
      >
      <h1 class="text-xl text-zinc-100 font-raleway font-semibold">{{ title }}</h1>
    </div>
  </div>
</template>
