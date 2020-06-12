<template>
  <div id="app">
    <Navbar/>
    <router-view id="view"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7fbff;
}

#view {
  padding-top: 50px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
