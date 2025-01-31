<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import anime from "animejs";
import { nextTick, watch } from 'vue';

const appStore = useAppStore();
const {stages, activeStage} = storeToRefs(appStore);

let gradientBox: Element;
  
let currentColors = {
    color1: "#0EA5E9",
    color2: "#BAE6FD",
};

  const updateGradient = () => (gradientBox as any).style.background = `linear-gradient(90deg, ${currentColors.color1}, ${currentColors.color2})`;

  const getGradientBox = () => {
    const lines = document.querySelectorAll(".line__passed")
    gradientBox = lines[lines.length - 1];
}

  async function animateGradient() {
    await nextTick();
    getGradientBox();
    anime({
      targets: currentColors,
      color1: "#0EA5E9",
      color2: "#0EA5E9",
      duration: 1000,
      easing: "easeInOutQuad",
      update: updateGradient,
    });
  }

  watch(activeStage, ()=>animateGradient())
</script>

<template>
<div class="flex items-center justify-center gap-1 w-full m-auto mt-6 mb-10">
    <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="flex items-center gap-1"
        :class="{'w-full': idx < stages.length - 1}"
    >
        <div 
            class="stage relative min-w-7 h-7 flex items-center justify-center rounded-full"
            :class="{'stage__passed': idx <= activeStage}"
        >
            <span class="leading-none">{{ idx + 1 }}</span>
        <p 
            v-if="idx === activeStage"
            class="absolute left-1/2 top-8 font-medium text-xs text-center" 
            :style="idx === 0 ? '' : 'transform: translateX(-50%);'"
        >
            {{ stage }}
        </p>
        </div>
        <div  v-if="idx < stages.length - 1" class="relative w-full h-1">
            <span
           
            class="line w-full h-1 rounded-full" 
            :class="{
                'line__active': idx === activeStage,
                'line__passed': idx < activeStage,
            }"
        >
        </span>
            <span class="light" />
        </div>
        

    </div>
</div>
</template>

<style lang="scss" scoped>
.stage{
    border: 1px solid var(--cyan-color);
    color: var(--silver-color);
    background-color: #3E92CC50;
    transition: all .5s .1s;

    &__passed{
        border: none;
        color: var(--white-color);
        background: var(--blue-color);
    }
}

.line{
    background: var(--cyan-color);
    display: block;
    transition: all .5s;

    // &__passed{
    //     background: linear-gradient(90deg, var(--blue-color) 0%, var(--blue-color) 100%);
    // }
    &__active{
        background: linear-gradient(90deg, var(--blue-color) 0%, var(--cyan-color) 100%);
    }
}

.light{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 10px;
        height: 4px;
        border-radius: 9999px;
        opacity: 0;
        box-shadow: 0px 0px 8px 4px var(--white-color); 
        background: #f5f5f580;  
    }

    @keyframes translateLight {
        0%{
            opacity: 0;
            left: 0;
            box-shadow: 0px 0px 8px 4px var(--white-color);
        }

        50%{
            opacity: .8;
            left: 50%;
            box-shadow: 0px 0px 12px 6px var(--white-color);;
        }

        80%{
            opacity: 1;
            left: 100%;
            box-shadow: 0px 0px 24px 6px var(--white-color);    
        }

        100%{
            opacity: 0;
            left: 100%;
            box-shadow: 0px 0px 8px 4px var(--white-color);
        }
    }

    .line__passed + .light{
        animation: translateLight 1s ease-out forwards;
    }
</style>