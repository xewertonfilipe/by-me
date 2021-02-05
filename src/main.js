import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA4u5XX75E0rsCpMFt_UVeS8V1W8seSFZ4",
  },
  installComponents: true,
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
