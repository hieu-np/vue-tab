<template>
  <TabMenu :model="isSign? itemSign : items"/>
</template>

<script>
export default {
  name: "Menu",
  props:['key'],
  data() {
    return {
      isSign: false,
      user: {},
      itemSign: [
        { label: "Home", icon: "pi pi-fw pi-home", to:'/' },
        { label: '', icon: "pi pi-fw pi-user", to: '/' },
        { label: "User list", icon: "pi pi-fw pi-users", to:'/userlist'},
        { label: "Admin List", icon: "pi pi-fw pi-hashtag", to:'/adminlist'},
        { label: "Sign Out", icon: "pi pi-fw pi-sign-out", to:'/logout'},
      ],
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to:'/' },
        { label: "Sign In", icon: "pi pi-fw pi-sign-in", to: '/login' },
        { label: "Sign Up", icon: "pi pi-fw pi-user-plus", to: '/register' },
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

</style>