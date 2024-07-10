<script lang="ts" setup>
import { Handle, Position,useNode } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import {Delete} from '@element-plus/icons-vue'
import {useVueFlow} from '_@vue-flow_core@1.38.2@@vue-flow/core'
const { removeNodes } = useVueFlow()


export interface ITestOneNodeData{
  label:string
  text:string
  toolBarVisible:boolean
  visible:boolean
}

const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node
const relationNode = useNode(props.data.relationNodeId).node

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode,relationNode])" type="danger" size="small" :icon="Delete" circle />
  </NodeToolbar>
  <div class="node" :class="props.data.visible?'show':'hidden'">
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

}

.hideen{
  font-size: 16px;
  height: 0;
  width: 0;
  text-align: center;
  background:unset;
  color:#fff;
  border-radius: 0;
}

.show{
  font-size: 16px;
  height: 8px;
  width: 8px;
  text-align: center;
  border: 2px solid #38bdf8;
  border-radius: 100px;
  background: white;
  color:#fff;
}

.node:deep(.vue-flow__handle) {
  background: transparent;
  border: none;
}
</style>