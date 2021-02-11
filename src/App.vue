<template>
  <div id="app">
    <Offline />
    <router-view />
  </div>
</template>
<script>
import Offline from "@/components/Offline/Offline";
export default {
  components: {
    Offline
  },
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
</style>
