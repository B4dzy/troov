<template>
    <div v-for="item in items">
        {{ item.name }}
    </div>
</template>

<script setup>
const auth = useCookie('auth').value;
const config = useRuntimeConfig();

const { data: items } = useFetch(`${config.public.API_BASE_URL}/item`, {
    headers: {
        "Authorization": "Bearer " + auth.token
    },
});
</script>