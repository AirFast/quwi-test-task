import { defineStore } from 'pinia';

const setCookie = (name: string, value: string, expDays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);

  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig();

  const token = ref(useCookie('token').value);
  const error = reactive({
    email: '',
    password: ''
  });

  const isAuth = computed(() => {
    if (token.value && token.value !== '') {
      return true
    }

    return false;
  });

  const login = async (credentials: { email: string, password: string }) => {
    const response = await fetch(`${config.API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    response
      .json()
      .then((res) => {
        if (res.first_errors) {
          const { email, password } = res.first_errors

          error.email = email;
          error.password = password;

          return;
        }

        token.value = res.token;
        error.email = ''
        error.password = ''
        setCookie('token', res.token, 365);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const logout = async () => {
    const response = await fetch(`${config.API_BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ anywhere: true }),
    });

    response
      .json()
      .then((res) => {
        token.value = '';
        setCookie('token', '', 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    error,
    isAuth,
    login,
    logout
  };
});