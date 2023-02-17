<script setup lang="ts">
defineProps<{
  url: string;
  alt: string;
}>();
</script>

<template>
  <img :src="url" :alt="alt" />
</template>

<style lang="scss" scoped>
img {
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px 0px rgba(36, 36, 36, 0.4);
}
</style>
