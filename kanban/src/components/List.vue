<template>
  <div class="lists-container">
    <div class="flex-container">
      <div class="lists-title">
        <h4>{{lists.name}}</h4>
        <h4 class="icon-more" @click="modalList">...</h4>
      </div>
      <Card
        v-for="(card, i) in list.cards"
        :key="i"
        :list="list"
      />
      <div v-if="inputCard">
        <input v-model="titleCard" type="text" placeholder="Input title card" class="input-container"/>
        <div style="display: flex;">
          <div class="btn-add" @click="addCard">
            <span>Add Card</span>
          </div>
          <div @click="add" class="btn-add" style="margin-left: 10px">
            <span>Cancel</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="add-container"
        @click="add"
      >
        <span>+ Add a card</span>
      </div>
      <div class="modal-list" v-show="$store.state.modalList === lists.id">
        <div class="modal-title">
          <span>List Actions</span>
          <span @click="closeModal" style="cursor: pointer">X</span>
        </div>
        <div class="modal-separator"></div>
        <div class="modal-actions">
          <span
            class="action-container"
            @click="add"
          >
            Add Card
          </span>
          <span class="action-container">Delete List</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'

export default {
  props: ['list', 'id'],
  data () {
    return {
      cars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      inputCard: false,
      titleCard: ''
    }
  },
  components: {
    Card
  },
  methods: {
    modalList (props) {
      this.$store.state.modalList === this.lists.id ? this.$store.commit('SET_MODALLIST', 0) : this.$store.commit('SET_MODALLIST', this.lists.id)
    },
    closeModal () {
      this.$store.commit('SET_MODALLIST', 0)
    },
    add () {
      this.$store.commit('SET_MODALLIST', 0)
      this.inputCard = !this.inputCard
      this.titleCard = ''
    },
    addCard () {
      const board = this.$store.getters.getBoardById(this.id)
      if (this.titleCard === '') this.titleCard = 'Null'
      board.kanban = board.kanban.map(kanban => {
        if (kanban.id === this.lists.id) {
          kanban.lists.push({ title: this.titleCard, id: kanban.lists.length + 1 })
        }
        return kanban
      })
      this.$store.dispatch('patchBoard', board)
      this.titleCard = ''
      this.inputCard = !this.inputCard
    },
    deleteList () {
      const board = this.$store.getters.getBoardById(this.id)
      board.kanban = board.kanban.filter(kanban => kanban.id !== this.lists.id)
      this.$store.dispatch('patchBoard', board)
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
