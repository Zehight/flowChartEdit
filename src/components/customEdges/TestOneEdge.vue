<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { StraightEdge } from '@vue-flow/core'



// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps<EdgeProps>()



</script>



<template>
  <StraightEdge :offset="0" v-bind="props"/>
</template>