<template>
  <div class="list-container">
    <span>{{list.title}}</span>
  </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    check () {
      console.log(this.list)
    }
  }
}
</script>

<style>
.list-container {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: #f7fbff;
}
</style>
