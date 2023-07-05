import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import 'primeicons/primeicons.css'

import { io } from 'socket.io-client'

const socket = io('http://localhost:5001')

const app = createApp(App)
app.provide('$socket', socket)

app.use(store).use(router).mount('#app')
