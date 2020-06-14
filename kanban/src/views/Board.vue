<template>
  <div>
    <div class="nav-board">
      <router-link to="/dashboard">
        <img class="nav-icon" src="../assets/back.png" alt="" height="30px" width="30px">
      </router-link>
      <h2>{{board.title}}</h2>
    </div>
    <div class="kanban-container">
      <Lists
        v-for="(lists, i) in board.kanban" :key="i"
        :lists="lists"
        :id="id"
      />
      <div class="container-add">
          <h4>+ Add another list</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Lists from '../components/ListContainer'

export default {
  props: ['id'],
  components: {
    Lists
  },
  data () {
    return {
      board: {},
      cars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    }
  },
  beforeMount () {
    this.board = this.$store.getters.getBoardById(this.id)
  }
}
</script>

<style>
.nav-board {
  display: flex;
  padding: 0 30px;
}

.nav-board h2 {
  margin-left: 30px;
}

.kanban-container {
  padding: 0 30px;
  overflow: auto;
  white-space: nowrap;
  height: 85vh;
}

.container-add {
  display: inline-flex;
  background-color: #bec2c759;
  width: 250px;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.container-add:hover {
  background-color: #7d818563;
  cursor: pointer;
}
</style>
