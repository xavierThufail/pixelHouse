<template>
  <router-link :to="board ? `/dashboard/${board.id}` : '/dashboard'" class="board" :style="board ? 'background-color: #7a7e83' : ''">
    <h4>{{board ? board.title : 'Create new board'}}</h4>
  </router-link>
</template>

<script>
export default {
  props: ['board']
}
</script>

<style>
.board {
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color: #bec2c7;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: none;
}

.board:hover {
  background-color: #7a7e83;
  color: #f7fbff;
}
</style>
