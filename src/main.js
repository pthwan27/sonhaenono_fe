import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/api/vueBootstrap.js";
import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
import "boxicons";

Vue.config.productionTip = false;
Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
