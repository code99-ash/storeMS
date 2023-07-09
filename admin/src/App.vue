<template>
  <section>
    <header class="header">
      <nav class="container header-nav">
        <router-link :to="{name: 'Home'}" class="logo">Classilicious</router-link>
        <div class="flex items-center gap-x-3">
          <router-link :to="{name: 'Home'}" class="links">Snacks & Treats</router-link>
          <router-link :to="{name: 'Orders'}" class="links">
            Orders <span class="px-2 py-1 text-orange-400">0</span>
          </router-link>
        </div>
        <button class="account-btn group" @click="logout">
          <span>Logout</span> <i class="pi pi-sign-out text-xs group-hover:text-white ml-1"></i>
        </button>
      </nav>
    </header>
    <div class="container py-[20px]">
      <div class="w-[300px] h-max p-2 space-y-2 z-[50] fixed top-0 right-0 mt-[65px]">
        <TransitionGroup name="list">
          <FeedbackItem :feedback="f" v-for="f in $store.state.feedbacks" :key="f.id" />
        </TransitionGroup>
      </div>
      
      <router-view/>
    </div>
  </section>
</template> 

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'
import { production } from '@/utils'
import store from '@/store'
import axios from '@/axios-interceptor'
import { useRouter } from 'vue-router'
// import { productionHost } from '@/utils'

// import { io } from 'socket.io-client'

const router = useRouter()

const logout = () => {
  store.dispatch('auth/logout')
  if(production == 'false') {
    window.location = 'http://localhost:8080';
  }else {
    window.location = window.location.origin
  }
}

onBeforeMount(() => {
  axios.interceptors.response.use(undefined, function (err) {
    console.log(err, err.response.status)
    return new Promise(function () {
      if(err.response.status == 403) {
        return router.push({name: 'Invalid'})
      }
      if (err.response.status >= 400 && err.response.status < 403 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        store.dispatch('auth/logout')
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });

})

onMounted(async() => {
  await store.dispatch('products/fetchProducts');
  await store.dispatch('orders/fetchOrders');

  // const socket = io('http://localhost:5002')

  // // Check if the socket is defined before using it
  // if(socket) {
  //   socket.on('orderChannel', (message) => {
  //     console.log(message.data)

  //     const { method, data } = message.data;
  //     if(method == 'create') {
  //       store.dispatch('addProduct', data)
  //     }
  //   })
  // }
})

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  @apply bg-white border-b border-slate-300;
}
.header-nav {
  @apply flex items-center justify-between py-[20px] min-h-[65px];

  .links {
    @apply px-[12px] py-[8px] text-slate-500 text-lg bg-slate-50 hover:shadow transition-all
    hover:rounded-full duration-1000;
  }
}
.account-btn {
  @apply border border-[#7C3100] text-[#7C3100] font-bold px-[12px] py-[8px] rounded
  hover:bg-[#7C3100] hover:text-[#fff] transition-all;
}
.logo {
  @apply text-[#7C3100] font-medium text-3xl;
}

@media (max-width: 600px) {
  .header {
    // @apply fixed h-[100vh] w-full;
    .header-nav {
      .logo {
        @apply text-base;
      }
      div {
        .links {
          @apply text-sm;
        }
      }
    }
  }
  .account-btn {
    @apply border-none;

    span {
      @apply hidden;
    }
    .pi {
      @apply text-slate-800;
    }
  }
}
</style>
