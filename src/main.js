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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';


import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' 
import 'primeflex/primeflex.css'
import './assets/flag.css'
import './assets/bag.css'

import './axios'

createApp(App)
.use(PrimeVue)
.use(router)
.use(ToastService)
.component('TabMenu', TabMenu)
.component('Card', Card)
.component('Button', Button)
.component('InputText', InputText)
.component('Password', Password)
.component('Toast', Toast)
.component('DataTable', DataTable)
.component('Column', Column)
.component('ColumnGroup', ColumnGroup)
.component('Row', Row)
.component('MultiSelect', MultiSelect)
.component('Calendar', Calendar)
.component('InputNumber', InputNumber)
.component('Dropdown', Dropdown)
.component('ProgressBar', ProgressBar)
.component('Slider', Slider)
.component('Badge', Badge)
.directive('badge', BadgeDirective)
.mount('#app')
