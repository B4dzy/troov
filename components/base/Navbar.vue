<template>
    <div>
        <div class="bg-white dark:bg-gray-800 shadow-md z-40">
            <nav class="container px-6 py-2 mx-auto md:flex md:justify-between md:items-center">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/">
                        <img class="w-32" :src="`/images/logo-${$colorMode.preference}.png`" alt="logo">
                    </NuxtLink>

                    <div @click="showMenu = !showMenu" class="flex md:hidden">
                        <button type="button"
                            class="text-gray-800 dark:text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <ul :class="showMenu ? 'flex' : 'hidden'"
                    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10  md:mt-0">

                    <DarkModeButton />

                    <div class="flex items-center" v-if="isLoggedIn">
                        <p v-if="!pending && !error" class="mr-6 text-secondary dark:text-white">
                            <span class="font-bold">
                                {{ user.username }} ({{ user.email }})
                            </span>
                        </p>

                        <div class="space-x-2">
                            <NuxtLink to="/items/create"><Button text="Ajouter un objet" /></NuxtLink>

                            <button
                                class="px-6 py-2 text-sm transition-colors duration-300 rounded-full shadow-xl text-white uppercase font-semibold bg-red-400 hover:bg-red-400/80"
                                v-on:click="logout">
                                Déconnexion
                            </button>
                        </div>
                    </div>

                    <NuxtLink v-else :to="$route.name === 'login' ? '/register' : '/login'">
                        <Button :text="$route.name === 'login' ? 'S\'inscrire' : 'Se connecter'" />
                    </NuxtLink>

                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '~/store/auth';

export default {
    data() {
        const auth = useAuthStore();
        const config = useRuntimeConfig();
        const router = useRouter();

        if (auth.token) {
            const { pending, data: user, error } = useLazyFetch(`${config.public.API_BASE_URL}/auth/me`, {
                headers: {
                    "Authorization": "Bearer " + auth.token
                },
            });

            //TODO: Faire un middleware qui vérifie si le token JWT a expiré
            // Shitcode qui permet de logout un utilisateur qui est connecté mais que le token JWT a expiré
            if (error && error.value) {
                auth.logout()
                    .then((_response) => router.go())
                    .catch((error) => console.log("API error", error));
            }

            return {
                showMenu: false,
                isLoggedIn: auth.isLoggedIn,
                pending: pending,
                error: error,
                user: user,
                colorMode: useColorMode()
            }
        }

        return {
            showMenu: false,
            isLoggedIn: auth.isLoggedIn,
        }
    },
    methods: {
        logout() {
            const auth = useAuthStore();
            const router = useRouter();

            auth.logout()
                .then((_response) => router.go())
                .catch((error) => console.log("API error", error));
        }
    }
};
</script>