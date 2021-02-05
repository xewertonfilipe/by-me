<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" v-if="show">
      <b-form-group
        id="login-email"
      >
        <b-form-input
          id="input-login-email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          placeholder="E-mail"
          aria-describedby="required-email"
        ></b-form-input>

        <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="login-pass"
      >
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

      <b-button type="submit" pill>Entrar</b-button>
      <b-button variant="success" pill>Criar Conta</b-button>
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
          pass: '',
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
