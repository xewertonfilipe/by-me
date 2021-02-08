<template>
  <div>
    <b-form @submit.stop.prevent="register" v-if="show">
      <b-form-group
        id="account-name"
      >
        <b-form-input
          id="input-account-name"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          type="text"
          placeholder="Nome"
          aria-describedby="required-name"
        ></b-form-input>

        <b-form-invalid-feedback id="required-name">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group
        id="account-email"
      >
        <b-form-input
          id="input-account-email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          placeholder="E-mail"
          aria-describedby="required-email"
        ></b-form-input>

        <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="account-first-password"
      >
        <b-form-input
          id="input-first-password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          type="password"
          placeholder="Senha"
          aria-describedby="required-password"
        ></b-form-input>

        <b-form-invalid-feedback id="required-password">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="account-password-confirmation"
      >
        <b-form-input
          id="input-password-confirmation"
          v-model="$v.form.password_confirmation.$model"
          :state="validateState('password_confirmation')"
          type="password"
          placeholder="Confirmar senha"
          aria-describedby="required-password-confirmation"
        ></b-form-input>

        <b-form-invalid-feedback id="required-password-confirmation">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="success" pill>Criar Conta</b-button>

       <router-link to="/">
        <b-button variant="success" pill>Voltar</b-button>
      </router-link>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
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
          name : "",
          email : "",
          password : "",
          password_confirmation : "",
        },
        show: true
      }
    },
    validations: {
      form: {
        nome: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
        },
        password: {
          required,
          minLength: minLength(4)
        },
        password_confirmation: {
          required,
          minLength: minLength(4)
        }
      }
    },
    methods: {
      validateState(value) {
        const {$dirty, $error} = this.$v.form[value];
        return $dirty ? !$error: null;
      },
      register() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>
