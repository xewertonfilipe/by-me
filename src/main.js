import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import Axios from "axios";
import store from "@/store";
import VueGeolocation from "vue-browser-geolocation";
// import StarRating from "vue-star-rating";
import * as VueGoogleMaps from "vue2-google-maps";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.component("star-rating", StarRating.default);
Vue.prototype.$axios = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$axios.defaults.headers.common["Authorization"] = token;
}

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    libraries: "places",
  },
  installComponents: true,
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
