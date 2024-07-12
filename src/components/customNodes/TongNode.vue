<script lang="ts" setup>
import { useNode,Position,useVueFlow,useNodeId } from '@vue-flow/core'
import {Delete,Plus,SemiSelect} from '@element-plus/icons-vue'
const { removeNodes,updateNode } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'


const props = defineProps(['data'])
const currentNode = useNode(useNodeId()).node

const progressGradient = computed(()=>{
  let progress = props.data.progress
  let buZheng = 0.4*(1-progress*0.01)
  progress = Number(String(progress * (1 + buZheng)))
  return `background: linear-gradient(to top, rgb(32,107,149) ${progress}%, rgb(201,235,245) ${progress}%);`
})

function updateData(type:string){
  if(type==='add' && props.data.progress<100){
    updateNode(currentNode.id,{data:{...currentNode.data,progress:props.data.progress+10}})
  }
  if(type==='sub' && props.data.progress>=10)
  {
    updateNode(currentNode.id,{data:{...currentNode.data,progress:props.data.progress-10}})
  }
}


</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button @click="updateData('add')" type="success" size="small" :icon="Plus" circle />
    <el-button @click="updateData('sub')" type="success" size="small" :icon="SemiSelect" circle />
  </NodeToolbar>
  <div class="node">
    <div class="commonTong" :style="progressGradient"/>
<!--    <div class="commonTong" style="background-color: #ffb546;height: 30px;width: 30px;position: absolute;top:0"/>-->
  </div>


</template>

<style scoped>

.node:deep(.vue-flow__handle) {
  background: transparent;
  border: none;
}

.commonTong{
  clip-path: polygon(50% 0%, 100% 0, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 0 0);
  height: 28px;width: 28px;
}

.node{
  color: white;
  width: 28px;
  height:28px;
  overflow: hidden;
}
</style>