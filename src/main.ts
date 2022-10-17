import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/router';
import stringState, { key } from './store/stringState';

const app = createApp(App);

app.use(stringState, key)
app.use(router)
app.mount('#app')
