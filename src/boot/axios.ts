import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Notify } from 'quasar';
import { useAccessToken } from '../composables/auth/index';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: '/api/' });

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // Do not add headers for these urls
  const noAuthUrls = ['auth/login', 'auth/register']

  // Request interceptor
  api.interceptors.request.use((config) => {
    const accessToken = useAccessToken();
    const newConfig = config;
    if (accessToken.value) {
      const token = accessToken.value.token;
      if (token && noAuthUrls.indexOf(newConfig.url as any) === -1)  {
        newConfig.headers.Authorization = 'Bearer ' + token;
      }
    }

    return newConfig;
  });

  // Response interceptor
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err: AxiosError) => {
      Notify.create({
        type: 'negative',
        position: 'top',
        message: err.response?.data.message
          ? err.response.data.message
          : 'Something went wrong',
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        const accessToken = useAccessToken();
        accessToken.value = null;
        await router.replace({ name: 'Login' });
      }
      throw err;
    }
  );

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
