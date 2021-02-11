<template>
<div>
    <b-container fluid class="flex-presetation gradient">
        <div><Profile /></div>
        <div><Logout /></div>
    </b-container>
     <b-container class="search">
         <div>
             <SearchPlace />
        </div>
     </b-container>
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
    .search {
        background:#fff;
        position:relative;
        margin-top:-1.5%;
        padding-top:1.5%;
        padding-bottom:1%;
        border-radius: 25px;
        border:1px solid #e0dfdf;
        box-shadow: inset 0 2px 3px 0 rgba(255,255,255,.3), inset 0 -3px 6px 0 rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.2);
    }
</style>