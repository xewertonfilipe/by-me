<template>
    <div>
        <h1>Teste de Coordenadas</h1>
        <p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</p>
        <div>
            <form>
            <div>
                <input type="text" placeholder="Digite seu endereço">
                <button v-on:click.prevent="locate">Permitir localização</button>
            </div>
            <div>
                <select v-model="type">
                    <option value="restaurant">Restaurant</option>
                </select>
            </div>
            <div>
                <select v-model="radius">\
                    <option value="5">5 Km</option>
                    <option value="10">10 Km</option>
                    <option value="15">15 Km</option>
                    <option value="20">20 Km</option>
                </select>
            </div>
            <button v-on:click.prevent="find">Procurar</button>
        </form>
        </div>
        <div v-for="place in places" :key="place.id">
            <div>{{place.name}}</div>
            <div>{{place.vicinity}}</div>
        </div>
        <div>
            <GmapMap
            :center="{lat: 0, lng: -50.1245}"
            :zoom="5"
            style="width:100%; height:500px;"
        ></GmapMap>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            },
            type: "",
            radius: "",
            places: []
        }
    },
    created() {
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
                console.log("coordinates", coordinates);
                console.log("this.coordinates", this.coordinates);
            })
            .catch(error => alert(error));
    },
    methods: {
        locate() {
            this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
                // console.log("coordinates", coordinates);
                // console.log("this.coordinates", this.coordinates);
            })
            .catch(error => alert(error));
            // nagivator.geolocation.gutCurrentPosition(
            //     position => {},
            //     error => {
            //         console.log("Erro getLocation");
            //     }
            // )
        },
        find() {
            console.log("lat: ", this.coordinates);
            console.log("type: ", this.type);
            console.log("radius: ", this.radius);

            //For Cors add https://cors-anywhere.herokuapp.com/
            const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.coordinates.lat},${this.coordinates.lng}&type=${this.type}&radius=${this.radius * 1000}&key=AIzaSyDJVZPOwzIn--aX6FRwqTB_V_L1O6Skb-Q`;
                            
            axios
                .get(URL)
                .then(response => {
                    this.places = response.data.results;
                })
                .catch(error => {
                    console.log(error.message);
                })
        },
        // addLocationsToMaps() {
        //     const 
        // }
    }
}
</script>