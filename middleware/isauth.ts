import { useUserStore } from '../stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();

  if (user.isAuth && to.name === 'login') {
    return navigateTo(from.name !== 'login' ? from.fullPath : '/');
  }
});