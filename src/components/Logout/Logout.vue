<template>
    <div>
        <div>
          <b-button @click="showMsgBoxOne" class="mb-2" icon="power" aria-hidden="true" v-b-modal.modal-sm>
            Sair
          </b-button>
        </div>
    </div>
</template>
<script>
  export default {
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
    computed: {
      isLoggedIn() { 
        return this.$store.getters.isLoggedIn
      }
    },
  }
</script>
<style>

</style>