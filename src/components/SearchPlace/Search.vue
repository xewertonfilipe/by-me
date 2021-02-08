<template>
    <div>
        <div>
            <input v-model="searchFor" type="text" placeholder="Pesquise no ByMe">
            <button v-on:click.prevent="locate">Permitir localização</button>
            <button v-on:click.prevent="findPlaces">Procurar</button>
        </div>
    
        <b-list-group v-for="place in places" :key="place.id">
            <b-list-group-item>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{place.name}}</h5>
                    <small>Favorito</small>
                </div>
                <p class="mb-1">
                    {{place.vicinity}}
                </p>

                <div>
                    <b-button variant="info" class="btn-comments" id="show-btn" v-on:click="showModal(place.place_id)">Comentários</b-button>
                    <b-button variant="success"  id="show-btn-rate" v-on:click="showModal(place.place_id+1)">Avaliar</b-button>

                    <b-modal :ref="place.place_id" hide-footer>
                        <template #modal-title>
                            {{place.name}}
                        </template>
                        <div class="d-block text-center">
                            <b-card-group v-for="(comment) in comments" :key="comment.id" deck>
                                <b-card v-if="comment.id == place.place_id" header="User comment" class="text-center">
                                    <b-card-text>{{comment.info}}</b-card-text>
                                </b-card>
                            </b-card-group>
                            <br>
                        </div>
                    </b-modal>

                    <b-modal :ref="place.place_id+1" hide-footer>
                        <template #modal-title>
                            {{place.name}}
                        </template>
                        <div>
                            <b-form-textarea
                                id="textarea"
                                v-model="text"
                                placeholder="Comentário..."
                                rows="1"
                                max-rows="3"
                            ></b-form-textarea>
                        </div>
                        <div class="addComent">
                            <b-button 
                                v-on:click="addComments(place.place_id), hideModal(place.place_id+1)" 
                                block
                                squared
                                variant="outline-primary"
                            >Comentar</b-button>
                        </div>
                    </b-modal>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            },
            searchFor: "",
            text: "",
            radius: 5000,
            places: [],
            favorite: [],
            comments: [{
                id: "ChIJg7E35KQZqwcRgNT9YzxIRaA",
                info: [{
                        userComment: {},
                        message: "Ok."
                    }]
            },{
                id: "ChIJj02Y0UwZqwcRxzV2ecjz5Ac",
                info: [{
                        userComment: {},
                        message: "Its god."
                    }]
            },{
                id: "ChIJd_G937sZqwcRQUpWEOCJPF8",
                info: [{
                        userComment: {},
                        message: "Its great."
                    }]
            }],
            key: "AIzaSyDJVZPOwzIn--aX6FRwqTB_V_L1O6Skb-Q"
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
        locate() {
            this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => console.error("locate", error));
        },
        findPlaces() {
            //For Cors add https://cors-anywhere.herokuapp.com/URL
            const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.coordinates.lat},${this.coordinates.lng}&keyword=${this.searchFor}&radius=${this.radius}&key=${this.key}`;
            
            this.$axios
                .get(URL)
                .then(response => {
                    console.log("Result", response.data.results);
                    this.places = response.data.results;
                })
                .catch(error => {
                    console.log("find", error.message);
                })
        },
        addComments(place_id) {
            this.searchPlaceIdInComments(place_id);
            this.clearValue();
        },
        searchPlaceIdInComments(place_id) {
            const newComment = this.comments;
            newComment.forEach(function(comment) {
                if (comment.id === place_id) {
                    this.comments.info.unshift({
                        userComment: {},
                        message: this.text
                    });
                } else {
                    this.comments.unshift({
                    id: place_id,
                    info: {
                        userComment: {},
                        message: this.text
                    }
                    });
                }
            });
        },
        clearValue() {
            this.text = "";
        },
        showModal(place_id) {
            console.log("place_id", place_id);
            console.log("refs", this.$refs[place_id][0]);
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
    .addComent {
        margin-top: 5px;
    }
</style>