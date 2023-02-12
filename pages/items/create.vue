<template>
    <BaseNavbar />
    <section class="flex h-screen justify-center items-center bg-gray-200/50 dark:bg-secondary">
        <div class="bg-white dark:bg-gray-800 shadow-md p-6 max-w-xl mx-auto rounded-md">
            <h2 class="text-3xl font-cursive text-secondary dark:text-primary">Ajouter un objet</h2>
            <form @submit.prevent="handleSubmit" class="mt-10 space-y-8">
                <input v-model="name" class="w-full border rounded h-12 px-4 focus:outline-none"
                    placeholder="Nom de l'objet" type="text" />
                <div>

                    <div class="flex flex-col-reverse md:flex-row md:items-center justify-between ">
                        <div
                            class="flex text-gray-400 dark:text-gray-100 text-sm self-center md:self-auto mt-4 md:mt-0">
                            <NuxtLink class="underline mr-5" to="/register">Revenir à la liste</NuxtLink>
                        </div>

                        <Button text="Ajouter" />
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
definePageMeta({
    middleware: ["user"]
});

export default {
    name: 'ContactForm',
    data() {
        return {
            name: '',
        }
    },
    methods: {
        handleSubmit: function () {
            const config = useRuntimeConfig();
            const auth = useCookie('auth').value;
            const router = useRouter();

            $fetch(`${config.public.API_BASE_URL}/item`, {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + auth.token
                },
                body: {
                    name: this.name
                }
            }).then(() => router.push("/"));
        }
    }
}
</script>