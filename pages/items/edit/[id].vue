<template>
  <BaseNavbar />
  <section class="flex h-screen justify-center items-center bg-gray-200/50 dark:bg-secondary">
    <div class="bg-white dark:bg-gray-800 shadow-md p-6 max-w-xl mx-auto rounded-md">
      <h2 class="text-3xl font-cursive text-secondary dark:text-primary">Éditer un objet</h2>
      <form @submit.prevent="handleSubmit" class="mt-10 space-y-8">
        <input v-model="name" class="w-full border rounded h-12 px-4 focus:outline-none" placeholder="Nom de l'objet"
          type="text" />
        <div>

          <div class="flex flex-col-reverse md:flex-row md:items-center justify-between ">
            <div class="flex text-gray-400 dark:text-gray-100 text-sm self-center md:self-auto mt-4 md:mt-0">
              <NuxtLink class="underline mr-5" to="/register">Revenir à la liste</NuxtLink>
            </div>

            <Button text="Éditer" />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
definePageMeta({
  middleware: ["guest"]
});

export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    /**
    * @description Permet l'édition d'un item ciblé par son id à l'envoi du formulaire
    */
    handleSubmit: function () {
      const config = useRuntimeConfig();
      const auth = useCookie('auth').value;
      const router = useRouter();
      const route = useRoute();

      $fetch(`${config.public.API_BASE_URL}/item/${route.params.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": "Bearer " + auth.token
        },
        body: {
          name: this.name
        }
      }).then(() => router.push("/"));

    }
  },
  /**
  * @description Méthode asynchrone qui permet de récupérer des données avant le rendu de la page, ici utilisé pour récupérer notre objet avant le rendu final
  */
  async created() {
    const config = useRuntimeConfig();
    const route = useRoute();

    const { data: item } = await useFetch(`${config.public.API_BASE_URL}/item/${route.params.id}`);

    this.name = item.value.name;
  }
}
</script>