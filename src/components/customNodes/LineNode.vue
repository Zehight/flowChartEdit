<script lang="ts" setup>
import { Handle, Position,useNode,useVueFlow,useNodeId } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import {Delete,Grid} from '@element-plus/icons-vue'
const { removeNodes,updateNode } = useVueFlow()


export interface ITestOneNodeData{
  label:string
  toolBarVisible:boolean
  visible:boolean
  id:string
}


const props = defineProps(['data'])
const currentNode = useNode(useNodeId()).node


const relationNode = useNode(props.data.relationNodeId).node
function resetPosition(){
  if(Math.abs(currentNode.position.y-relationNode.position.y)<10){
    updateNode(relationNode.id,{position:{x:relationNode.position.x,y:currentNode.position.y}})
  }
  if(Math.abs(currentNode.position.x-relationNode.position.x)<10){
    updateNode(relationNode.id,{position:{x:currentNode.position.x,y:relationNode.position.y}})
  }

}
</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode,relationNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button @click="resetPosition" type="danger" size="small" :icon="Grid" circle />
  </NodeToolbar>
  <div class="node" :class="props.data.visible?'show':'hidden'">
    <Handle
        style="transform: translate(3px,-2px)"
      type="target"
      :position="Position.Left"
    />
    <Handle
        style="transform: translate(3px,-2px)"
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
  height: 2px;
  width: 2px;
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