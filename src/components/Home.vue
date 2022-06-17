<template>
  <div class="home-page">
    <div class="title-home-page">Home Page</div>
    <div class="sub-home-page" v-show="user">Hello {{user.username}}</div>
  </div>
</template>

<script>
export default {
  emits: ["clicked-something"],
  setup({ emit }) {},
  name: 'Home',
  data(){
    return {
      user: '',

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
.home-page{
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.title-home-page{
  font-size: 50px;
  font-weight: bold;
}
.sub-home-page{
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}
</style>