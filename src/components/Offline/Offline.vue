<template>
  <div>
    <b-button
      v-if="isOffline"
      class="btn-off"
      block
    >
      Aplicação offline
    </b-button>
  </div>
</template>
<script>
export default {
  computed: {
        networkStatus () {
            return this.isOnline ? 'My network is fine' : 'I am offline'
        }
    },
}
</script>
<style>
.btn-off {
    position:absolute;
}
</style>