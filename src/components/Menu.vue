<template>
  <TabMenu :model="isSign? itemSign : items" class="tran" />
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isSign: false,
      user: {},
      itemSign: [
        { label: "Home", icon: "pi pi-fw pi-home", to:'/' },
        { label: '', icon: "pi pi-fw pi-user", to: '/' },
        { label: "Sign Out", icon: "pi pi-fw pi-file", to:'/logout'},
      ],
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to:'/' },
        { label: "Sign In", icon: "pi pi-fw pi-sign-in", to: '/login' },
        { label: "Sign Up", icon: "pi pi-fw pi-user-plus", to: '/register' },
        { label: "Sign Out", icon: "pi pi-fw pi-file", to:'/logout'},
      ],
    };
  },
  created(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.isSign = true
      this.itemSign[1].label=`Hello, ${this.user.username}`
    }
  },
};
</script>

<style>

.tran{
  background-color: rgba(255, 255, 255, 0.3) !important;
}

</style>