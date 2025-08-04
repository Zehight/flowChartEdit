<script lang="ts" setup>
import { useNode, Position, useVueFlow } from '@vue-flow/core'
import { Delete, Plus } from '@element-plus/icons-vue'
const { removeNodes, updateNode } = useVueFlow()
import { NodeResizer } from '@vue-flow/node-resizer'
import { NodeToolbar } from '@vue-flow/node-toolbar'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node


onMounted(() => {
  updateNode(currentNode.id, { position: { x: currentNode.position.x - props.data.distance, y: currentNode.position.y } })
})

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button
      @click="  updateNode(currentNode.id, { position: { x: currentNode.position.x - 360, y: currentNode.position.y } })"
      type="danger" size="small" :icon="Plus" circle />
  </NodeToolbar>
  <div class="node">
    <NodeResizer style="background-color: red;" :min-width="50" :min-height="30" />
    <div class="text-node">{{ props.data.label }}</div>
  </div>


</template>

<style scoped>
.node:deep(.vue-flow__handle) {
  background: transparent;
  border: none;
}

.commonTong {
  clip-path: polygon(79.9% 100%, 21.12% 100%, 2.26% 0%, 49.37% 0%, 100% 0%);
  height: 40px;
  width: 40px;
}

.node {
  color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3BB8D4;
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
}
</style>