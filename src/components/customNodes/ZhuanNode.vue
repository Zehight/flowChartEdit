<script lang="ts" setup>
import { useNode, Position, useVueFlow } from '@vue-flow/core'
import { Delete, Plus } from '@element-plus/icons-vue'
const { removeNodes, updateNode } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node

// 根据透明节点显示状态控制NodeResizer
const showResizer = computed(() => {
  console.log(props.data.visible)
  return props.data.visible !== false
})

onMounted(() => {
  updateNode(currentNode.id, { position: { x: currentNode.position.x - props.data.distance, y: currentNode.position.y } })
})

const zhuanValue = computed(() => {
  return props.data.zhuanValue?.replace(/\n/g, '<br>') || ''
})

</script>

<template>
  <div class="node" :class="{ 'hide-resize-control': !showResizer }">
    <NodeResizer v-if="showResizer" style="background-color: red;" :min-width="50" :min-height="30" />
    <div class="node-label" v-html="zhuanValue"></div>
  </div>
</template>

<style scoped>
:deep(.vue-flow__resize-control) {
  display: block;
}

.hide-resize-control :deep(.vue-flow__resize-control) {
  display: none;
}

.node {
  color: white;
  overflow: hidden;
  background-color: #3BB8D4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.node-label {
  color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-line;
}
</style>