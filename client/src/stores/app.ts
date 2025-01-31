import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const loading = ref<boolean>(false);
  const activeStage = ref<number>(0);
  const stages = ref<string[]>([
    "Дата",
    "Направление",
    "Транспорт",
    "Предоплата",
    "Готово!",
  ]);
  const stagesDataStored = ref<any[]>([
    {
      date: new Date(),
      persons: 1,
    },
    {
      tripId: null,
    },
    {
      transportId: null,
    },
  ]);

  const nextStage = () => {
    activeStage.value++;
    localStorage.setItem("stagesData", JSON.stringify(stagesDataStored.value));
    localStorage.setItem("stage", activeStage.value.toString());
  };

  const loadActiveStage = () => {
    const stageStr = localStorage.getItem("stage");
    const stagesDataStr = localStorage.getItem("stagesData");

    if (stageStr && stagesDataStr) {
      const stage = parseInt(stageStr);
      const stagesData: Array<any> = JSON.parse(stagesDataStr);
      const isValid = stagesData.every((obj) =>
        Object.values(obj).every((value) => !!value)
      );
      // if(stage !== stagesData.length || !isValid) return reloadAppState();

      activeStage.value = stage;
      stagesDataStored.value = stagesData;
    } else reloadAppState();
  };

  const reloadAppState = () => {
    activeStage.value = 0;
    stagesDataStored.value = [
      {
        date: new Date(),
        persons: 1,
      },
      {
        tripId: null,
      },
      {
        transportId: null,
      },
    ];
    localStorage.removeItem("stage");
    localStorage.removeItem("stagesData");
  };

  return {
    loading,
    activeStage,
    stages,
    stagesDataStored,
    nextStage,
    loadActiveStage,
    reloadAppState,
  };
});
