<template>
  <div class="q-mb-md flex justify-center">
    <q-input
      v-model="query"
      label="Search cocktail"
      outlined clearable=""
      debounce="400"
      dark
      @update:model-value="onSearch"
      class="q-mb-md col q-mr-md"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-toggle
      v-model="searchByIngredientFlag"
      label="Search by ingredient"
      dense
      dark
      class="q-mb-md text-white"
       color="accent"
      keep-color
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  onSearchName: Function,
  onSearchIngredient: Function
})

const query = ref('')
const searchByIngredientFlag = ref(false)

// Run search whenever query changes
watch(query, (val) => {
  if (!val.trim()) return
  if (searchByIngredientFlag.value) {
    props.onSearchIngredient(val)
  } else {
    props.onSearchName(val)
  }
})
</script>
