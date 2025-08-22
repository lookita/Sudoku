<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Number,
  fila: Number,
  col: Number
})

const emit = defineEmits(["update:modelValue"])

// 🔎 Controlar solo valores 1-4
function actualizar(e) {
  const val = parseInt(e.target.value)
  if (!isNaN(val) && val >= 1 && val <= 4) {
    emit("update:modelValue", val)
  } else if (e.target.value === "") {
    emit("update:modelValue", null)
  } else {
    e.target.value = "" // reset si escribe mal
  }
}

// 🎨 Bordes gruesos para bloques 2x2
const estilo = computed(() => {
  return {
    borderTop: props.fila % 2 === 0 ? "3px solid black" : "1px solid gray",
    borderLeft: props.col % 2 === 0 ? "3px solid black" : "1px solid gray",
    borderRight: props.col === 3 ? "3px solid black" : "",
    borderBottom: props.fila === 3 ? "3px solid black" : "",
  }
})
</script>

<template>
  <input
    type="text"
    :value="modelValue ?? ''"
    maxlength="1"
    @input="actualizar"
    class="celda"
    :style="estilo"
  />
</template>

<style scoped>
.celda {
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 1.5rem;
}
</style>
