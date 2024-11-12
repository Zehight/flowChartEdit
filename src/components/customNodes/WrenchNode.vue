<script lang="ts" setup>
import { useNode,Position,useVueFlow } from '@vue-flow/core'

import {Delete, Plus, SemiSelect} from '@element-plus/icons-vue'

const { removeNodes,updateNode } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'
import wrench from '@/assets/image/che1.png'
import wrenchRight from '@/assets/image/cheRight.png'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node

function changePositon(position:string){
  updateNode(currentNode.id,{data:{...currentNode.data,position:position}})
}

// onMounted(()=>{
//   updateNode(currentNode.id,{data:{...currentNode.data,position:'Right'}})
// })

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button @click="changePositon('Left')" type="success" size="small" :icon="Plus" circle />
    <el-button @click="changePositon('Right')" type="success" size="small" :icon="SemiSelect" circle />
  </NodeToolbar>
  <div v-if="props.data.position === 'Left'" class="node">
    <el-image fit="contain" :src="wrench" style="width: 40px;height: 40px"/>
    <div style="position: absolute;top: 4px;font-size: 8px;left: 4px;right: 0;color: #00F0FF;">{{props.data.tongValue}}</div>
  </div>
  <div v-if="props.data.position === 'Right'" class="node">
    <el-image fit="contain" :src="wrenchRight" style="width: 40px;height: 40px"/>
    <div style="position: absolute;top: 4px;font-size: 8px;left: 20px;right: 0;color: #00F0FF;">{{props.data.label}}</div>
  </div>


</template>

<style scoped>

.node:deep(.vue-flow__handle) {
  background: transparent;
  border: none;
}

.commonTong{
  clip-path: polygon(79.9% 100%,21.12% 100%,2.26% 0%,49.37% 0%,100% 0%);
  height: 40px;width: 40px;
}

.node{
  color: white;
  width: 40px;
  height:40px;
  overflow: hidden;
}
</style>