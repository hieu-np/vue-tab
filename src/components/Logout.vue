<template></template>

<script>
export default {
  name: "Logout",
  props:{
    isSign: Boolean,
  },
  created() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.$router.push("/login");
    } else {
      this.$router.push("/");
    }
  }
  
};
</script>

<style></style>
