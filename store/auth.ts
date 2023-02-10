import { defineStore } from 'pinia';



export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null as any,
        }
    },
    persist: true,
    actions: {
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
        async logout() {
            this.token = null;
        }
    }
})