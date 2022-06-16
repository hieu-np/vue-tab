<template>
  <Menu v-bind:key="key"></Menu>
  <router-view v-on:clicked-something="handleClickInParent"></router-view>
</template>

<script>
import Menu from "./components/Menu.vue";
import { provide } from "vue";
import store from "@/store";
export default {
  name: "App",
  emits: ["clicked-something"],
  setup({ emit }) {
    provide('store', store)
    return {};
  },
  components: {
    Menu,
  },
  data() {
    return {
      key: false,
    };
  },
  methods: {
    handleClickInParent() {
      this.key = !this.key;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");
#app {
  font-family: "Fira Sans", sans-serif;
}
html {
  height: 100%;
}

* {
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
