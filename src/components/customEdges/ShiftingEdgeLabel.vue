<script setup>
const props = defineProps(['label', 'offset_y', 'offset_x'])
</script>

<template>
  <!-- 优化展示 -->
  <tspan :dy="props.offset_y" class="label" :x="offset_x">{{ props.label }}</tspan>
  <!-- <tspan :dy="props.offset_y" :x="offset_x">{{ '' }}</tspan> -->
</template>

<style scoped></style>
