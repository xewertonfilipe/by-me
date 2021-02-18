<template>
  <div>
    <div>
      <b-button
        v-b-modal.modal-sm
        class="mb-2"
        icon="power"
        aria-hidden="true"
        @click="showMsgBoxOne"
      >
        Sair
      </b-button>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      isLoggedIn() { 
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      showMsgBoxOne() {
        this.$bvModal.msgBoxConfirm('Voce tem certeza?')
          .then(value => {
            if(value) this.exit();
          })
          .catch({
          })
      },
      exit() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
<style>

</style>