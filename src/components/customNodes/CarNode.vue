<script lang="ts" setup>
import { useNode,Position,useVueFlow } from '@vue-flow/core'
import {Delete,Plus} from '@element-plus/icons-vue'
const { removeNodes,updateNode,onNodesChange } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'
import car from '@/assets/image/che2.png'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node




// onMounted(()=>{
//
// })

// onNodesChange(()=>{
//   updateNode(currentNode.id,{position:{x:currentNode.position.x-props.data.distance*3,y:currentNode.position.y}})
// })

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
    <el-button @click="  updateNode(currentNode.id,{position:{x:currentNode.position.x-360,y:currentNode.position.y}})" type="danger" size="small" :icon="Plus" circle />
  </NodeToolbar>
  <div class="node">
<!--    <div class="commonTong" :style="progressGradient"/>-->
    <el-image fit="contain" :src="car" style="width: 40px;height: 40px"/>
    <div style="position: absolute;bottom: 18px;font-size: 8px;left: 0;right: 0;display: flex;justify-content: center">{{props.data.distance}}</div>

    <!--    <div class="commonTong" style="background-color: #ffb546;height: 30px;width: 30px;position: absolute;top:0"/>-->
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