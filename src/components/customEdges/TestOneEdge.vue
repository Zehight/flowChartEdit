<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { StraightEdge } from '@vue-flow/core'
import ShiftingEdgeLabel from '@/components/customEdges/ShiftingEdgeLabel.vue'



// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps<EdgeProps>()


const label=() => h(ShiftingEdgeLabel, { label: props.label, offset_y: -10,offset_x:20 })
</script>



<template>
  <StraightEdge
      style="z-index: -10;"
      v-bind="props"
      :label="label"
  >
  </StraightEdge>
</template>