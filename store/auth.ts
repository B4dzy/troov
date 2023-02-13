import { defineStore } from 'pinia';

/**
 * @description Store qui gère l'état de l'authentification
 */
export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null as any,
        }
    },
    persist: true,
    getters: {
        /**
         * @description Vérifie si un utilisateur est connecté
         * @return {boolean} state.token
         */
        isLoggedIn(state) {
            return !!state.token;
        },
    },
    actions: {
        /**
         * @description Permet l'authentification d'un utilisateur via son email & mdp puis stock le token JWT dans le state 'token'
         * @param {any} loginForm
         */
        async login(loginForm: any) {
            const config = useRuntimeConfig();

            await $fetch(`${config.public.API_BASE_URL}/auth`, {
                method: 'POST',
                body: loginForm
            })
                .then(response => {
                    this.token = response as any;
                })
                .catch(error => { throw error })
        },
        /**
         * @description Permet de déconnecter un utilisateur connecté en réinitialisant le state stocké 'token'
         */
        async logout() {
            this.token = null;
        }
    }
})