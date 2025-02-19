import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { router } from "./config/router";
import { pinia } from "./config/pinia";
import Vue3Lottie from "vue3-lottie";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import "./style.scss";
import App from "./App.vue";

createApp(App)
  .use(pinia)
  .use(router)
  .use(Vue3Lottie)
  .use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura,
    },
    locale: {
      firstDayOfWeek: 1,
      dayNames: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthNamesShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      today: "Сегодня",
      clear: "Очистить",
      weekHeader: "нд",
    },
  })
  .mount("#app");
