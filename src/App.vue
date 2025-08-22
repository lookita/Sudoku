<script setup>
import TableroSudoku from './components/TableroSudoku.vue';
</script>

<template>
  <main>
    <h1>Sudoku </h1>
    <TableroSudoku />
  </main>
</template>

<style>
main{
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:2rem;
  gap:1rem;
}
h1{ 
  margin:0; 
  color: rgb(160, 14, 14); 
  }
</style>
