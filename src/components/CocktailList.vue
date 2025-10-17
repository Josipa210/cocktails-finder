<template>
  <div v-if="cocktails.length" class="row q-col-gutter-md">
    <div
      v-for="drink in cocktails"
      :key="drink.idDrink"
      class="col-xs-12 col-sm-6 col-md-4"
    >
      <CocktailCard :cocktail="drink" @select="$emit('select', $event)" />
    </div>
  </div>

  <div v-else class="text-center text-grey">
    No cocktails found.
  </div>
</template>

<script setup>
import CocktailCard from './CocktailCard.vue'

defineProps({
  cocktails: { type: Array, default: () => [] }
})
</script>
