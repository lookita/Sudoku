<script setup>
import CeldaSudoku from './CeldaSudoku.vue'
import { reactive, ref } from 'vue'

// Tablero 
const tablero = reactive([
  [1, null, null, null],
  [null, 1, 3, null],
  [null, null, null, 2],
  [null, null, null, null]
])

const mensaje = ref("")

// validar el tablero
function validarSudoku() {
  const n = 4

  // Validar filas
  for (let fila = 0; fila < n; fila++) {
    let numerosVistos = [];
    for (let columna = 0; columna < n; columna++) {
      let numero = tablero[fila][columna];
      if (numero !== null && numero !== undefined && numero !== "") {
        if (numerosVistos.includes(numero)) {
          mensaje.value = "Hay un número repetido en la fila " + (fila + 1);
          return; 
        }
        numerosVistos.push(numero);
      }
    }
  }


    // Validar columnas
  for (let columna = 0; columna < n; columna++) {
    let numerosVistos = [];
    for (let fila = 0; fila < n; fila++) {
      let numero = tablero[fila][columna];
      if (numero !== null && numero !== undefined && numero !== "") {
        if (numerosVistos.includes(numero)) {
          mensaje.value = "Hay un número repetido en la columna " + (columna + 1);
          return; 
        }
        numerosVistos.push(numero);
      }
    }
  }


  // Validar bloques 2x2
  for (let filaInicio = 0; filaInicio < n; filaInicio += 2) {
    for (let columnaInicio = 0; columnaInicio < n; columnaInicio += 2) {
      let numerosVistos = [];
      for (let fila = filaInicio; fila < filaInicio + 2; fila++) {
        for (let columna = columnaInicio; columna < columnaInicio + 2; columna++) {
          let numero = tablero[fila][columna];
          if (numero !== null && numero !== undefined && numero !== "") {
            if (numerosVistos.includes(numero)) {
              mensaje.value = "Hay un número repetido en el bloque (" + (filaInicio / 2 + 1) + ", " + (columnaInicio / 2 + 1) + ")";
              return; 
            }
            numerosVistos.push(numero);
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
