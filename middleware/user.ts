import { useAuthStore } from "~~/store/auth";

/**
 * @description Redirige les utilisateurs connectés vers la page principale s'ils essaient d'accéder à une page "guest"
 * @return {object} navigateTo - /
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    if (auth.token) {
        return navigateTo("/");
    }
});