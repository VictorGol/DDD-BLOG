<script setup lang="ts">
const months: string[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const date: Date = new Date();
const currentMonth: number = date.getMonth();
const currentYear: number = date.getFullYear();
const fileName: string = `../${currentYear}/${months[currentMonth]}.html`;
</script>

<template>
  <a :href="fileName">点击开始阅读</a>
</template>
