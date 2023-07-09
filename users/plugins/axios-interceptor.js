// plugins/axios-interceptor.js

export default function ({ $axios, store }) {
    // Add an interceptor to inject the bearer token
    $axios.onRequest((config) => {
      // Retrieve the token from your preferred source (e.g., Vuex store, localStorage)
      const token = localStorage.getItem('auth-token');
      console.log(token)
    //   const token = store.state.auth.token;
  
      // Add the token to the request header
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
  
      return config;
    });
  }
  