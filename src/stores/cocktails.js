import { defineStore } from 'pinia'
import axios from 'axios'

export const useCocktailStore = defineStore('cocktails', {
  state: () => ({
    cocktails: [],
    loading: false,
    error: null,
    selectedCocktail: null,
    selectedIndex: null,
    glasses: [], // for glass filter dropdown
    selectedGlass: null, // currently selected glass
  }),
  getters: {
    filteredCocktails: (state) => {
      if (!state.selectedGlass) return state.cocktails
      return state.cocktails.filter(c => c.strGlass === state.selectedGlass)
    }
  },
  actions: {
    async fetchInitialCocktails() {
      this.loading = true
      this.error = null
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a' 
      try {
        const { data } = await axios.get(url)
        this.cocktails = data.drinks || []
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch cocktails'
      } finally {
        this.loading = false
      }
    },

    async search(query, type = 'name') {
      this.loading = true
      this.error = null
      const base = 'https://www.thecocktaildb.com/api/json/v1/1/'
      const url = type === 'ingredient'
        ? `${base}filter.php?i=${query}`
        : `${base}search.php?s=${query}`

      try {
        const { data } = await axios.get(url)
        this.cocktails = data.drinks || []
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch cocktails'
      } finally {
        this.loading = false
      }
    },

    // Client-side filter by glass
    setGlassFilter(glass) {
      this.selectedGlass = glass
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      try {
        const { data } = await axios.get(url)
        this.selectedCocktail = data.drinks ? data.drinks[0] : null
        // find index of this cocktail in current results
        this.selectedIndex = this.cocktails.findIndex(c => c.idDrink === id)
      } catch {
        this.error = 'Failed to fetch cocktail details'
      } finally {
        this.loading = false
      }
    },

    selectByIndex(index) {
      if (index < 0 || index >= this.cocktails.length) return
      this.fetchById(this.cocktails[index].idDrink)
    },

    clearSelected() {
      this.selectedCocktail = null
      this.selectedIndex = null
    },

    async fetchGlasses() {
      this.loading = true
      this.error = null
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'
      try {
        const { data } = await axios.get(url)
        this.glasses = data.drinks.map(item => item.strGlass)
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch glasses'
        this.glasses = []
      } finally {
        this.loading = false
      }
    }
  }
})
