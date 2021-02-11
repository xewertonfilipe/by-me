<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$axios.interceptors.response.use(undefined, function (err) {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
}
</script>
<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
body {
  background: #F81E1D;
    background: -webkit-linear-gradient(bottom right, #F81E1D, #F9DC12);
    background: -moz-linear-gradient(bottom right, #F81E1D, #F9DC12);
    background: linear-gradient(to top left, #F81E1D, #F9DC12);
}
</style>
