<template>
    <div>
        <b-button-group>
            <b-dropdown icon="menu-button-wide">
                <b-dropdown-item v-on:click="exit">Logout</b-dropdown-item>
            </b-dropdown>
        </b-button-group>
    </div>
</template>
<script>
  export default {
    methods: {
      exit() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
    computed: {
      isLoggedIn() { 
        return this.$store.getters.isLoggedIn
      }
    },
  }
</script>
<style>

</style>