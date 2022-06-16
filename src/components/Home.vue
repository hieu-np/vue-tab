<template>
  <div class="home">
    <div>Home</div>
    <div v-if="user">Hello {{user.username}}</div>
  </div>
</template>

<script>
export default {
  emits: ["clicked-something"],
  setup({ emit }) {},
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
.home{
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
</style>