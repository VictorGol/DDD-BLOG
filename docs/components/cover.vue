<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  url: string;
  alt: string;
}>();

const isShow = ref(false);
const preview = () => {
  isShow.value = !isShow.value;
};
</script>

<template>
  <img :src="url" :alt="alt" @click="preview" />
  <div class="suspension" v-if="isShow" @click.self="preview">
    <img :src="url" :alt="alt" />
  </div>
</template>

<style lang="scss" scoped>
img {
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 0 4px 0px rgba(36, 36, 36, 0.4);
  cursor: pointer;
  transition: all .5s;
  &:hover{
    box-shadow: 0 0 10px 0px rgba(36, 36, 36, 0.8);
  }
}
.suspension {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #555, $alpha: 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 90%;
    max-height: 90%;
  }
}
</style>
