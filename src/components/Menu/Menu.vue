<template>
<div>
    <b-card class="menu">
        <div @click="showModal">
            <b-avatar icon="people-fill" size="3rem"></b-avatar>
        </div>
        <div>
            <b-icon icon="menu-button-wide"></b-icon>
        </div>
    </b-card>

    <b-modal ref="my-modal" hide-footer @hide="loadForm">
        <b-form @submit.stop.prevent="updateUser">
            <b-form-group id="profile-first-name">
                <b-form-input
                :readonly="inputActive"
                id="input-first-name"
                v-model="user.first_name"
                :state="validateState('first_name')"
                type="text"
                placeholder="Nome"
                aria-describedby="required-name"
                ></b-form-input>
                <b-form-invalid-feedback id="required-name">Obrigatório.</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="profile-email">
                <b-form-input
                :readonly="inputActive"
                id="input-email"
                v-model="user.email"
                :state="validateState('email')"
                type="email"
                placeholder="E-mail"
                aria-describedby="required-email"
                ></b-form-input>
                <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
            </b-form-group>
            <b-icon v-on:click="enableForm" icon="pencil-square" font-scale="2"></b-icon>
            <b-button v-bind:disabled="submitActive" type="submit" variant="success">Salvar</b-button>
        </b-form>
    </b-modal>
</div>
</template>

<script>
// import Profile from '../Profile/Profile'
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    components: {
        // Profile
    },
    data() {
      return {
        inputActive: true,
        submitActive: true,
        user: {},
        form: {
          first_name: "",
          email: "",
        },
      }
    },
    validations: {
      form: {
        first_name: {
          required,
          minLength: minLength(4)
        },
        email: {
          required,
        },
      }
    },
    created() {
        //fake user
        this.getuser();
    },
    methods: {
        getuser() {
            //fake user
            const dataUser = {
                id: 2,
            }
            this.$store.dispatch('getProfile', dataUser)
            .then((res) => this.setUser(res))
            .catch(err => console.log("Erro getUser", err));
        },
        updateUser() {
            this.disableForm();
            const data = this.user;
            this.$store.dispatch('update', data)
            .then(() => this.hideModal())
            .catch(err => console.log("Erro Update", err))
            
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                return;
            }
        },
        validateState(value) {
            const {$dirty, $error} = this.$v.form[value];
            return $dirty ? !$error: null;
        },
        setUser(data) {
            this.user = data.data.data
        },
        stopLoad() {
            
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        enableForm() {
            this.inputActive = false;
            this.submitActive = false;
        },
        disableForm() {
            this.inputActive = true;
            this.submitActive = true;
        },
        loadForm() {
            this.getuser();
            this.disableForm();
        },
        erro() {

        },
    },
}
</script>
<style >
    .menu {
        height:auto;
        padding: 40px 0;
        color:#fff;
        font-size:20px;
        text-align:center;
        border-radius:4px;
        border:1px solid #980021;
        box-shadow: inset 0 2px 3px 0 rgba(255,255,255,.3), inset 0 -3px 6px 0 rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.2);
        background-image: linear-gradient(to bottom, red, yellow 130%);
    }
</style>