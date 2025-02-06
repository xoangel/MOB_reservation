<template>
    <Teleport to="body">
      <Transition name="fade">
        <div
            v-if="visible"
            class="drawer_overlay w-full h-full absolute left-0 top-0 bottom-0"
            @click="close"
        />
      </Transition>
      <Transition name="swipe-up">
        <div
            class="drawer_template"
            :style="`transform: translateY(${offsetY < 0 ? 0 : offsetY}px);`"
            v-if="visible"
        >
          <div
              :class="`drawer_template__wrapper h-full ${className}`"
              :style="`max-height: ${maxHeight || '95svh'} !important;
              transform: translateY(${offsetY < 0 ? offsetY : 0}px);
              min-height: ${height || 'auto'};
              `"
          >
            <div
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
              <div class="bolt">
                <span class="bolt__elem" />
              </div>
              <div
                  v-if="$slots.title"
                  class="drawer_template__header flex items-center"
              >
                <slot name="title"></slot>
                <i @click="close" class="ki-cross ki-outline text-xl text-gray-400 ml-auto" />
              </div>
              <i v-else @click="close" class="ki-cross ki-outline text-xl text-gray-400 absolute right-3 top-3" />
            </div>
  
            <div class="drawer_template__body mt-2.5 h-full">
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import {defineExpose, defineProps, defineEmits, ref } from "vue";  
  
  const visible = ref<boolean>(false);
  const startY = ref<number>(0);
  const offsetY = ref<number>(0);
  
  defineProps({
    maxHeight: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false,
      default: "60vh"
    },
    className: {
      type: String,
      required: false
    }
  });
  const emit = defineEmits(['opened', 'closed']);
  const toggle = () => {
    visible.value = !visible.value;
    visible.value ? emit('opened') : emit('closed')
  };
  
  const open = () => {
    visible.value = true;
    emit('opened');
  }
  
  const close = () => {
    visible.value = false;
    offsetY.value = 0;
    emit('closed');
  }
  
  const handleTouchStart = (event: TouchEvent) => {
    startY.value = event.touches[0].clientY;
  };
  
  const handleTouchMove = (event: TouchEvent) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY.value;
  
    deltaY > 0 ? offsetY.value = deltaY : offsetY.value = Math.max(deltaY / 3, -100);
  };
  
  const handleTouchEnd = () => {
    if (offsetY.value > 50) {
      close();
    } else {
      offsetY.value = 0;
    }
  };
  
  defineExpose({ toggle, open, close });
  
  </script>
  
  
  <style lang="scss">
    body:has(.drawer_overlay.enabled){
      overflow: hidden;
    }
    .bolt{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px 0;
      z-index: 9999;
      touch-action: none;
    }
  
    .bolt__elem{
      display: block;
      width: 36px;
      height: 5px;
      border-radius: 50px;
      background-color: #c7c7c7;
      touch-action: none;
    }
  
  
    .drawer_overlay{
      background: #77777777;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 9998;
    }
    .drawer_template{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: white;
      border-radius: 15px 15px 0 0;
      z-index: 9998;
  
      //transition: transform .3s ease-out, opacity 0.35s ease;
  
      &__wrapper{
        overflow-y: auto;
        background: white;
        padding:  0 15px 17px 15px;
        border-radius: 15px 15px 0 0;
        min-height: 150px;
        max-height: 95svh;
        transition: transform .3s ease-out;
      }
    }
  </style>