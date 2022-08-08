import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VModal from 'vue-js-modal'
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate/dist/vee-validate.full.esm'
// import vSelect from "vue-select";

// Vue.component("v-select", vSelect);

// Vue.use(VModal)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

library.add(fas)
library.add(fab)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = 'https://translation.api.shrbat.com/api'
Vue.use(VueAxios, axios)
