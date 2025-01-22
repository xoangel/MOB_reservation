import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('appStore', ()=>{

    const activeStage = ref<number>(1);
    const stages = ref<string[]>([
        "Дата",
        "Направление",
        "Транспорт",
        "Предоплата",
        "Готово!"
    ])

    return{
        activeStage,
        stages
    }
})