<script lang="ts" setup>
import { useNode,Position,useVueFlow,useNodeId } from '@vue-flow/core'
import {Delete,Plus,SemiSelect} from '@element-plus/icons-vue'
const { removeNodes,updateNode } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'


const props = defineProps(['data'])
const currentNode = useNode(useNodeId()).node

const progressGradient = computed(()=>{
  let progress = (props.data.tongValue/1600) * 100
  let buZheng = 0.4*(1-progress*0.01)
  progress = Number(String(progress * (1 + buZheng)))
  return `background: linear-gradient(to top, rgb(15,52,73) ${progress}%, rgb(51,92,110) ${progress}%);`
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
const inputRef = ref()
function editLabel(){
  updateNode(currentNode.id,{data:{...currentNode.data,showInput:true}})
  nextTick(()=>{
    inputRef.value.focus()
  })

}

function cancel(){
  updateNode(currentNode.id,{data:{...currentNode.data,showInput:false}})

}

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button @click="updateData('add')" type="success" size="small" :icon="Plus" circle />
    <el-button @click="updateData('sub')" type="success" size="small" :icon="SemiSelect" circle />
  </NodeToolbar>
  <div class="node">
    <el-input ref="inputRef" @blur="cancel" v-if="props.data.showInput" v-model="props.data.typeLabel" class="tongValue"/>
    <div @click="editLabel" v-else style="height: 16px;overflow: hidden;text-align: center" class="tongValue">{{props.data.typeLabel}}</div>
    <div class="commonTong" :style="progressGradient"/>
    <div style="position: absolute;top: 18px;font-size: 8px;left: 0;right: 0;display: flex;justify-content: center;color: #00F0FF;">{{props.data.tongValue}}t</div>
    <div style="position: absolute;bottom: 8px;font-size: 8px;left: 0;right: 0;display: flex;justify-content: center">{{props.data.label}}</div>
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
  height: 48px;width: 48px;
}

.node{
  color: white;
  width: 48px;
  height: 72px;

}

.tongValue{
  font-size: 10px;
  text-align: center;
  border: 1px solid white;
  cursor: text;
  display: flex;
  align-items: center;
}

:deep(.el-input__wrapper){
      align-items: center;
     background-color: unset;
     background-image: unset;
      border-radius: unset;
      box-shadow: unset;
     cursor: text;
      display: unset;
      flex-grow: unset;
      justify-content: center;
      padding: unset;
      transform: unset;
      transition: unset;
  height: 16px;
 }
:deep(.el-input__inner){
  display: flex;
  align-items: center;
  height: 16px;
  color: #38bdf8;
}
</style>