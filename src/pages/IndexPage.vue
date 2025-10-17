<template>
  <q-page class="q-pa-md">
     <SearchBar 
      :onSearchName="searchByName" 
      :onSearchIngredient="searchByIngredient" 
    />

    <q-spinner v-if="store.loading" size="2em" class="q-my-md" />
    <div v-if="store.error" class="text-negative text-center">{{ store.error }}</div>

    <CocktailList :cocktails="store.cocktails" @select="openCocktail" v-if="!store.loading && !store.error" />

    <CocktailDetailModal />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCocktailStore } from 'src/stores/cocktails'
import SearchBar from 'src/components/SearchBar.vue'
import CocktailList from 'src/components/CocktailList.vue'
import CocktailDetailModal from 'src/components/CocktailDetailModal.vue'

const store = useCocktailStore()
onMounted(() => {
store.fetchInitialCocktails()
  store.fetchGlasses()  // load glass options
})
function searchByName(query) {
  store.search(query, 'name')
}

function searchByIngredient(query) {
  store.search(query, 'ingredient')
}

function openCocktail(id) {
  store.fetchById(id)
}
</script>
