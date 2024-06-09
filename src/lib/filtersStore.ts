import { writable } from "svelte/store";

const initialFilters = {
  styles: [],
  withCapo: false,
  difficulty: null
}

export const filtersStore = writable(initialFilters)