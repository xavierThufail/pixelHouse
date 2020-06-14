<template>
  <div class="landingPage">
    <div class="txt">
      <h1 class="h-txt">Organize anything</h1>
      <p>Kanban makes it easy to organize stuff, people, ideas, and anything else you can imagine with your team.</p>
      <router-link to="/dashboard" class="lp-btn">
        <span @click="start">Get started!</span>
      </router-link>
    </div>
    <img class="lp-img" src="../assets/kanban.png" alt="Kanban Board">
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getBoards')
  },
  methods: {
    start () {
      this.$store.commit('SET_START')
    }
  }
}
</script>

<style>
.landingPage {
  display: flex;
  padding: 30px;
  font-size: 30px;
  align-items: center;
  justify-content: space-between;
}

.lp-btn {
  background-color: #005deb;
  color: #f7fbff;
  font-weight: bold;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
  text-decoration: none;
}

.lp-img {
  height: 350px;
}

.h-txt {
  margin-bottom: 30px;
}
</style>
