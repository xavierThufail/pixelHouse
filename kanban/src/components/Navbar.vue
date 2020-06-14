<template>
  <div class="nav">
    <nav>
      <router-link :to="$store.state.start ? '/dashboard' : '/'" class="logo">
        <img class="logo-img" src="../assets/logo.png" alt="">
        <img class="logo-img" src="../assets/logo-name.png" alt="">
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.nav {
  padding: 20px 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  max-height: 40px;
}
</style>
