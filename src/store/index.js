import Cookies from "js-cookie";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: Cookies.get("locale") || "en",
  },
  mutations: {},
  actions: {},
  modules: {},
});
