import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boards: [],
    error: null,
    loading: false,
    showModal: false,
    modalList: 0
  },
  mutations: {
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
            lists: [
              {
                title: 'Welcome to Kanban'
              }
            ]
          }
        ]
      })
      console.log(body)
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
    addCard ({ commit, state }, board) {
      commit('SET_LOADING')
      axios({
        method: 'patch',
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
