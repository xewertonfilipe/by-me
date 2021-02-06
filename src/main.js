import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDJVZPOwzIn--aX6FRwqTB_V_L1O6Skb-Q",
  },
  installComponents: true,
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
