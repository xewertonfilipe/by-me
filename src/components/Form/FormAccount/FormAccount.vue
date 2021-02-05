<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" v-if="show">
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
        id="account-first-pass"
      >
        <b-form-input
          id="input-first-pass"
          v-model="$v.form.firstPass.$model"
          :state="validateState('firstPass')"
          type="password"
          placeholder="Senha"
          aria-describedby="required-pass"
        ></b-form-input>

        <b-form-invalid-feedback id="required-pass">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="account-second-pass"
      >
        <b-form-input
          id="input-second-pass"
          v-model="$v.form.secondPass.$model"
          :state="validateState('secondPass')"
          type="password"
          placeholder="Confirmar senha"
          aria-describedby="required-pass"
        ></b-form-input>

        <b-form-invalid-feedback id="required-pass">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="success" pill>Criar Conta</b-button>
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
          email: '',
          firstPass: '',
          secondPass: '',
        },
        show: true
      }
    },
    validations: {
      form: {
        email: {
          required,
        },
        firstPass: {
          required,
          minLength: minLength(4)
        },
        secondPass: {
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
      onSubmit(event) {
        event.preventDefault()
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>
