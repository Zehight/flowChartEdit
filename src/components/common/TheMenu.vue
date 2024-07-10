<script lang="ts" setup>
import { RouteRecordName, useRoute, useRouter } from 'vue-router'
import { IMenu, IMenuType } from '@/@types/menu.d'

const route = useRoute()


const menuTree = ref<IMenu[]>([
  {
    title: '企业信用查询',
    type: IMenuType.folder,
    children: [
      {
        type: IMenuType.menu,
        title: '企业信用查询',
        routerName: 'EnterpriseList'
      },
      {
        type: IMenuType.menu,
        title: '历史企业对比',
        routerName: 'EnterpriseCompHistory'
      }
    ]
  },
  {
    title: '中冶宝钢供应商名录',
    type: IMenuType.folder,
    children: [
      {
        type: IMenuType.menu,
        title: '供应商名录',
        routerName: 'SupplierList'
      },
      {
        type: IMenuType.menu,
        title: '停用名录',
        routerName: 'BannedSupplier'
      },
      {
        type: IMenuType.menu,
        title: '黑名单',
        routerName: 'BlacklistSupplier'
      }
    ]
  },
  {
    title: '系统管理',
    type: IMenuType.folder,
    children: [
      {
        type: IMenuType.menu,
        title: '角色管理',
        routerName: 'RoleManage'
      }
    ]
  }
])

// 把菜单生成 routerName-title 的键值对
interface MenuMap {
  [x: RouteRecordName]: string
}

const menuMap: MenuMap = {}

function setMenuRouterMap(tree: IMenu[]) {
  tree.forEach((menu) => {
    const {routerName, title, children} = menu
    if (routerName) menuMap[routerName] = title
    if (children && children.length > 0) setMenuRouterMap(children)
  })
  // 设置初始菜单
  menuStore.setActive(menuMap[route.name as RouteRecordName])
}

// setMenuRouterMap(menuTree)
function handleOpen(key: string, keyPath: string[]) {
  menuStore.addOpeneds(key)
}

function handleClose(key: string, keyPath: string[]) {
  menuStore.removeOpeneds(key)
}

// 路由变化，修改active菜单
watch(
  () => route.name,
  (routerName) => menuStore.setActive(menuMap[routerName as RouteRecordName])
)

setMenuRouterMap(menuTree.value)
</script>

<template>
  <el-scrollbar class="scroll-bar">
    <el-menu
        :default-active="menuStore.active"
        :default-openeds="menuStore.openeds"
        :router="true"
        class="menu"
        @close="handleClose"
        @open="handleOpen"
    >
      <TheSubMenu
          v-for="(menu, index) in menuTree"
          :key="menu.title + index"
          :menu="menu"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.menu {
  height: calc(100vh - var(--header-height));
  border-right: none;
}
.scroll-bar {
  border-right: 1px solid var(--el-menu-border-color);
}
</style>
