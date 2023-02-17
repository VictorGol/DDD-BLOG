<script setup lang="ts">
import { onUnmounted, Ref, ref } from "vue";

defineProps<{
  /** 文本 */ text: string;
}>();

const colors: string[] = [
  "rgba(245, 245, 245, .5)",
  "rgba(255, 250, 240, .5)",
  "rgba(250, 240, 230, .5)",
];

const bac: Ref<string> = ref(colors[Math.floor(Math.random() * 3)]);
const elMouseover = (flag: boolean) => {
  if (flag) {
    bac.value = bac.value.replace(".5", "1");
  } else {
    bac.value = bac.value.replace("1", ".5");
  }
};

const timer = ref();
const copyStatus = ref(false);
// 复制文本到粘贴板
const copyText = (val: string) => {
  // navigator.clipboard.writeText(val).then(() => {
  //   copyStatus.value = true;
  //   timer.value = setTimeout(() => {
  //     copyStatus.value = false;
  //   }, 1000);
  // });
};

onUnmounted(() => {
  timer.value && clearTimeout(timer.value);
});
</script>

<template>
  <div
    class="wrap"
    :style="{ backgroundColor: bac }"
    @mouseover="elMouseover(true)"
    @mouseleave="elMouseover(false)"
  >
    <div class="text" v-html="text" @click="copyText(text)"></div>
    <!-- 过渡 -->
    <!-- <Transition>
      <div class="tip" v-if="copyStatus">复制成功</div>
    </Transition> -->
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
  // .tip {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background-color: rgba($color: #fafafa, $alpha: 1);
  //   border-radius: 12px;
  // }
}

.wrap:hover {
  box-shadow: 1px 1px 3px 0px rgba(36, 36, 36, 0.6);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
