<template>
  <Menu></Menu>
  <router-view ></router-view>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },

}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");
#app {
  font-family: "Fira Sans", sans-serif;
}
html{
  height: 100%;

}

*{
  margin: 0;
  padding: 0;
}
body {
  background-image: url("./assets/sea.jpg");
  background-size: cover;
    background-repeat: no-repeat;
  background-position: center;
    height: 100%;
}
</style>
