<template>
    <div>
        <h1>Teste de Coordenadas</h1>
        <p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</p>
        <GmapMap
            :center="{lat: 10, lng: 10}"
            :zoom="7"
            style="width:100%; height:100%; position:absolute"
        ></GmapMap>
    </div>
</template>

<script>
export default {
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            }
        }
    },
    created() {
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => alert(error));
    }
}
</script>