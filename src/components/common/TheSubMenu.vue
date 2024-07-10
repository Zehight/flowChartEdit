<script lang="ts" setup>
import { IMenu, IMenuType } from '@/@types/menu.d'

defineProps<{
  menu: IMenu
}>()
</script>

<template>
  <el-sub-menu
    v-if="menu.type === IMenuType.folder"
    :index="menu.title"
  >
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
    <TheSubMenu
      v-for="(item, index) in menu.children"
      :key="item.title + index"
      :menu="item"
    />
  </el-sub-menu>
  <!-- 递归调用组件，实现无线级别菜单 -->
  <template v-if="menu.type == IMenuType.menu">
    <el-menu-item
      :index="menu.title"
      :route="{ name: menu.routerName }"
    >
      {{ menu.title }}
    </el-menu-item>
  </template>
</template>
