<template>
  <b-container>
    <div
      class="pointer"
      @click="showModal"
    >
      <b-avatar
        icon="people-fill"
        size="3rem"
      />
      <span
        class="info_user"
        v-text="user.first_name"
      />
    </div>
    <b-modal
      ref="my-modal"
      hide-footer
      @hide="loadData"
    >
      <template #modal-title>
        Perfil
      </template>
      <b-form @submit.stop.prevent="updateUser">
        <b-form-group id="profile-first-name">
          <b-form-input
            id="input-first-name"
            v-model="form.first_name"
            :readonly="inputActive"
            :state="validateState('first_name')"
            type="text"
            placeholder="Nome"
            aria-describedby="required-name"
          />
          <b-form-invalid-feedback id="required-name">
            Obrigatório.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="profile-email">
          <b-form-input
            id="input-email"
            v-model="form.email"
            :readonly="inputActive"
            :state="validateState('email')"
            type="email"
            placeholder="E-mail"
            aria-describedby="required-email"
          />
          <b-form-invalid-feedback id="required-email">
            Obrigatório.
          </b-form-invalid-feedback>
        </b-form-group>
        <div class="flex-profile">
          <div>
            <b-button
              class="btn-profile"
              @click="enableForm"
            >
              <b-icon icon="pencil-square" />
            </b-button>
          </div>
          <div>
            <b-button
              :disabled="submitActive"
              type="submit"
              variant="success"
              class="btn-profile"
              @click="showLoad"
            >
              Salvar
              <b-spinner
                v-show="show"
                label="Loading..."
              />
            </b-button>
          </div>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    data() {
      return {
        show: false,
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
            return new Promise(() => {
                this.$store.dispatch('getProfile', dataUser)
                .then((res) => {
                    this.setUser(res)
                })
                .catch(() => {
                    this.toastError("danger");
                })
            })
        },
        updateUser() {
            this.ValidateTouch();
            if(this.isFormEmpty()) {
                return;
            }
            this.showLoad();
            this.disableForm();
            const data = this.user;
            return new Promise(() => {
                this.$store.dispatch('update', data)
                .then(() => {
                    this.toastSuccess("success");
                    this.hideModal();
                    this.stopLoad();
                })
                .catch(() => {
                this.toastError("danger");
                })
            })
        },
        setUser(data) {
            this.user.first_name = data.data.data.first_name;
            this.user.email = data.data.data.email;
            this.form.first_name = data.data.data.first_name;
            this.form.email = data.data.data.email;
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        showLoad() {
            this.show = true;
        },
        stopLoad() {
            this.show = false;
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
        },
        toastSuccess(variant) {
            this.$bvToast.toast('Edição realizada com sucesso!', {
                title: `Sucesso`,
                variant: variant,
                solid: true
            })
        },
        toastError(variant = null) {
            this.$bvToast.toast('Erro ao editar!', {
                title: `Erro`,
                variant: variant,
                solid: true
            })
        },
    },
}
</script>
<style lang="scss">
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
    .btn-profile {
        font-size: 1rem !important;
        font-weight: bold !important;
        padding: 5px 15px !important;
        letter-spacing: 1px !important;
        cursor: pointer;
        transition: transform .1s ease-in;
        &:active {
            transform: scale(.9);
        }
        &:focus {
            outline: none;
        }
    }
     .spinner-border {
        width: 1rem !important;
        height: 1rem !important;
        position: absolute;
        margin-left: -35px;
        margin-top: 5px;
    }
</style>