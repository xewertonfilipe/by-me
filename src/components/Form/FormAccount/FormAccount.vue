<template>
  <b-container class="flex-account">
    <b-form @submit.stop.prevent="register" class="form-account">
      <b-form-group id="account-email">
        <b-form-input class="text-center"
          id="input-account-email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          placeholder="E-mail"
          aria-describedby="required-email"
          autocomplete="off"
        ></b-form-input>
        <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="account-password">
        <b-form-input class="text-center"
          id="input-password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          type="password"
          placeholder="Senha"
          aria-describedby="required-password"
        ></b-form-input>
        <b-form-invalid-feedback id="required-password">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-button v-bind:disabled="submitActive" block type="submit" variant="success" class="btn-space-account">Criar Conta</b-button>
       <router-link to="/">
        <b-button block >Voltar</b-button>
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
        submitActive: false,
        form: {
          email: "",
          password: "",
        },
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
      register() {
        this.formValidate();
        if(this.isFormEmpty()) {
          return;
        }
        this.disableSubmit();
        let data = {
          email: this.$v.form.email.$model,
          password: this.$v.form.password.$model,
        }
        return new Promise(() => {
          this.$store.dispatch('register', data)
          .then(() => {
          this.toastSuccess("success");
        })
        .catch(() => {
          this.toastError("danger");
          })
        })
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
          if(this.form.email.trim() === "" || this.form.pass.trim() === "") {
              return true;
          }
      },
      enableSubmit() {
          this.submitActive = false;
      },
      disableSubmit() {
          this.submitActive = true;
      },
      toastSuccess(variant) {
        this.$bvToast.toast('Cadastro realizado!', {
          title: `Sucesso`,
          variant: variant,
          solid: true
        })
        setTimeout(() => {
          this.$router.push('/');
          this.enableSubmit();
        },1000);
      },
      toastError(variant = null) {
        this.$bvToast.toast('Erro ao cadastrar!', {
          title: `Erro`,
          variant: variant,
          solid: true
        })
        this.enableSubmit();
      }
    }
  }
</script>
<style>
  .flex-account {
    width: 375px;
    height: 667px;
    display:flex;
    flex-flow:row nowrap;
    justify-content: center;
    align-items: center;
  }
  .form-account {
    width: 30%;
    height: 20%;
  }
  .btn-space-account {
    margin-bottom: 5px;
  }
</style>
