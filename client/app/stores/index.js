export const useStore = defineStore("global", {
  state: () => ({
    programs: [],
    mainPrograms: [],
  }),
  persist: true
})
