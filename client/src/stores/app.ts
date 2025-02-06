import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const loading = ref<boolean>(false);
  const activeStage = ref<number>(0);
  const visibleStage = ref<number>(0);
  const stages = ref<string[]>([
    "Дата",
    "Направление",
    "Транспорт",
    "Предоплата",
    "Готово!",
  ]);

  let stagesDataStored = reactive<any[]>([
    {
      date: new Date(),
      persons: 1,
    },
    {
      tripId: null,
      tripName: ""
    },
    {
      transportId: null,
      transportName: ""
    },
  ]);

  const nextStage = () => {
    if(activeStage.value === visibleStage.value){
      activeStage.value++;
      visibleStage.value = activeStage.value;
    } else {
      visibleStage.value++;
      activeStage.value = visibleStage.value;
    }

    localStorage.setItem("stagesData", stagesDataStored);
    localStorage.setItem("stage", activeStage.value.toString());
  };

  const watchStage = (stage: number) => {
    visibleStage.value = stage;
  }

  const loadActiveStage = () => {
    const stageStr = localStorage.getItem("stage");
    const stagesDataStr = localStorage.getItem("stagesData");

    if (stageStr && stagesDataStr) {
      const stage = parseInt(stageStr);
      const stagesData: Array<any> = JSON.parse(stagesDataStr);
      activeStage.value = stage;
      visibleStage.value = activeStage.value;
      stagesDataStored.map((item, idx)=>item = stagesData[idx])
    } else reloadAppState();
  };

  const reloadAppState = () => {
    activeStage.value = visibleStage.value = 0;
    stagesDataStored = reactive([
      {
        date: new Date(),
        persons: 1,
      },
      {
        tripId: null,
        tripName: ""
      },
      {
        transportId: null,
        transportName: ""
      },
    ]);
    localStorage.removeItem("stage");
    localStorage.removeItem("stagesData");
  };

  watch(
    stagesDataStored,
    (newValue) => {
      localStorage.setItem("stagesData", JSON.stringify(newValue));
    },
    { deep: true }
  );

  return {
    loading,
    activeStage,
    visibleStage,
    stages,
    stagesDataStored,
    nextStage,
    watchStage,
    loadActiveStage,
    reloadAppState,
  };
});
