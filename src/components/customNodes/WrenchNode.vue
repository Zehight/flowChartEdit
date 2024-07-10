<script lang="ts" setup>
import { useNode } from '@vue-flow/core'
import {Position} from '_@vue-flow_core@1.38.2@@vue-flow/core'
import {Delete} from '@element-plus/icons-vue'
import {useVueFlow} from '_@vue-flow_core@1.38.2@@vue-flow/core'
const { removeNodes } = useVueFlow()
import { NodeToolbar } from '@vue-flow/node-toolbar'
import wrench from '@/assets/image/che1.png'


const props = defineProps(['data'])
const currentNode = useNode(props.data.text).node


const progressGradient = computed(()=>{
  let progress = props.data.progress || 40

  let buZheng = 0.4*(1-progress*0.01)
  progress = String(progress*(1+buZheng))
  return `background: linear-gradient(to top, rgb(17,53,73) ${progress}%, rgb(201,235,245) ${progress}%);`
})

</script>

<template>
  <NodeToolbar :is-visible="props.data.toolBarVisible" :position="Position.Top">
    <el-button @click="removeNodes([currentNode])" type="danger" size="small" :icon="Delete" circle />
  </NodeToolbar>
  <div class="node">
<!--    <div class="commonTong" :style="progressGradient"/>-->
    <el-image fit="contain" :src="wrench" style="width: 40px;height: 40px"/>
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