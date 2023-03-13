<script setup lang="ts">
defineProps<{
  name?: string;
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

</script>

<template>
  <div class="wrap">
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
  // background-color: #ccc;
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
