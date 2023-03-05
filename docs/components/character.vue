<script setup lang="ts">
defineProps<{
  name: string;
  birthday?: string;
  from?: string;
  look?: string;
  family?: string;
  education?: string;
  character?: string;
  knowledge?: string;
  power?: string;
  identity?: string;
  deed?: string;
}>();

const bacArr = [
  "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
  "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
  "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
  "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
  "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
  "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
];

const getBac = (): string => bacArr[Math.floor(Math.random() * bacArr.length)];
</script>

<template>
  <div class="wrap" :style="{ backgroundImage: getBac() }">
    <!-- 姓名 -->
    <div class="name" v-html="name"></div>
    <!-- 生日 -->
    <div class="birthday" v-html="birthday"></div>
    <!-- 来自 -->
    <div class="come-from" v-html="from"></div>
    <!-- 外貌 -->
    <div class="look" v-html="look"></div>
    <!-- 家庭情况 -->
    <div class="family" v-html="family"></div>
    <!-- 学业、教育 -->
    <div class="education" v-html="education"></div>
    <!-- 身份 -->
    <div class="identity" v-html="identity"></div>
    <!-- 性格 -->
    <div class="character" v-html="character"></div>
    <!-- 知识体系 -->
    <div class="knowledge" v-html="knowledge"></div>
    <!-- 超凡体系 -->
    <div class="power" v-html="power"></div>
    <!-- 事迹 -->
    <div class="deed" v-html="deed"></div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  .name {
    font-weight: bold;
    margin-bottom: 20px;
    font-size: larger;
  }
  .birthday{}
  .come-from {
    margin: 10px 0;
  }
  .look {
    margin: 10px 0;
  }
  .family {
    margin: 10px 0;
  }
  .education {
    margin: 10px 0;
  }
  .knowledge {
    margin: 10px 0;
  }
  .power {
    margin: 10px 0;
  }
  .identity {
    margin: 10px 0;
  }
  .deed {
    margin: 10px 0;
  }
}
</style>
