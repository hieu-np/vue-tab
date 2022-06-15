import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import TabMenu from 'primevue/tabmenu';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import store from './store/index'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' 
import 'primeflex/primeflex.css'
import './axios'

createApp(App)
.use(PrimeVue)
.use(router)
.use(ToastService)
.use(store)
.component('TabMenu', TabMenu)
.component('Card', Card)
.component('Button', Button)
.component('InputText', InputText)
.component('Password', Password)
.component('Toast', Toast)
.mount('#app')
