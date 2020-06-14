import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    start: false,
    boards: [],
    error: null,
    loading: false,
    showModal: false,
    modalList: 0,
    inputCard: 0,
    modalBoard: 0
  },
  mutations: {
    SET_START (state) {
      state.start = true
    },
    SET_BOARD (state, boards) {
      state.boards = boards
    },
    SET_LOADING (state) {
      state.loading = !state.loading
    },
    SET_ERROR (state, err) {
      state.error = err
    },
    SET_SHOWMODAL (state) {
      state.showModal = !state.showModal
    },
    ADD_BOARD (state, payload) {
      state.boards.push(payload)
    },
    SET_MODALLIST (state, payload) {
      state.modalList = payload
    },
    SET_MODALBOARD (state, payload) {
      state.modalBoard = payload
    },
    SET_INPUTCARD (state, payload) {
      state.inputCard = payload
    },
    PATCH_BOARDS (state, payload) {
      state.boards = payload
    }
  },
  actions: {
    getBoards ({ commit }) {
      commit('SET_LOADING')
      axios.get('https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards')
        .then(({ data }) => {
          commit('SET_BOARD', data)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    addBoard ({ commit, state }, title) {
      commit('SET_LOADING')
      const body = JSON.stringify({
        title,
        kanban: [
          {
            name: 'Not Started',
            id: 1,
            cards: [
              {
                title: 'Welcome to Kanban',
                id: 1
              }
            ]
          }
        ]
      })
      axios({
        method: 'post',
        url: 'https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(({ data }) => {
          const result = JSON.parse(body)
          result.id = state.boards.length + 1
          commit('ADD_BOARD', result)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    deleteBoard ({ commit, state }, id) {
      commit('SET_LOADING')
      axios({
        method: 'delete',
        // karena ini fake database, jadi idnya cuma bisa 1
        // url: `https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards/${id}`,
        url: 'https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards/1'
      })
        .then(({ data }) => {
          const boards = state.boards.filter(board => {
            if (Number(board.id) !== Number(id)) {
              console.log(board.id, id)
              return board
            }
          })
          commit('PATCH_BOARDS', boards)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },

    // crud table 'Board' complete
    // karena ini cuma 1 table: 'Board', untuk table lists dan card hanya menggunakan patch table 'Board'
    patchBoard ({ commit, state }, board) {
      commit('SET_LOADING')
      axios({
        method: 'put',
        // karena ini fake database, jadi idnya cuma bisa 1
        // url: `https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards/${board.id}`,
        url: 'https://my-json-server.typicode.com/xavierThufail/pixelHouse/boards/1',
        body: JSON.stringify(board),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(_ => {
          const boards = state.boards.map(el => {
            if (el.id === board.id) {
              el = board
            }
            return el
          })
          commit('PATCH_BOARDS', boards)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    }
  },
  getters: {
    getBoardById: (state) => (id) => {
      return state.boards.find(board => Number(board.id) === Number(id))
    }
  }
})
