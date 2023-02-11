<template>
    <div>
        <div class="bg-white dark:bg-gray-800 shadow-md">
            <nav class="container px-6 py-2 mx-auto md:flex md:justify-between md:items-center">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/">
                        <img class="w-32" :src="`images/logo-${$colorMode.value}.png`" alt="logo">
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
                        <p v-if="!pending" class="mr-6 text-secondary dark:text-white"><span class="font-bold">{{ user.username }} ({{ user.email }})</span></p>

                        <button class="px-6 py-2 text-sm transition-colors duration-300 rounded-full shadow-xl text-white uppercase font-semibold bg-red-400 hover:bg-red-400/80" v-on:click="logout">Déconnexion</button>
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

        if (auth.token) {
            const { pending, data: user } = useLazyFetch(`${config.public.API_BASE_URL}/auth/me`, {
                headers: {
                    "Authorization": "Bearer " + auth.token
                },
            });

            return {
                showMenu: false,
                isLoggedIn: auth.isLoggedIn,
                pending: pending,
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