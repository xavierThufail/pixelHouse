<template>
  <li class="list-container">
    <input v-if="showEdit" type="text" class="editCardInput" v-model="cardTitle">
    <span v-else style="margin-top: -5px;margin-left: 5px">{{card.title}}</span>
    <img
      v-if="showEdit"
      @click="editCard"
      class="icon-card"
      style="padding:7px"
      src="../assets/ok.png"
      alt="ok"
    >
    <div v-else style="margin-top: 5px">
      <img
        @click="openEdit"
        class="icon-card"
        style="padding:7px"
        src="../assets/edit.png"
        alt="edit"
      >
      <img
        @click="deleteCard"
        class="icon-card"
        src="../assets/trash.png"
        alt="trash"
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['card', 'boardId', 'listId'],
  data () {
    return {
      showEdit: false,
      cardTitle: this.card.title
    }
  },
  methods: {
    deleteCard () {
      const board = this.$store.getters.getBoardById(this.boardId)
      board.kanban = board.kanban.filter(kanban => {
        if (kanban.id === this.listId) {
          kanban.cards = kanban.cards.filter(card => card.id !== this.card.id)
        }
        return kanban
      })
      this.$store.dispatch('patchBoard', board)
      this.$store.commit('SET_MODALLIST', 0)
    },
    openEdit () {
      this.showEdit = true
    },
    editCard () {
      const board = this.$store.getters.getBoardById(this.boardId)
      board.kanban = board.kanban.filter(kanban => {
        if (kanban.id === this.listId) {
          kanban.cards = kanban.cards.map(card => {
            if (card.id === this.card.id) card.title = this.cardTitle
            return card
          })
        }
        return kanban
      })
      this.$store.dispatch('patchBoard', board)
      this.showEdit = false
    }
  }
}
</script>

<style>
.list-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
  cursor: grab;
}

.list-container:first-of-type {
  margin-top: 0px;
}

.icon-card {
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 5px;
}

.icon-card:hover {
  cursor: pointer;
  background-color: #7d8185ad;
}

.editCardInput {
  height: 30px;
  margin: 5px;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
}

.editCardInput:focus {
  outline: none;
}
</style>
