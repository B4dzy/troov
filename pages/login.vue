<template>
    <BaseNavbar />
    <section class="flex h-screen justify-center items-center bg-gray-200/50 dark:bg-secondary">
        <div class="bg-white dark:bg-gray-800 shadow-md p-6 max-w-xl mx-auto rounded-md">
            <h2 class="text-3xl font-cursive text-secondary dark:text-primary">Se connecter</h2>
            <form @submit.prevent="login" class="mt-10 space-y-8">
                <input v-model="loginForm.email" class="w-full border rounded h-12 px-4 focus:outline-none" placeholder="Adresse email" type="email" />

                <div class="flex items-center">
                    <input v-model="loginForm.password" class="w-full border rounded h-12 px-4 focus:outline-none -mr-7" placeholder="Mot de passe" type="password" />
                </div>
                
                <div>
                    <div class="flex flex-col-reverse md:flex-row md:items-center justify-between ">
                        <div class="flex text-gray-400 dark:text-gray-100 text-sm self-center md:self-auto mt-4 md:mt-0">
                            <p class="mr-1">
                                Vous n'avez pas de compte ?
                            </p>
                            <NuxtLink class="underline mr-5" to="/register">S'inscrire</NuxtLink>
                        </div>

                        <Button text="Connexion" />
                    </div>
                </div>
            </form>
        </div>
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
};

function login() {
    authStore
        .login(loginForm)
        .then((_response) => router.push("/"))
        .catch((error) => console.log("API error", error));
}
</script>