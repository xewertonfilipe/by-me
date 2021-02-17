<template>
    <b-container class="container-search-place">
        <b-row>
            <b-col>
                <b-form @submit.stop.prevent="findPlaces" class="form-search-place">
                    <b-form-group id="search-place">
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-button v-on:click.prevent="locate" variant="outline-secondary" class="btn-search" v-b-popover.hover.top="'Localização'">
                                    <b-icon icon="disc" animation="throb"></b-icon>
                                </b-button>
                            </b-input-group-prepend>
                            <b-form-input class="text-center"
                                id="input-search-place"
                                v-model="$v.form.searchFor.$model"
                                :state="validateState('searchFor')"
                                type="text"
                                aria-describedby="required-searchFor"
                                autocomplete="off"
                                placeholder="Pesquise no ByMe"
                            ></b-form-input>
                            <b-button v-bind:disabled="show" type="submit" class="btn-search" v-b-popover.hover.top="'Busca'">
                                <b-icon icon="search"></b-icon>
                                <b-spinner v-show="show" label="Loading..."></b-spinner>
                            </b-button>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-card v-show="show">
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="55%"></b-skeleton>
            <b-skeleton animation="wave" width="70%"></b-skeleton>
        </b-card>
        <b-list-group v-for="(local, index) in allInfo.places" :key="index">
            <b-list-group-item>
                <div class="d-flex w-100 justify-content-between">
                    <h5>{{local.name}}</h5>
                     <small>
                         <div>
                             <star-rating @rating-selected="setfavorite(local.place_id)" v-bind:rating="0" v-bind:max-rating="1" v-bind:show-rating="false" v-bind:star-size="30" clearable></star-rating>
                         </div>
                     </small>
                </div>
                <div>{{local.vicinity}}</div>
                <div>
                    <b-button v-on:click="showModal(index), allData()" class="btn-place btn-comments" id="show-btn">Comentários</b-button>
                    <b-button v-on:click="showModal(index+'id')" class="btn-place btn-rate" id="show-btn-rate" >Avaliar</b-button>
                    <b-modal :ref="index" hide-footer class="overflow">
                        <template #modal-title>
                        </template>
                            <b-card-group v-for="(comment, index) in allInfo.allComments" :key="index" class="d-block text-center" deck style="max-height: 20rem;">
                                <div v-if="comment.placeId == local.place_id">
                                    <b-card header="User comment" class="text-center spacing-top">
                                        <star-rating read-only v-model="comment.rating" v-bind:show-rating="false" v-bind:star-size="25" class="start-comment"></star-rating>
                                        <b-card-text class="message">{{comment.message}}</b-card-text>
                                    </b-card>
                                </div>
                            </b-card-group>
                    </b-modal>
                    <b-modal :ref="index+'id'" hide-footer @hidden="clearValue">
                        <template #modal-title>
                            {{local.name}}
                        </template>
                        <b-form @submit.stop.prevent="addComments(index, local.place_id)">
                            <star-rating @rating-selected="setRating" v-bind:show-rating="false" v-bind:star-size="30" class="spacing-start"></star-rating>
                            <b-form-group id="comment-text">
                                <b-form-textarea class="overflow"
                                    id="comment-textarea"
                                    v-model="$v.form.text.$model"
                                    :state="validateState('text')"
                                    placeholder="Comentário..."
                                    rows="1"
                                    max-rows="3"
                                    aria-describedby="required-textarea"
                                ></b-form-textarea>

                                <b-form-invalid-feedback id="required-textarea">Obrigatório.</b-form-invalid-feedback>

                                <div class="spacing-top btn-color">
                                    <b-button 
                                        type="submit"
                                        block
                                        squared
                                    >Comentar</b-button>
                                </div>
                            </b-form-group>
                        </b-form>                       
                    </b-modal>
                </div>
            </b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import StarRating from 'vue-star-rating'

export default {
    components: {
        StarRating,
    },
    mixins: [validationMixin],
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            },
            show: false,
            form: {
                text: "",
                rating: 0,
                searchFor: ""
            },
            key: "AIzaSyDJVZPOwzIn--aX6FRwqTB_V_L1O6Skb-Q",
            favorite: '',
            radius: 5000,
            allInfo: [],
            places: [],
            newsFavorites: [],
            allFavorites: [],
            favorites: [],
            newsComments: [],
            allComments: [],
            comments: [{
                    id: 1,
                    userId: 1,
                    Name: "",
                    email: "",
                    message: "Ok.",
                    rating: 3,
                    placeId: "ChIJUwgu86sZqwcRCzsc964cW84",
                    favorite: 1,
                    date: "2021-02-02 11:50:30"
                },{
                    id: 2,
                    userId: 3,
                    Name: "",
                    email: "",
                    message: "Nice",
                    rating: 5,
                    placeId: "ChIJUwgu86sZqwcRCzsc964cW84",
                    favorite: 1,
                    date: "2021-02-04 11:50:30"
                },{
                    id: 2,
                    userId: 4,
                    Name: "",
                    email: "",
                    message: "Its god",
                    rating: 5,
                    placeId: "ChIJUwgu86sZqwcRCzsc964cW84",
                    favorite: 0,
                    date: "2021-02-05 11:50:30"
                },{
                    id: 2,
                    userId: 4,
                    Name: "",
                    email: "",
                    message: "Its great!",
                    rating: 5,
                    placeId: "ChIJUwgu86sZqwcRCzsc964cW84",
                    favorite: 0,
                    date: "2021-02-07 11:50:30"
            }],
        }
    },
    validations: {
      form: {
        text: {
          required,
          minLength: minLength(4)
        },
        searchFor: {
            required,
            minLength: minLength(2)
        }
      }
    },
    created() {
        this.$getLocation({})
        .then(coordinates => {
            this.coordinates = coordinates;
        })
        .catch(error => console.error("windowsLocation ", error));
    },
    methods: {
        validateState(value) {
            const {$dirty, $error} = this.$v.form[value];
            return $dirty ? !$error: null;
        },
        locate() {
            this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => console.error("locate", error));
        },
        findPlaces() {
            if(this.isEmpty(this.form.searchFor)) {
                this.validateForm();
                return
            }
            this.showLoad();
            this.clearPlaces();
            //For Cors add https://cors-anywhere.herokuapp.com/
            const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.coordinates.lat},${this.coordinates.lng}&keyword=${this.form.searchFor}&radius=${this.radius}&key=${this.key}`;

            return new Promise(() => {
                this.$axios.get(URL)
                .then(response => {
                    this.places = response.data.results;
                    this.allData();
                    this.stopLoad();
                })
                .catch(() => {
                    this.toastError("danger")
                    this.stopLoad();
                })
            })
        },
        clearPlaces() {
            this.allInfo.places = "";
        },
        showLoad() {
            this.show = true;
        },
        stopLoad() {
            this.show = false;
        },
        isEmpty(value) {
            if(value.trim() == "")
                return true;
        },
        allData() {
            this.allInfo = {
                allComments: [...this.comments, ...this.newsComments],
                places: this.places,
                newsFavorites: this.newsFavorites
            } 
        },
        setfavorite(placeId) {
            this.favorite = true;
            // this array: user, placeId, favorite.
            this.newsFavorites.push({user: 2, placeId: placeId, favorite: 1});
            console.log("Favorito", this.favorite);
            this.comandFavorite();
        },
        comandFavorite() {
            if (this.getFavorite()) {
                this.favorite = false;
                return this.toastFavorite();
            }
            if (!this.getFavorite()) {
                this.favorite = true;
                return this.toastRemoveFavorite();
            }
        },
        getFavorite() {
            return this.favorite;
        },
        addComments(index, place_id) {
            if(this.validateForm()) {
                return;
            }
            this.newsComments.push({
                userId: 20,
                Name: "",  //user logged
                email: "",
                message: this.$v.form.text.$model,
                rating: this.getRating(),
                placeId: place_id,
                favorite: null,
                date: new Date()
            });
            this.clearValue();
            this.hideModal(index+'id');
        },
        setRating(rating) {
            this.form.rating = rating;
        },
        getRating() {
            return this.form.rating;
        },
        validateForm() {
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return true;
            }
        },
        clearValue() {
            this.$v.form.text.$model = "";
        },
        showModal(index) {
            this.$refs[index][0].show();
        },
        hideModal(index) {
            this.$refs[index][0].hide()
        },
        toast(text, type, variant, error) {
        this.$bvToast.toast(text, {
          title: type,
          variant: variant,
          solid: true
        })
        console.log("Error login:", error);
        this.redirect(error);
      },
        toastFavorite(variant) {
            this.$bvToast.toast('Adicionado!', {
                title: `Favorito`,
                variant: variant,
                solid: true
            })
        },
        toastRemoveFavorite(variant) {
            this.$bvToast.toast('Removido!', {
                title: `Favorito`,
                variant: variant,
                solid: true
            })
        },
        toastError(variant) {
            this.$bvToast.toast('Erro ao buscar!', {
                title: `Erro`,
                variant: variant,
                solid: true
            })
        },
    },
}
</script>

<style lang="scss"> 
    .container-search-place {
        background:#fff;
        position:relative;
        margin-top:-1.5%;
        padding-top:1.5%;
        padding-bottom:1%;
        border-radius: 10px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
        background: linear-gradient(to bottom, #efefef, #ccc);
        transition: all 0.5s ease-in-out;

            .form-search-place {
                b-input-group {
                    width: 50%;
                }
            }
    
            .list-group {
                border: #000 1px solid;
                margin: 2%;
            }
            .spinner-border {
                width: 1rem !important;
                height: 1rem !important;
                position: absolute;
                margin-left: -20px;
                margin-top: 3px;
            }
            .btn-search {
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
            .btn-place {
                font-size: 1rem !important;
                font-weight: bold !important;
                padding: 5px 15px !important;
                letter-spacing: 1px !important;
                cursor: pointer;
                transition: transform .1s ease-in;
                margin: 20px 5px 0px 0px;
                &:active {
                    transform: scale(.9);
                }

                &:focus {
                    outline: none;
                }
            }

            .btn-comments {
                border: 1px solid #00e1ff !important;
                background-color: #0e7a9b !important;
            }
            .btn-rate {
                border: 1px solid #057a05 !important;
                background-color: #057a05 !important;
            }
            .spacing-top {
                margin-top: 5px;
            }
            .overflow {
                overflow-y: auto !important
            }
            .btn-color {
            background-color: #ff8c00 !important;
        }
    }
    .spacing-start {
        margin-bottom:4% !important;
    }
    .vue-star-rating {
        display: block !important;
        margin-top: -2%;
        margin-bottom: 7% !important;
    }
</style>