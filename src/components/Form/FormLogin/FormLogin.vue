<template>
  <b-container>
    <b-form @submit.stop.prevent="login" v-if="show">
      <b-form-group id="login-email">
        <b-form-input
          id="input-login-email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          placeholder="E-mail"
          aria-describedby="required-email"
          autocomplete="off"
        ></b-form-input>
        <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="login-pass">
        <b-form-input
          id="input-login-pass"
          v-model="$v.form.pass.$model"
          :state="validateState('pass')"
          type="password"
          placeholder="Senha"
          aria-describedby="required-pass"
        ></b-form-input>
        <b-form-invalid-feedback id="required-pass">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit">Entrar</b-button>
      <router-link to="/cadastro">
        <b-button variant="success">Criar Conta</b-button>
      </router-link>
    </b-form>
  </b-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          email: "",
          pass: "",
        },
        show: true
      }
    },
    validations: {
      form: {
        email: {
          required,
        },
        pass: {
          required,
          minLength: minLength(4)
        }
      }
    },
    methods: {
      login() {
        this.formValidate();
        if(this.isFormEmpty()) {
            return;
        }
        let data = {
          email: this.$v.form.email.$model,
          password: this.$v.form.pass.$model,
        }
        this.$store.dispatch('login', data)
       .then(() => this.$router.push({ name: "app" }))
       .catch(err => console.log(err))
      },
      validateState(value) {
            const {$dirty, $error} = this.$v.form[value];
            return $dirty ? !$error: null;
      },
      formValidate() {
          this.$v.form.$touch();
          if(this.$v.form.$anyError) {
              return;
          }
      },
      isFormEmpty() {
          if(this.form.email.trim() === "" || this.form.pass.trim() === ""){
              return true;
          }
      }
    },
  }
</script>
