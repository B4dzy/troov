import { useAuthStore } from "~~/store/auth";

/**
 * @description Redirige les utilisateurs non connecté vers la page de connexion s'ils essaient d'accéder à une page "user"
 * @return {object} navigateTo - /login
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    if (!auth.token) {
        return navigateTo("/login");
    }
});