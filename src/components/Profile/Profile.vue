<template>
<div>
    <div @click="showModal" class="pointer">
        <b-avatar icon="people-fill" size="3rem"></b-avatar>
        <span v-text="user.first_name" class="info_user"></span>
    </div>
    <b-modal ref="my-modal" hide-footer @hide="loadData">
        <template #modal-title>
            Perfil
        </template>
        <b-form @submit.stop.prevent="updateUser">
            <b-form-group id="profile-first-name">
                <b-form-input
                :readonly="inputActive"
                id="input-first-name"
                v-model="form.first_name"
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
                v-model="form.email"
                :state="validateState('email')"
                type="email"
                placeholder="E-mail"
                aria-describedby="required-email"
                ></b-form-input>
                <b-form-invalid-feedback id="required-email">Obrigatório.</b-form-invalid-feedback>
            </b-form-group>
            <div class="flex-profile">
                <div>
                    <b-icon v-on:click="enableForm" icon="pencil-square" font-scale="2"></b-icon>
                </div>
                <div>
                    <b-button v-bind:disabled="submitActive" type="submit" variant="success">Salvar</b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    data() {
      return {
        inputActive: true,
        submitActive: true,
        user: {
            first_name: "",
            email: ""
        },
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
            this.ValidateTouch();
            if(this.isFormEmpty()) {
                return;
            }
            this.disableForm();
            const data = this.user;
            this.$store.dispatch('update', data)
            .then(() => this.hideModal())
            .catch(err => console.log("Erro Update", err))
        },
        setUser(data) {
            this.user.first_name = data.data.data.first_name;
            this.user.email = data.data.data.email;
            this.form.first_name = data.data.data.first_name;
            this.form.email = data.data.data.email;
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
        loadData() {
            this.getuser();
            this.disableForm();
        },
        validateState(value) {
            const {$dirty, $error} = this.$v.form[value];
            return $dirty ? !$error: null;
        },
        ValidateTouch() {
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return;
            }
        },
        isFormEmpty() {
            if(this.form.first_name.trim() === "" || this.form.email.trim() === ""){
                return true;
            }
        }
    },
}
</script>
<style >
    .pointer {
        cursor: pointer;
    }
    .info_user {
        display:inline-block;
        margin-left:10px;
    }
    .flex-profile {
        display:flex;
        justify-content:space-between;
    }
</style>