// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL
        }
    },
    modules: ['@nuxtjs/color-mode'],
    colorMode: {
        classSuffix: ''
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    ssr: true
})
