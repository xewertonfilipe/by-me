<template>
  <b-container class="container">
    <b-form @submit.stop.prevent="register" class="form-account">
      <b-form-group id="account-email">
        <b-form-input
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
        <b-form-input
          id="input-password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          type="password"
          placeholder="Senha"
          aria-describedby="required-password"
        ></b-form-input>
        <b-form-invalid-feedback id="required-password">Obrigatório.</b-form-invalid-feedback>
      </b-form-group>
      <b-button v-bind:disabled="submitActive" block type="submit" class="btn-submit">Cadastrar</b-button>
       
       <router-link to="/">
        <b-button class="btn-back" block>Voltar</b-button>
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
        this.disableSubmit();
        let data = {
          email: this.$v.form.email.$model,
          password: this.$v.form.password.$model,
        }
        
        return new Promise(() => {
          this.$store.dispatch('register', data)
          .then(() => {
          this.toast("Cadastro realizado!", "Sucesso", "success");
        })
        .catch((error) => {
          this.toast("Erro ao cadastrar!", "Erro", "danger", error);
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
      enableSubmit() {
          this.submitActive = false;
      },
      disableSubmit() {
          this.submitActive = true;
      },
      toast(text, type, variant, error) {
        this.$bvToast.toast(text, {
          title: type,
          variant: variant,
          solid: true
        })
        this.redirect(error);
      },
      redirect(error) {
        this.enableSubmit();
        if(!error) {
            setTimeout(() => {
            this.$router.push({name: "app"});
          },1000);
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;  
  }
  
  form {
    position:fixed;
    width:100%;
    height: 500px;
    min-width: 300px;
    max-width: 500px;
    margin-top: 850px;
    padding: 90px 60px;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;

    input {
      background-color: #eee;
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      &:focus {
        outline: none;
        background-color: #fff;
      }
    }

    .btn-submit {
      border: 1px solid #ff8c00;
      background-color: #ff8c00;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-in;
    
      &:active {
        transform: scale(.9);
      }

      &:focus {
        outline: none;
      }
    }

    .btn-back {
      margin-top:100px;
      border: 1px solid #6c757d;
      background-color: #6c757d;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-in;
    
      &:active {
        transform: scale(.9);
      }

      &:focus {
        outline: none;
      }
    }
}
</style>