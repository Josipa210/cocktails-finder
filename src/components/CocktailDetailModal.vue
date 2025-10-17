<template>
  <q-dialog v-model="visible">
    <q-card style="min-width: 400px; max-width: 600px">
      <q-card-section v-if="cocktail" class="row items-center q-pa-sm">
        <!-- Previous Arrow -->
        <q-btn
          round
          flat
          icon="arrow_back"
          @click="prev"
          :disable="isFirst"
        />

        <div class="col text-center text-h5">{{ cocktail.strDrink }}</div>

        <!-- Next Arrow -->
        <q-btn
          round
          flat
          icon="arrow_forward"
          @click="next"
          :disable="isLast"
        />
      </q-card-section>

      <q-card-section v-if="cocktail">
        <q-img fit="contain" :src="cocktail.strDrinkThumb" height="300px" class="q-mt-sm q-mb-md rounded-borders" />

        <div><strong>Category:</strong> {{ cocktail.strCategory }}</div>
        <div><strong>Alcoholic:</strong> {{ cocktail.strAlcoholic }}</div>
        <div><strong>Glass:</strong> {{ cocktail.strGlass }}</div>

        <div class="q-mt-sm">
          <strong>Ingredients:</strong>
          <ul>
            <li v-for="(ingredient, index) in ingredientsList" :key="index">
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <div class="q-mt-sm"><strong>Instructions:</strong> {{ cocktail.strInstructions }}</div>
      </q-card-section>

      <q-card-section v-else>
        <p class="text-center text-grey">Loading...</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useCocktailStore } from 'src/stores/cocktails'

const store = useCocktailStore()
const visible = ref(false)
const cocktail = computed(() => store.selectedCocktail)

// Show/hide dialog
watch(cocktail, (val) => {
  visible.value = !!val
})

// Ingredients list
const ingredientsList = computed(() => {
  if (!cocktail.value) return []
  const list = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail.value[`strIngredient${i}`]
    const measure = cocktail.value[`strMeasure${i}`]
    if (ingredient) list.push(measure ? `${measure} ${ingredient}` : ingredient)
  }
  return list
})

// Navigation helpers
const isFirst = computed(() => store.selectedIndex === 0)
const isLast = computed(() => store.selectedIndex === store.cocktails.length - 1)

function next() {
  if (!isLast.value) store.selectByIndex(store.selectedIndex + 1)
}

function prev() {
  if (!isFirst.value) store.selectByIndex(store.selectedIndex - 1)
}

function close() {
  store.clearSelected()
}
</script>
