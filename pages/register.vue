<template>
    <BaseNavbar />
    <section class="flex h-screen justify-center items-center bg-gray-200/50 dark:bg-secondary">
        <div class="bg-white dark:bg-gray-800 p-5 max-w-xl mx-auto rounded-md">
            <h2 class="text-3xl font-cursive text-secondary dark:text-primary">S'inscrire</h2>
            <form @submit.prevent="registerSubmit" class="mt-10 space-y-8">
                <input v-model="email" class="w-full border rounded h-12 px-4 focus:outline-none" placeholder="Adresse email" type="email" />

                <div class="flex items-center">
                    <input v-model="username" class="w-full border rounded h-12 px-4 focus:outline-none -mr-7" placeholder="Nom d'utilisateur" type="text" />
                </div>

                <div class="flex items-center">
                    <input v-model="password" class="w-full border rounded h-12 px-4 focus:outline-none -mr-7" placeholder="Mot de passe" type="password" />
                </div>

                <div>
                    <div class="flex flex-col-reverse md:flex-row md:items-center justify-between ">
                        <div class="flex text-gray-400 dark:text-gray-100 text-sm self-center md:self-auto mt-4 md:mt-0">
                            <p class="mr-1">
                                Vous avez déjà un compte ?
                            </p>
                            <NuxtLink class="underline mr-3" to="/login">Se connecter</NuxtLink>
                        </div>

                        <Button text="S'inscrire" />
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({
    middleware: ["guest"]
});

export default {
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async registerSubmit() {
            const config = useRuntimeConfig();
            const auth = useAuthStore();
            const router = useRouter();

            await $fetch(`${config.public.API_BASE_URL}/user`, {
                method: 'POST',
                body: JSON.stringify({
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
            })
                .then(response => {
                    auth
                        .login({ email: this.email, password: this.password })
                        .then((_response) => router.push("/"))
                        .catch((error) => console.log("API error", error));
                })
                .catch(error => { throw error })
        }
    }
}
</script>