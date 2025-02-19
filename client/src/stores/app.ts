import { defineStore } from "pinia";
import { computed, ref, toRaw, toRef } from "vue";

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


  const stagesDataStored = ref<any[]>([
    {
      date: ref<Date>(new Date()),
      persons: ref(1),
    },
    {
      tripId: ref(null),
      tripName: ref(""),
      tripPhoto: ref(""),
      map: ref("")
    },
    {
      transportId: ref(null),
      transportName: ref(""),
      price: ref(null)
    },
  ]);

  const isWinter = computed<boolean>(()=>[1, 2, 3, 4, 5, 9, 10, 11, 12].includes(new Date(stagesDataStored.value[0].date).getMonth()))

  const nextStage = () => {
    if (activeStage.value === visibleStage.value) {
      activeStage.value++;
      visibleStage.value = activeStage.value;
    } else {
      visibleStage.value++;
      activeStage.value = visibleStage.value;
    }

    cacheData();
  };

  const watchStage = (stage: number) => {
    visibleStage.value = stage;
  };

  const cacheData = () => {
    const raw = stagesDataStored.value.map((el: object) => {
      let data: any = {};
      for (const key in el) {
        data[key] = toRaw(el[key]);
      }
      return data;
    });
    localStorage.setItem(
      "stagesData",
      JSON.stringify(raw)
    );
    localStorage.setItem("stage", activeStage.value.toString());
  };

  const loadActiveStage = () => {
    const stageStr = localStorage.getItem("stage");
    const stagesDataStr = localStorage.getItem("stagesData");

    if (stageStr && stagesDataStr) {
      const stage = parseInt(stageStr);
      const stagesData: Array<object> = JSON.parse(stagesDataStr);
      activeStage.value = stage;
      visibleStage.value = activeStage.value;
      stagesDataStored.value = stagesData.map((el: object) => {
        let data: any = {};
        for (const key in el) {
          data[key] = toRef(el[key]);
        }
        return data;
      });
    } else reloadAppState();
  };

  const reloadAppState = () => {
    activeStage.value = visibleStage.value = 0;
    stagesDataStored.value = [
      {
        date: ref(new Date()),
        persons: ref(1),
      },
      {
        tripId: ref(null),
        tripName: ref(""),
      },
      {
        transportId: ref(null),
        transportName: ref(""),
      },
    ];
    localStorage.removeItem("stage");
    localStorage.removeItem("stagesData");
  };

  return {
    loading,
    activeStage,
    visibleStage,
    stages,
    stagesDataStored,
    isWinter,
    nextStage,
    watchStage,
    loadActiveStage,
    reloadAppState,
  };
});
