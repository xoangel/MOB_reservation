<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import anime from "animejs";
import { nextTick, onMounted, ref, watch } from 'vue';

//uses
const appStore = useAppStore();

//data
const { stages, activeStage } = storeToRefs(appStore);

//service data
const completed = ref<boolean>(false)
let paths: any[];
let gradientBox: Element;
let currentColors = {
    color1: "#0EA5E9",
    color2: "#BAE6FD",
};

const updateGradient = () => {
    if (gradientBox && (gradientBox as any).style) {
        (gradientBox as any).style.background = `linear-gradient(90deg, ${currentColors.color1}, ${currentColors.color2})`;
    }

}

const getGradientBox = () => {
    const lines = Array.from(document.querySelectorAll(".line__passed"));
    gradientBox = lines[lines.length - 1];
}

const tryWatchStage = (stage: number) => {
    if (stage <= activeStage.value) appStore.watchStage(stage);
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


watch(activeStage, () => animateGradient())

onMounted(() => {
    const lines = Array.from(document.querySelectorAll(".line__passed"));
    lines.map(el => (el as any).style.background = "#0EA5E9")
})


const mergeArrays = (arr1: any[], arr2: any[]) =>
    Array.from({ length: Math.max(arr1.length, arr2.length) }, (_, i) => [arr1[i], arr2[i]]).flat();

onMounted(async () => {
    await nextTick();
    paths = mergeArrays(Array.from(document.querySelectorAll('.stage')), Array.from(document.querySelectorAll('.line')))
    paths.pop();
    const animation = anime({
        targets: paths,
        translateX: function (_: Element, i: number) {
            return i * (-50);
        },
        scale: 0,
        direction: 'normal',
        loop: false,
        autoplay: false,
        delay: function (_, i) {
            return i * 50;
        },
        endDelay: function (_, i, l) {
            return (l - i) * 100;
        },
        complete: () => {
            completed.value = true;
        }
    });

    watch(activeStage, (value) => {
        if (value === 4) animation.play();
    }, {
        immediate: true
    })
})
</script>

<template>
    <div 
        class="w-full h-24"
        :class="{'!h-12': completed}"
        style="transition: all .5s ease;"
    >
        <Transition name="fade" mode="out-in">
            <div v-if="!completed" class="flex items-center justify-center gap-1 w-full m-auto mt-6 mb-10">
                <div v-for="(stage, idx) in stages" :key="idx" class="flex items-center gap-1"
                    :class="{ 'w-full': idx < stages.length - 1 }">
                    <div class="stage relative min-w-7 h-7 flex items-center justify-center rounded-full"
                        :class="{ 'stage__passed': idx <= activeStage }" @click="tryWatchStage(idx)">
                        <span class="leading-none">{{ idx + 1 }}</span>
                        <p v-if="idx === activeStage" class="absolute left-1/2 top-8 font-medium text-xs text-center"
                            :style="'transform: translateX(-50%);'">
                            {{ stage }}
                        </p>
                    </div>
                    <div v-if="idx < stages.length - 1" class="relative w-full h-1">
                        <span class="line w-full h-1 rounded-full" :class="{
                            'line__active': idx === activeStage,
                            'line__passed': idx < activeStage,
                        }">
                        </span>
                        <span class="light" />
                    </div>
                </div>
            </div>
            <div v-else class=" w-full h-10 rounded-t-xl bg-green-400 mt-6 mb-10 flex items-center justify-center">
                <h1 class="text-base font-raleway font-bold text-cyan-50">Бронирование завершено!</h1>
            </div>
        </Transition>
    </div>

</template>

<style lang="scss" scoped>
.stage {
    border: 1px solid var(--cyan-color);
    color: var(--silver-color);
    background-color: #3E92CC50;
    transition: all .5s .1s;

    &__passed {
        border: none;
        color: var(--white-color);
        background: var(--blue-color);
    }
}

.line {
    background: var(--cyan-color);
    display: block;
    transition: all .5s;

    // &__passed{
    //     background: linear-gradient(90deg, var(--blue-color) 0%, var(--blue-color) 100%);
    // }
    &__active {
        background: linear-gradient(90deg, var(--blue-color) 0%, var(--cyan-color) 100%);
    }
}

.light {
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
    0% {
        opacity: 0;
        left: 0;
        box-shadow: 0px 0px 8px 4px var(--white-color);
    }

    50% {
        opacity: .8;
        left: 50%;
        box-shadow: 0px 0px 12px 6px var(--white-color);
        ;
    }

    80% {
        opacity: 1;
        left: 100%;
        box-shadow: 0px 0px 24px 6px var(--white-color);
    }

    100% {
        opacity: 0;
        left: 100%;
        box-shadow: 0px 0px 8px 4px var(--white-color);
    }
}

.line__passed+.light {
    animation: translateLight 1s ease-out forwards;
}
</style>