<script setup lang="ts">
import { onMounted, ref } from 'vue';

const count = ref(0)
onMounted(() => {
    setInterval(() => {
        count.value += 2
    }, 1000)
})
</script>

<template>
    <div>
        {{ count }}
    </div>
</template>
