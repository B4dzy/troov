<script setup lang="ts">
interface Props {
    text: string,
};

const props = withDefaults(defineProps<Props>(), {
    text: '',
});
const emit = defineEmits(["click"]);
const handleClick = <T extends unknown>(evt?: T) => {
    emit("click", evt);
};
</script>

<template>
    <button class="px-6 py-2 text-sm transition-colors duration-300 rounded-full text-white uppercase font-semibold bg-primary hover:bg-primary/80">
        {{ text }}
    </button>
</template>