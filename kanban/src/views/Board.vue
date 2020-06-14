<template>
  <div>
    <div class="nav-board" v-if="inputBoard">
      <router-link to="/dashboard">
        <img src="../assets/back.png" alt="" height="30px" width="30px">
      </router-link>
      <input class="nav-input" type="text" v-model="board.title">
      <img @click="editBoardTitle" class="nav-icon" src="../assets/ok.png" alt="">
    </div>
    <div class="nav-board" v-else>
      <router-link to="/dashboard">
        <img src="../assets/back.png" alt="" height="30px" width="30px">
      </router-link>
      <h2 style="margin-right: 30px">{{board.title}}</h2>
      <img @click="showInputTitle" class="nav-icon" src="../assets/edit.png" alt="" style="padding: 5px">
      <router-link to="/dashboard" class="nav-icon">
        <img @click="deleteBoard" src="../assets/trash.png" height="30px" width="30px" alt="">
      </router-link>
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
      inputList: false,
      nameList: '',
      inputBoard: false
    }
  },
  methods: {
    addInput () {
      this.inputList = !this.inputList
    },
    addList () {
      const board = this.board
      if (this.nameList === '') this.nameList = 'Null'
      board.kanban.push({ id: board.kanban.length + 1, cards: [], name: this.nameList })
      this.$store.dispatch('patchBoard', board)
      this.inputList = !this.inputList
      this.nameList = ''
    },
    editBoardTitle () {
      const board = this.board
      this.$store.dispatch('patchBoard', board)
      this.inputBoard = false
    },
    showInputTitle () {
      this.inputBoard = true
    },
    deleteBoard () {
      this.$store.dispatch('deleteBoard', this.id)
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
  align-items: center;
}

.nav-board h2 {
  margin-left: 30px;
}

.nav-board input {
  margin-left: 30px;
}

.nav-icon {
  height: 30px;
  width: 30px;
  border-radius: 5px;
}

.nav-icon:hover {
  cursor: pointer;
  background-color: #7d8185ad;
}

.nav-input {
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}

.nav-input:focus {
  outline: none;
}

.kanban-container {
  padding: 30px;
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
