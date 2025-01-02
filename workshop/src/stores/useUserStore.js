import { defineStore } from 'pinia';
import { getCurrentUser, loginUser } from '../services/authServices';
import { getCookie, setCookie } from '../utils/cookieUtils';

const LOGIN_EXPIRATION_MINS = 30;
const COKIE_NAME = 'userToken';

export const useUserStore = defineStore('userStore', {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    isUserLoged: state => !!state.user?.username,
  },
  actions: {
    async loginUser(loginData) {
      const profile = await loginUser(loginData, LOGIN_EXPIRATION_MINS);
      if (!profile)
        return false;
      this.user = profile;
      setCookie('userToken', profile.accessToken, LOGIN_EXPIRATION_MINS);
    },
    async reAuthUser() {
      if (this.user)
        return false;
      const persistedUserToken = getCookie(COKIE_NAME);
      if (!persistedUserToken)
        return false;
      const profile = await getCurrentUser(persistedUserToken);
      if (profile) {
        this.user = profile;
        return true;
      }
      return false;
    },

  },
});
