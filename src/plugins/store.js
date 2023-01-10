import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const players = ref([]);
  const config = ref({});

  return { players, config };
});
