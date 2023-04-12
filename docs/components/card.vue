<script setup lang="ts">
defineProps<{
  text: string;
  day?: string;
}>();
</script>

<template>
  <div class="wrap">
    <div class="text" v-html="text"></div>
    <div class="text1" v-if="day" v-html="day"></div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  color: #213547;
  padding: 20px;
  margin: 20px 0 50px 0;
  border-radius: 1rem;
  box-shadow: 0px 0.8px 2px rgba(0, 0, 0, 0.032),
    0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  box-sizing: border-box;
}

.text {
  line-height: 24px;
}
.text1{
  margin-top: 10px;
  text-align: right;
}
</style>
