<template >
  <div class="row box">
    <div class="col col-12 page-not-found">
      <div class="page-not-found-title">404 <i class="pi pi-exclamation-triangle page-not-found-title"></i></div>
      <div class="page-not-found-headding">Page Not Found</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style>
.page-not-found{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  flex-flow: column wrap;
}

.page-not-found-title{
  color: #822854;
  font-weight: bold;
  font-size: 5rem;
  margin-top: 5rem;
}
.page-not-found-headding{
  color: #363885;
  font-weight: bold;
  font-size: 3rem;
}
.box{
  height: 100%;
  width: 100%;
}
</style>