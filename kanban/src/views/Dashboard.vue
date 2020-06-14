<template>
  <div class="dashboard">
    <h2>Boards</h2>
    <div class="container">
      <Board
        v-for="(board, i) in $store.state.boards" :key="i"
        :board="board"
      />
      <Board @click.native="showModal"/>
    </div>
  </div>
</template>

<script>
import Board from '../components/BoardTitle'

export default {
  data () {
    return {
      boards: []
    }
  },
  components: {
    Board
  },
  methods: {
    showModal () {
      this.$store.commit('SET_SHOWMODAL')
    }
  }
}
</script>

<style>
.dashboard {
  padding: 30px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
