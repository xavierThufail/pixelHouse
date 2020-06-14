<template>
  <div class="modal" v-show="$store.state.showModal">
    <div class="container-modal">
      <div>
        <h2>New Board</h2>
      </div>
      <input v-model="title" class="input-txt" type="text" placeholder="Add board title" />
      <div class="container-btn">
        <div class="input-btn" @click="createBoard">
          <span>Create Board</span>
        </div>
        <div class="input-btn" @click="showModal">
          <span>Cancel</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    showModal () {
      this.$store.commit('SET_SHOWMODAL')
    },
    createBoard () {
      if (this.title === '') this.title = 'Null'
      this.$store.dispatch('addBoard', this.title)
      this.$store.commit('SET_SHOWMODAL')
      this.title = ''
    }
  }
}
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.container-modal {
  height: 200px;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.input-txt {
  padding: 10px;
  border-width: 2px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 20px;
  width: 100%;
}

.input-txt:focus {
  outline: none;
}

.container-btn {
  display: flex;
  justify-content: space-between;
}

.input-btn {
  padding: 10px;
  border-radius: 10px;
  background-color: #7a7e83;
  width: 46%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #f7fbff;
}

.input-btn:last-child {
  background-color: #bec2c7;
  color: black;
}
</style>
