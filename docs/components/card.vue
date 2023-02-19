<script setup lang="ts">
import { Ref, ref } from "vue";

defineProps<{
  /** 文本 */ text: string;
}>();

const colors: string[] = [
  "rgba(51, 204, 204, 0.5)",
  "rgba(255, 192, 203, 0.5)",
  "rgba(102, 102, 204, 0.5)",
  "rgba(147, 112, 219, 0.5)",
  "rgba(100, 149, 237, 0.5)",
  "rgba(144, 238, 144, 0.5)",
];

const bac: Ref<string> = ref(colors[Math.floor(Math.random() * 6)]);
const elMouseover = (flag: boolean) => {
  bac.value = flag
    ? bac.value.replace("0.5", "0.9")
    : bac.value.replace("0.9", "0.5");
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
