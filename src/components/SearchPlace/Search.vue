<template>
    <b-container>
        <Menu />
        <b-row>
            <b-col>
                <b-form @submit.stop.prevent="findPlaces">
                <b-form-group id="search-place">
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-button variant="outline-info" type="submit">Buscar</b-button>
                        </b-input-group-prepend>
                        <b-form-input
                            id="input-search-place"
                            v-model="$v.form.searchFor.$model"
                            :state="validateState('searchFor')"
                            type="text"
                            aria-describedby="required-searchFor"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button variant="outline-secondary" v-on:click.prevent="locate">Permitir localização</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-form>
            </b-col>
        </b-row>
    
        <b-list-group v-for="(local, index) in places" :key="index">
            <b-list-group-item>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{local.name}}</h5>
                        <small>
                            <star-rating v-bind:max-rating="1" v-bind:show-rating="false" ></star-rating>
                        </small>
                </div>
                <p class="mb-1">
                    {{local.vicinity}}
                </p>

                <div>
                    <b-button v-on:click="showModal(local.place_id), newListComments()" variant="info" class="btn-comments" id="show-btn">Comentários</b-button>
                    <b-button v-on:click="showModal(local.place_id+1)" variant="success"  id="show-btn-rate" >Avaliar</b-button>

                    <b-modal :ref="local.place_id" hide-footer>
                        <template #modal-title>
                            {{local.name}}
                        </template>
                            <b-card-group v-for="(comment, index) in allComments" :key="index" class="d-block text-center" deck>
                                <div v-if="comment.id == local.place_id">
                                    <b-card v-for="(info, index) in comment.info" :key="index" header="User comment" class="text-center spacing-top">
                                    <star-rating read-only v-model="info.rating"></star-rating>
                                    <b-card-text>{{info.message}}</b-card-text>
                                </b-card>
                                </div>
                            </b-card-group>
                    </b-modal>

                    <b-modal :ref="local.place_id+1" hide-footer @hidden="clearValue">
                        <template #modal-title>
                            {{local.name}}
                        </template>
                        <b-form @submit.stop.prevent="addComments(local.place_id)">
                            <star-rating @rating-selected="setRating"></star-rating>
                            <b-form-group
                                id="comment-text"
                            >
                                <b-form-textarea
                                id="comment-textarea"
                                v-model="$v.form.text.$model"
                                :state="validateState('text')"
                                placeholder="Comentário..."
                                rows="1"
                                max-rows="3"
                                aria-describedby="required-textarea"
                                ></b-form-textarea>

                                <b-form-invalid-feedback id="required-textarea">Obrigatório.</b-form-invalid-feedback>

                                <div class="spacing-top">
                                    <b-button 
                                        type="submit"
                                        block
                                        squared
                                        variant="outline-primary"
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
import Menu from "@/components/Menu/Menu.vue"
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import StarRating from 'vue-star-rating'

export default {
    components: {
        StarRating,
        Menu
    },
    mixins: [validationMixin],
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            },
            form: {
                text: "",
                rating: 0,
                searchFor: ""
            },
            favorite: false,
            radius: 5000,
            places: [],
            favoritesUsers: [],
            allFavorites: [],
            newsFavorites: [],
            newsComments: [],
            allComments: [],
            comments: [{
                id: "ChIJUwgu86sZqwcRCzsc964cW84",
                info: [{
                        user: [{
                            id: 1,
                            Name: '',
                            email: '',
                            logged: true,
                        }],
                        message: "Ok.",
                        rating: 3,
                        favorite: 1
                    },{
                        user: [{
                            id: 2,
                            Name: '',
                            email: '',
                            logged: true,
                        }],
                        message: "Nice",
                        rating: 5,
                        favorite: 0
                    }]
            },{
                id: "ChIJj02Y0UwZqwcRxzV2ecjz5Ac",
                info: [{
                        user: [{
                            id: 3,
                            Name: '',
                            email: '',
                            logged: true,
                        }],
                        message: "Its god.",
                        rating: 4,
                        favorite: 0
                    }]
            },{
                id: "ChIJd_G937sZqwcRQUpWEOCJPF8",
                info: [{
                        user: [],
                        message: "Its great.",
                        rating: 4,
                        favorite: 1
                    }]
            }],
            key: "AIzaSyDJVZPOwzIn--aX6FRwqTB_V_L1O6Skb-Q"
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
            //For Cors add https://cors-anywhere.herokuapp.com/
            const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.coordinates.lat},${this.coordinates.lng}&keyword=${this.form.searchFor}&radius=${this.radius}&key=${this.key}`;
            
            this.$axios
                .get(URL)
                .then(response => {
                    console.log("Result", response.data.results);
                    this.places = response.data.results;
                })
                .catch(error => {
                    console.log("find", error.message);
                })
                console.log("Refs", this.$refs);
                this.listFavorites();

                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                }
        },
        isEmpty(value) {
            if(value.trim() == "")
                return true;
        },
        listPlaceUser() {
            //Param: userLogged
            

        },
        listFavorites() {
            return this.comments.map((comment) => {
                return comment.info.map((info) => {
                    return info.favorite;
                });
            })
        },
        addComments(place_id) {
            if(this.validateForm()) {
                return;
            }
            this.newsComments.push({
                id: place_id,
                info: [{
                        user: {},
                        message: this.$v.form.text.$model,
                        rating: this.getRating()
                    }]
            });
            this.clearValue();
            this.hideModal(place_id+1);
        },
        setRating(rating) {
            this.form.rating = rating;
        },
        getRating() {
            return this.form.rating;
        },
        toggleFavorite() {

        },
        setfavorite(value) {
            this.favorite = value;
        },
        getFvorite() {
            return this.favorite;
        },
        validateForm() {
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return true;
            }
        },
        newListComments() {
            this.allComments = [...this.comments, ...this.newsComments];
        },
        clearValue() {
            this.$v.form.text.$model = "";
        },
        showModal(place_id) {
            this.$refs[place_id][0].show();
        },
        hideModal(place_id) {
            this.$refs[place_id][0].hide()
        },
    },
}
</script>

<style>
    .btn-comments {
        margin-right: 5px;
    }
    .spacing-top {
        margin-top: 5px;
    }
    .row-size {
        width: 400px;
    }
</style>