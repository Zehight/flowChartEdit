<script setup lang="ts">
import { JumpMenu } from '@/@types/jumpMenu.d'
/*
*
*  tips:
*       1.只能获取到子节点，不能获取到孙节点
*       2.在插槽的组件最外层标签上要写data-title=‘菜单名称’，用于获取菜单名称
* */

defineProps(['className'])

const slot = ref()
const childNode = ref<JumpMenu[]>([])
const mainHeight = ref()

function getNodes() {
  setTimeout(() => {
    mainHeight.value = slot.value.scrollHeight
  }, 200)
  // 获取子节点信息
  childNode.value = toRaw(Array.from(slot.value.children)).map((a: any) =>
    ({
      title: a.dataset.title,
      node: a
    })
  )
}

const selectIndex = ref(0)
const scrollBar = ref()
const flag = ref('down')
let sign = 0


function upOrDown() {
  // 获取浏览器视窗高度
  const height = window.innerHeight
  // 获取已经滚动的高度
  const currentHeight = document.documentElement.scrollTop
  // 判断向上滚动还是向下
  const scroll = currentHeight - sign
  sign = currentHeight
  flag.value = scroll <= 0 ? 'up' : 'down'
  if (flag.value === 'up') {
    // 获取当前组件到页面顶端的距离
    const nowToTop = toRaw(childNode.value)[selectIndex.value].node.getBoundingClientRect().top
    // console.log(nowToTop, '1')
    if (nowToTop > height / 2) {
      if (selectIndex.value - 1 >= 0) {
        selectIndex.value -= 1
      }
    }
  } else {
    const nowConHeight = toRaw(childNode.value)[selectIndex.value].node.clientHeight
    const nowToTop = toRaw(childNode.value)[selectIndex.value].node.getBoundingClientRect().top
    if (nowToTop + nowConHeight < height / 2) {
      if (selectIndex.value + 1 < childNode.value.length) {
        selectIndex.value += 1
      }
    }
    if (currentHeight + height >= mainHeight.value && currentHeight + height <= mainHeight.value + 100) {
      selectIndex.value = childNode.value.length - 1
    }
  }
}

const status = ref(true)

interface ScrollType {
  scrollLeft: number,
  scrollTop: number
}

function getScrollTop({scrollLeft, scrollTop}: ScrollType) {
  // 获取浏览器视窗高度
  const height = window.innerHeight
  // 获取已经滚动的高度
  const currentHeight = scrollTop
  // 判断向上滚动还是向下
  const scroll = scrollTop - sign
  sign = scrollTop
  flag.value = scroll <= 0 ? 'up' : 'down'
  if (status.value) {
    if (flag.value === 'up') {
      const nowToTop = toRaw(childNode.value)[selectIndex.value].node.getBoundingClientRect().top
      if (nowToTop > height / 2) {
        if (selectIndex.value - 1 >= 0) {
          selectIndex.value -= 1
        }
      }
    } else {
      const nowConHeight = toRaw(childNode.value)[selectIndex.value].node.clientHeight
      const nowToTop = toRaw(childNode.value)[selectIndex.value].node.getBoundingClientRect().top
      if (nowToTop + nowConHeight < height / 2) {
        if (selectIndex.value + 1 < childNode.value.length) {
          selectIndex.value += 1
        }
      }
      if (currentHeight + height >= mainHeight.value - 50 && currentHeight + height <= mainHeight.value + 50) {
        selectIndex.value = childNode.value.length - 1
      }
    }
  }
}

// window.addEventListener('scroll', getScrollTop)

function jump(node: JumpMenu, index: number) {
  status.value = false
  let scrollHeight = 0
  // window.removeEventListener('scroll', getScrollTop)
  // const nowToTop = toRaw(childNode.value)[index].node.getBoundingClientRect().top
  for (let i = 0; i < index; i += 1) {
    scrollHeight += toRaw(childNode.value)[i].node.clientHeight
  }
  scrollBar.value!.scrollTo({
    top: scrollHeight,
    behavior: 'smooth'
  })
  // toRaw(node).node.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  selectIndex.value = index
  setTimeout(() => {
    // window.addEventListener('scroll', getScrollTop)
    status.value = true
  }, 600)
}

onMounted(() => {
  getNodes()
})
</script>

<template>
  <div :class="{'jump-wrapper': true, [className]: true }">
    <el-scrollbar ref="scrollBar" height="100vh" @scroll="getScrollTop">
      <div ref="slot" class="slot">
        <slot/>
      </div>
      <div class="menu_wrapper">
        <div
          v-for="(item,index) in childNode"
          :key="index"
          :class="{'menu_btn':true,['select']:selectIndex===index}"
          @click="jump(item,index)"
        >
          {{ item.title }}
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>


<style scoped>
.slot {
  box-sizing: border-box;
  width: 95%;
  margin-bottom: 32px;
  height: 100%;
  padding: 8px 96px 16px 96px;
}

.select {
  color: #146aff;
}

.menu_wrapper {
  /*min-width: 1100px;*/
  position: fixed;
  margin-top: 60px;
  top: 25vh;
  right: 16px;
  width: 128px;
  height: 100%;
}

.menu_btn {
  margin: 0 0 16px 0;
  cursor: pointer;
}

.el-scrollbar__wrap {
  overflow-y: hidden;
}
</style>
