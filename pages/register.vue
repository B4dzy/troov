<template>
    <section>
        <form @submit.prevent="registerSubmit">
            <div>
                <label for="email">
                    <input type="text" v-model="email" name="email" placeholder="Email">
                </label>
            </div>

            <div>
                <label for="username">
                    <input type="text" v-model="username" name="username" placeholder="Nom d'utilisateur">
                </label>
            </div>

            <div>
                <label for="password">
                    <input type="password" v-model="password" name="password" placeholder="Mot de passe">
                </label>
            </div>

            <div>
                <input type="submit" value="S'inscrire">
            </div>
        </form>

        <NuxtLink to="/">Se connecter</NuxtLink>
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
                        .then((_response) => router.push("/dashboard"))
                        .catch((error) => console.log("API error", error));
                })
                .catch(error => { throw error })
        }
    }
}
</script>