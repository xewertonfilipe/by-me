<template>
<div>
    <b-container fluid class="flex-presetation gradient">
        <div><Profile /></div>
        <div><Logout /></div>
    </b-container>
        <SearchPlace />
</div>
</template>

<script>
import Profile from "@/components/Profile/Profile";
import Logout from "@/components/Logout/Logout";
import SearchPlace from "@/components/SearchPlace/SearchPlace";
export default {
    components: {
        Profile,
        Logout,
        SearchPlace
    }
}
</script>
<style >
    .gradient {
        height:auto;
        padding: 40px 0;
        color:#fff;
        font-size:20px;
        text-align:center;
        background-image: linear-gradient(to bottom, red, yellow 130%);
    }
    .flex-presetation{
        display:flex;
        justify-content:space-around;
        height:160px;
    }
</style>