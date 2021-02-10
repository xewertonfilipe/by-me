<template>
  <div>
    <b-form @submit.stop.prevent="register" v-if="show">
      <b-form-group id="profile-first-name">
        <b-form-input
          id="input-first-name"
          v-model="firstName"
          :state="validateState('firstName')"
          type="text"
          placeholder="Nome"
          aria-describedby="required-name"
        ></b-form-input>
        <b-form-invalid-feedback id="required-name">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="profile-last-name">
        <b-form-input
          id="input-password"
          v-model="lastName"
          :state="validateState('lastName')"
          type="text"
          placeholder="Sobre nome"
          aria-describedby="required-last-name"
        ></b-form-input>
        <b-form-invalid-feedback id="required-last-name">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="success" pill>Editar Perfil</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          email : "",
          password : "",
        },
        show: true
      }
    },
    validations: {
      form: {
        email: {
          required,
        },
        password: {
          required,
          minLength: minLength(4)
        },
      }
    },
    methods: {
      validateState(value) {
        const {$dirty, $error} = this.$v.form[value];
        return $dirty ? !$error: null;
      },
      register() {
        let data = {
          email: this.$v.form.email.$model,
          password: this.$v.form.password.$model,
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err));
        
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
      },
    }
  }
</script>
