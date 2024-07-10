<script setup>
const props = defineProps(['label', 'offset_y','offset_x'])
</script>

<template>
  <tspan :dy="props.offset_y" :x="offset_x">{{ props.label }}</tspan>
</template>
