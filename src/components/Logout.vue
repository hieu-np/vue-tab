<template></template>

<script>
export default {
  name: "Logout",
  emits: ["clicked-something"],
  setup({ emit }) {
  },
  props:{
    isSign: Boolean,
  },
  created() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.$router.push("/login");
      this.$emit("clicked-something");
    } else {
      this.$router.push("/login");
    }
  }
  
};
</script>

<style></style>
