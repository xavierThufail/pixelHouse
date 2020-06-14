<template>
  <div id="app">
    <Navbar/>
    <router-view id="view"/>
    <Modal/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Modal from './components/Modal'

export default {
  components: {
    Navbar,
    Modal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7fbff;
  position: relative;
}

#view {
  height: 90vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
