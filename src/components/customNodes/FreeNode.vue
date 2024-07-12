<script lang="ts" setup>
import { Handle, Position,useNode,useVueFlow,useNodeId } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import {Delete} from '@element-plus/icons-vue'
const { removeNodes } = useVueFlow()


export interface ITestOneNodeData{
  label:string
  text:string
  toolBarVisible:boolean
  visible:boolean
}

const props = defineProps(['data'])
const currentNode = useNode(useNodeId()).node
const relationNode = useNode(props.data.relationNodeId).node

</script>

<template>

  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode,relationNode])" type="danger" size="small" :icon="Delete" circle />
  </NodeToolbar>

  <div class="node" :style="props.data.style">
    <div class="text">{{props.data}}</div>
    <Handle
        style="transform: translate(6px,-2px)"
      type="target"
      :position="Position.Left"
    />
    <Handle
        style="transform: translate(6px,-2px)"
      type="source"
      :position="Position.Left"
    />
  </div>


</template>

<style scoped>
.node{
  color: white
}

.text{
  color:black;
  position: absolute;
  top:0;
  left:0;
}




.node:deep(.vue-flow__handle) {
  background: transparent;
  border: none;
}
</style>