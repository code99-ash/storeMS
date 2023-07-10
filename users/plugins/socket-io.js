import Vue from 'vue';
import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_ORDERCONSUMER_BASE);

Vue.prototype.$socket = socket;
