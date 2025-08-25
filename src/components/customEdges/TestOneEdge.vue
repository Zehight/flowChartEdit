<script setup lang="ts">
import { EdgeProps, Position } from '@vue-flow/core'
import { StraightEdge, useEdge } from '@vue-flow/core'
import ShiftingEdgeLabel from '@/components/customEdges/ShiftingEdgeLabel.vue'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { Delete } from '@element-plus/icons-vue'


const props = defineProps<EdgeProps>()
const currentEdge = useEdge(props.id)

const label = () => h(ShiftingEdgeLabel, { label: props.data.label, offset_y: -10 + (+props.data.offset_y || 0), offset_x: 30 + (props.data.offset_x || 0) })
</script>



<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button type="danger" size="small" :icon="Delete" circle />
  </NodeToolbar>
  <StraightEdge v-bind="props" :label="label">
  </StraightEdge>
</template>

<style scoped></style>