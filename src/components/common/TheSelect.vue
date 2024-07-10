<script setup lang="ts">
/**
 * element-plus el-select el-option 的简单封装
 * 外部使用：<TheSelect v-model="value" :options="options" />
 */
interface Options {
  label: string
  value: string | number
}
defineProps<{
  modelValue: string | number
  options: Options[]
  disabled?: boolean
  placeholder?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :model-value="modelValue"
    @change="$emit('update:modelValue', $event)"
    :disabled="disabled"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
