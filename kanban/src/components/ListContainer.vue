<template>
  <div class="lists-container">
    <div class="flex-container">
      <div class="lists-title">
        <h4>{{lists.name}}</h4>
        <h4 class="icon-more" @click="modalList">...</h4>
      </div>
      <List
        v-for="(list, i) in lists.lists"
        :key="i"
        :list="list"
      />
      <div v-if="inputCard">
        <input v-model="titleCard" type="text" placeholder="Input title card" class="input-container"/>
        <div style="display: flex;">
          <div class="btn-add">
            <span>Add Card</span>
          </div>
          <div @click="add" class="btn-add" style="margin-left: 10px">
            <span>Cancel</span>
          </div>
        </div>
      </div>
      <div v-else class="add-container" @click="add">
        <span>+ Add a card</span>
      </div>
      <div class="modal-list" v-show="modal && $store.state.modalList === id">
        <div class="modal-title">
          <span>List Actions</span>
          <span @click="closeModal" style="cursor: pointer">X</span>
        </div>
        <div class="modal-separator"></div>
        <div class="modal-actions">
          <span class="action-container">Add Card</span>
          <span class="action-container">Delete List</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import List from '../components/List'

export default {
  props: ['lists', 'id'],
  data () {
    return {
      cars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      modal: false,
      inputCard: true,
      titleCard: ''
    }
  },
  components: {
    List
  },
  methods: {
    modalList (props) {
      this.$store.commit('SET_MODALLIST', this.id)
      this.modal = !this.modal
    },
    closeModal () {
      this.modal = false
    },
    add () {
      this.inputCard = !this.inputCard
      this.titleCard = ''
    },
    addCard () {
      const board = this.$store.getters.getBoardById(this.id)
      board.kanban = board.kanban.map(kanban => {
        if (kanban.id === this.lists.id) {
          kanban.lists.push({ title: this.titleCard })
        }
        return kanban
      })
      this.$store.dispatch('addCard', board)
      this.titleCard = ''
    }
  }
}
</script>

<style>
.lists-container {
  display: inline-flex;
  position: relative;
}

.flex-container {
  display: flex;
  flex-direction: column;
  background-color: #bec2c7;
  width: 250px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.lists-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-more {
  padding: 5px;
  border-radius: 5px;
}

.icon-more:hover {
  background-color: #7d8185ad;
  cursor: pointer;
}

.add-container {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
}

.add-container:hover {
  background-color: #7d8185ad;
  cursor: pointer;
}

.input-container {
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
}

.input-container:focus {
  outline: none;
}

.btn-add {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #7d8185ad;
  border-radius: 5px;
  cursor: pointer;
}

.modal-list {
  position: absolute;
  background-color: #f7fbff;
  padding: 10px;
  width: 250px;
  border-radius: 5px;
  top: 50px;
  left: 220px;
  z-index: 999;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.modal-title {
  display: flex;
  justify-content: space-between;
}

.modal-separator {
  border-width: 1px;
  border-style: solid;
  margin: 10px 0;
}

.modal-actions {
  display: flex;
  flex-direction: column;
}

.action-container {
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
}

.action-container:hover {
  background-color: #7d8185ad;
  cursor: pointer;
}
</style>
