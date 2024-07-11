<script lang="ts" setup>
import { useNode,Position,useVueFlow } from '@vue-flow/core'
import {Delete,Plus,SemiSelect} from '@element-plus/icons-vue'
const { removeNodes,updateNode } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node

const progressGradient = computed(()=>{
  let progress = props.data.progress || 40
  let buZheng = 0.4*(1-progress*0.01)
  progress = Number(String(progress * (1 + buZheng)))
  return `background: linear-gradient(to top, rgb(17,53,73) ${progress}%, rgb(201,235,245) ${progress}%);`
})

function updateData(type:string){
  if(type==='add' && props.data.progress<100){
    updateNode(props.data.text,{data:{...currentNode.data,progress:props.data.progress+10}})
  }
  if(type==='sub' && props.data.progress>10)
  {
    updateNode(props.data.text,{data:{...currentNode.data,progress:props.data.progress-10}})
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
  clip-path: polygon(50% 0%, 100% 0, 100% 70%, 50% 100%, 0 70%, 0 0);
  height: 40px;width: 40px;
}

.node{
  color: white;
  width: 40px;
  height:40px;
  overflow: hidden;
}
</style>