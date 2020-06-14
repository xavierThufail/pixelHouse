<template>
  <div class="list-container">
    <span>{{card.title}}</span>
  </div>
</template>

<script>
export default {
  props: ['card'],
  methods: {
    check () {
      console.log(this.card)
    }
  }
}
</script>

<style>
.list-container {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
}
</style>
