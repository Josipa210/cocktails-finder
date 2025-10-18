<template>
  <q-card clickable @click="$emit('select', cocktail.idDrink)" flat dark class="bg-secondary">
    <q-img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" fit="contain" height="200px"  class="q-mt-md rounded-borders"/>
    <q-card-section>
      <div class="text-h6">{{ cocktail.strDrink }}</div>
      <div v-if="cocktail.strInstructions" class="text-caption text-white">
        {{ cocktail.strInstructions.slice(0, 70) }}...
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  cocktail: { type: Object, required: true }
})
</script>
