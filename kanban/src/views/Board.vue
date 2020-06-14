<template>
  <div>
    <div class="nav-board">
      <router-link to="/dashboard">
        <img class="nav-icon" src="../assets/back.png" alt="" height="30px" width="30px">
      </router-link>
      <h2>{{board.title}}</h2>
    </div>
    <div class="kanban-container">
      <List
        v-for="(list, i) in board.kanban" :key="i"
        :list="list"
        :id="id"
      />
      <div
        v-if="inputList"
        class="addList-container"
      >
        <input
          v-model="nameList"
          type="text"
          placeholder="Enter list name"
          class="addList-input"
        />
        <div style="display: flex;">
          <div class="btn-add" @click="addList">
            <span>Add Card</span>
          </div>
          <div @click="addInput" class="btn-add" style="margin-left: 10px">
            <span>Cancel</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="container-add"
        @click="addInput"
      >
        <h4>+ Add another list</h4>
      </div>
    </div>
  </div>
</template>

<script>
import List from '../components/List'

export default {
  props: ['id'],
  components: {
    List
  },
  data () {
    return {
      board: {},
      cars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      inputList: true,
      nameList: ''
    }
  },
  methods: {
    addInput () {
      this.inputList = !this.inputList
    },
    addList () {
      const board = this.board
      if (this.nameList === '') this.nameList = 'Null'
      board.kanban.push({ id: board.kanban.length + 1, lists: [], name: this.nameList })
      this.$store.dispatch('patchBoard', board)
      this.inputList = !this.inputList
      this.nameList = ''
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

.addList-container {
  display: inline-flex;
  flex-direction: column;
  background-color: #7d818563;
  width: 250px;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.addList-input {
  font-weight: bold;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}

.addList-input:focus {
  outline: none;
}
</style>
