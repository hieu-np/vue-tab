<template>
  <h1>Home</h1>
  <h1 v-if="user">{{user.username}}</h1>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      user: {},

    }
  },
  created(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<style>

</style>