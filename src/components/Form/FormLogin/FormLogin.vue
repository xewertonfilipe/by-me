<template>
    <b-container class="flex-login">
      <b-form @submit.stop.prevent="login" v-if="show" class="form-login">
        <b-form-group id="login-email">
          <b-form-input class="text-center"
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
          <b-form-input class="text-center"
            id="input-login-pass"
            v-model="$v.form.pass.$model"
            :state="validateState('pass')"
            type="password"
            placeholder="Senha"
            aria-describedby="required-pass"
          ></b-form-input>
          <b-form-invalid-feedback id="required-pass">Obrigatório.</b-form-invalid-feedback>
        </b-form-group>
        <b-button v-bind:disabled="submitActive" block type="submit" class="btn-space">Entrar</b-button>
        <router-link to="/cadastro">
          <b-button block variant="success">Criar Conta</b-button>
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
        this.disableSubmit();
        let data = {
          email: this.$v.form.email.$model,
          password: this.$v.form.pass.$model,
        }
        return new Promise(() => {
           this.$store.dispatch('login', data)
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
        this.$bvToast.toast('Logado com sucesso!', {
          title: `Sucesso`,
          variant: variant,
          solid: true
        })
        setTimeout(() => {
          this.$router.push({name: "app"});
          this.enableSubmit();
        },1000);
      },
      toastError(variant = null) {
        this.$bvToast.toast('Erro ao efetuar login!', {
          title: `Erro`,
          variant: variant,
          solid: true
        })
        this.enableSubmit();
      }
    },
  }
</script>
<style>
  .flex-login {
    width: 375px;
    height: 667px;
    display:flex;
    flex-flow:row nowrap;
    justify-content: center;
    align-items: center;
  }
  .form-login {
    width: 30%;
    height: 20%;
  }
  .btn-space {
    margin-bottom: 5px;
  }
</style>
