<script lang="ts" setup>
import { useNode, useNodeId } from '@vue-flow/core'
import bgTest from '@/assets/image/cankao.png'

const props = defineProps(['data'])

const currentNode = useNode(useNodeId()).node




</script>

<template>
  <div class="node">
    <el-image :draggable="false" fit="contain" :src="bgTest" style="width: 1920px;height: 1080px;opacity: 0.5" />
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
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  cursor: default;
  user-select: none;
}
</style>