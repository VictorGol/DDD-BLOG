<script setup lang="ts">
import { onUnmounted, Ref, ref } from "vue";

defineProps<{
  /** 文本 */ text: string;
}>();

const colors: string[] = [
  "rgba(245, 245, 245, 0.5)",
  "rgba(255, 250, 240, 0.5)",
  "rgba(250, 240, 230, 0.5)",
];

const bac: Ref<string> = ref(colors[Math.floor(Math.random() * 3)]);
const elMouseover = (flag: boolean) => {
  bac.value = flag
    ? bac.value.replace("0.5", "1")
    : bac.value.replace("1", "0.5");
};
</script>

<template>
  <div
    class="wrap"
    :style="{ backgroundColor: bac }"
    @mouseover="elMouseover(true)"
    @mouseleave="elMouseover(false)"
  >
    <div class="text" v-html="text"></div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  color: #213547;
  padding: 20px;
  // background-color: rgb(198, 129, 59);
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 4px 4px 10px 0px rgba(36, 36, 36, 0.6);
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  .text {
    cursor: pointer;
  }
}

.wrap:hover {
  box-shadow: 1px 1px 3px 0px rgba(36, 36, 36, 0.6);
}
</style>
