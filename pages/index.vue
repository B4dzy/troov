<template>
    <section>
        <form @submit.prevent="login">
            <div>
                <label for="email">
                    <input v-model="loginForm.email" type="text" name="email" placeholder="Email">
                </label>
            </div>

            <div>
                <label for="password">
                    <input v-model="loginForm.password" type="password" name="password" placeholder="Mot de passe">
                </label>
            </div>

            <div>
                <input type="submit" value="Connexion">
            </div>
        </form>

        <NuxtLink to="/register">S'inscrire</NuxtLink>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
    middleware: ["guest"]
});

const authStore = useAuthStore();
const router = useRouter();
interface loginForm {
    email: string;
    password: string;
}

let loginForm: loginForm = {
    email: "",
    password: "",
}

function login() {
    authStore
        .login(loginForm)
        .then((_response) => router.push("/dashboard"))
        .catch((error) => console.log("API error", error));
}
</script>