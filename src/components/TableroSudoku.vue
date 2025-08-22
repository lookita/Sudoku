<script setup>
import CeldaSudoku from './CeldaSudoku.vue'
import { reactive, ref } from 'vue'

// Tablero inicial (puedes cambiar las pistas)
const tablero = reactive([
  [1, null, null, null],
  [null, 1, 3, null],
  [null, null, null, 2],
  [null, null, null, null]
])

const mensaje = ref("")

// 🔎 Función para validar el tablero
function validarSudoku() {
  const n = 4

  // Validar filas
  for (let fila = 0; fila < n; fila++) {
    const vistos = new Set()
    for (let col = 0; col < n; col++) {
      const valor = tablero[fila][col]
      if (valor) {
        if (vistos.has(valor)) {
          mensaje.value = `Error en la fila ${fila + 1}`
          return
        }
        vistos.add(valor)
      }
    }
  }

  // Validar columnas
  for (let col = 0; col < n; col++) {
    const vistos = new Set()
    for (let fila = 0; fila < n; fila++) {
      const valor = tablero[fila][col]
      if (valor) {
        if (vistos.has(valor)) {
          mensaje.value = `Error en la columna ${col + 1}`
          return
        }
        vistos.add(valor)
      }
    }
  }

  // Validar bloques 2x2
  for (let filaBase = 0; filaBase < n; filaBase += 2) {
    for (let colBase = 0; colBase < n; colBase += 2) {
      const vistos = new Set()
      for (let fila = filaBase; fila < filaBase + 2; fila++) {
        for (let col = colBase; col < colBase + 2; col++) {
          const valor = tablero[fila][col]
          if (valor) {
            if (vistos.has(valor)) {
              mensaje.value = `Error en el bloque (${filaBase / 2 + 1}, ${colBase / 2 + 1})`
              return
            }
            vistos.add(valor)
          }
        }
      }
    }
  }

  mensaje.value = "✅ ¡Sudoku válido!"
}



function reiniciarJuego() {
  const n = 4
  const nuevoTablero = Array.from({ length: n }, () => Array(n).fill(null))

  // Insertar algunas pistas aleatorias
  let pistas = 6 // cantidad de pistas iniciales
  while (pistas > 0) {
    const fila = Math.floor(Math.random() * n)
    const col = Math.floor(Math.random() * n)
    const valor = Math.floor(Math.random() * n) + 1

    // Solo si la celda está vacía y no hay conflicto
    if (!nuevoTablero[fila][col]) {
      nuevoTablero[fila][col] = valor
      pistas--
    }
  }

  // Actualizar el tablero reactivo
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      tablero[i][j] = nuevoTablero[i][j]
    }
  }

  mensaje.value = ""
}


</script>

<template>
  <div>
    <div class="tablero">
      <template v-for="(fila, filaIndex) in tablero" :key="filaIndex">
        <CeldaSudoku
          v-for="(valor, colIndex) in fila"
          :key="colIndex"
          v-model="tablero[filaIndex][colIndex]"
          :fila="filaIndex"
          :col="colIndex"
        />
      </template>
    </div>

    <button @click="validarSudoku">Comprobar</button>
    <p>{{ mensaje }}</p>
  </div>

  <button @click="reiniciarJuego">Reiniciar juego</button>

</template>

<style scoped>
.tablero {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
}

button {
  margin-top: 15px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
