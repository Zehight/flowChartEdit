<script lang="ts" setup>
import { Comment } from '@element-plus/icons-vue'


</script>

<template>
  <div class="the-header flex">
    <div style="display: flex;align-items: center">
      <el-icon style="font-size: 60px;color: #f17eb8">
        <Comment />
      </el-icon>
      <span
        class="title"
        style="color: #38bdf8;margin-left: 16px"
      >MccbtsFlowChart</span>
      <span
        class="title"
        style="color: #4F5F6F;margin-left: 8px"
      >Edit</span>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.the-header {
  padding: 0 16px;
  height: var(--header-height);
  background: #FFFFFF;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  color: #000;
  cursor: default;
}

.logo-icon {
  margin-right: 4px;
  width: 60px;
}

.logo-icon+span {
  position: relative;
  top: 2px;
}



.title {
  font-family: "WeiRuanYaHei";
  font-weight: Bold;
  font-size: 24px;
}
</style>
