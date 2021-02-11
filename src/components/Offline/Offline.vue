<template>
    <div>
        <b-button class="btn-off" block v-if="isOffline">Aplicação offline</b-button>
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