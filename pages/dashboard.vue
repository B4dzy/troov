<template>
    <div>{{ user && user.username }}</div>
    <div>{{ user && user.email }}</div>

    <NuxtLink to="/items/listing">Voir la liste des objets</NuxtLink>
    <br>
    <button v-on:click="logout">Se déconnecter</button>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
    middleware: ["user"]
});

const auth = useCookie('auth').value;
const config = useRuntimeConfig();

const { data: user } = await useFetch(`${config.public.API_BASE_URL}/auth/me`, {
    headers: {
        "Authorization": "Bearer " + auth.token
    },
});

const authStore = useAuthStore();
const router = useRouter();

function logout() {
    authStore.logout()
        .then((_response) => router.push("/"))
        .catch((error) => console.log("API error", error));
}
</script>