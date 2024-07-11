<script setup lang="ts">
import '@vue-flow/core/dist/style.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { VueFlow, Panel,useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import lineImg from '@/assets/image/line.png'
import tongImg from '@/assets/image/tong.png'
import wrench from '@/assets/image/che1.png'
import Car from '@/assets/image/che2.png'
import useDragAndDrop from '@/modules/useDnD'

import type { Node, Edge } from '@vue-flow/core'
import TongNode from '@/components/customNodes/TongNode.vue'
// import type {ITestOneNodeData} from '@/components/customNodes/LineNode.vue'

const { onDragOver, onDrop, onDragLeave,onDragStart } = useDragAndDrop()
const { updateEdge, addEdges,updateNode,addNodes,onConnect,onNodeDoubleClick,onEdgesChange,onNodesChange,removeNodes,removeEdges } = useVueFlow()
onConnect(addEdges)

const useId:any = ref(null)

onMounted(()=>{
  let id = Number(localStorage.getItem('useId'))
  if (!id) {
    localStorage.setItem('useId','10')
    id = Number(localStorage.getItem('useId'))
    useId.value = id
  }else{
    useId.value = id
  }
  loadData()

})

const commonTransparentEdgeConfig={
  type: 'TestOne',
  animated:true,
  style: { stroke: 'rgb(59,184,212)', strokeWidth: 3 },
  labelStyle: { fill: 'white', fontWeight: 600 },
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 2,
  labelBgStyle: { fillOpacity:0,y:-18,fill:'#10b981',x:-8 },
}

const senceNodes:any=[
  {
    id: '1',
    type: 'Line',
    position:{x:0, y:0},
    data: { label: '', text:'1',visible:true,toolBarVisible:false },

  },
  {
    id: '2',
    type: 'Line',
    position:{x:1920, y:0},
    data: { label: '', text:'2',visible:true,toolBarVisible:false },
  },
  {
    id: '3',
    type: 'Line',
    position:{x:1920, y:1080},
    data: { label: '', text:'3',visible:true,toolBarVisible:false },
  },
  {
    id: '4',
    type: 'Line',
    position:{x:0, y:1080},
    data: { label: '', text:'4',visible:true,toolBarVisible:false },
  },
  {
    id: '5',
    type: 'Bg',
    position:{x:0, y:0},
    data: { label: '', text:'4',visible:true,toolBarVisible:false },

  },
]

const senceEdges:any=[
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    label: '',
    ...commonTransparentEdgeConfig,
    style: { stroke: 'rgb(255,255,255)', strokeWidth: 1 },
    animated: false
  },
  {
    id: 'e2->3',
    source: '2',
    target: '3',
    label: '',
    ...commonTransparentEdgeConfig,
    style: { stroke: 'rgb(255,255,255)', strokeWidth: 1 },
    animated: false
  },
  {
    id: 'e3->4',
    source: '3',
    target: '4',
    label: '',
    ...commonTransparentEdgeConfig,
    style: { stroke: 'rgb(255,255,255)', strokeWidth: 1 },
    animated: false
  },
  {
    id: 'e4->1',
    source: '4',
    target: '1',
    label: '',
    ...commonTransparentEdgeConfig,
    style: { stroke: 'rgb(255,255,255)', strokeWidth: 1 },
    animated: false
  }
]

const nodes = ref<Node[]>([
])

const edges = ref<Edge[]>([

])

function saveData(){
  console.log(edges.value)
  localStorage.setItem('edges',JSON.stringify(edges.value))
  localStorage.setItem('nodes',JSON.stringify(nodes.value))
}

function loadData(){
  const findNodes = JSON.parse(localStorage.getItem('nodes'))
  if(!findNodes){
    addNodes(senceNodes)
    addEdges(senceEdges)
  }
  const locationEdges = JSON.parse(localStorage.getItem('edges'))
  if(locationEdges){
    // addEdges(locationEdges)
    edges.value=locationEdges
  }
  const locationNodes = JSON.parse(localStorage.getItem('nodes'))
  if(locationNodes){
    nodes.value=locationNodes
    // addNodes(locationNodes)
  }
}


const visibleFlag = ref(true)
function handleHideNode(){
  visibleFlag.value = !visibleFlag.value
  if (visibleFlag.value){
    nodes.value.forEach((node) => {
      if(node.type === 'Line'){
        node.data.visible = true
      }
      if(node.type === 'Bg'){
        node.hidden = false
      }
    })
  }else{
    nodes.value.forEach((node) => {
      if(node.type === 'Line'){
        node.data.visible = false
      }
      if(node.type === 'Bg'){
        node.hidden = true
      }
    })
  }

}


function handleAddNode(event,type){
  onDragStart(event, type)
}

const currentNode:any = ref()
function handleNodeClick(e:any){
  if(e.node.type==='Bg'){
    nodes.value.forEach((node) => {
      updateNode(node.id,{selectable:false,selected:false})
    })
  }
}

function handleEdgeClick(e:any){
  console.log(e)
  // updateEdge(e.edge, { source: e.edge.target, target: e.edge.source })
}

onNodeDoubleClick((event) => {
  if(event.node.type==='Bg'){
    return
  }
  updateNode(event.node.id,{data:{...event.node.data,toolBarVisible:true}})
  nodes.value.forEach((node) => {
    if(node.id !== event.node.id){
      updateNode(node.id,{data:{...node.data,toolBarVisible:false}})
    }
  })
})

onEdgesChange(()=>{
  saveData()
})

onNodesChange(()=>{
  saveData()
  updateNode(senceNodes[0].id,{position:senceNodes[0].position})
  updateNode(senceNodes[1].id,{position:senceNodes[1].position})
  updateNode(senceNodes[2].id,{position:senceNodes[2].position})
  updateNode(senceNodes[3].id,{position:senceNodes[3].position})
  updateNode(senceNodes[4].id,{position:senceNodes[4].position})
})

function handleShowData(){
  console.log(nodes.value)
  console.log(edges.value)
}

function handleCancalClick(){
  currentNode.value = null
  nodes.value.forEach((node) => {
    updateNode(node.id,{data:{...node.data,toolBarVisible:false}})
  })
}

onMounted(() => {
  window.addEventListener('click', handleCancalClick)
})
onUnmounted(() => {
  window.removeEventListener('click', handleCancalClick)
})

function addLine(node:any){
  let returnFlag = false
  const storageId = Number(localStorage.getItem('useId'))
  const id = storageId+1
  edges.value.forEach((edge:any) => {
    if(edge.source === node.id ||edge.target === node.id){
      returnFlag =true
    }
  })
  if(returnFlag){
    return
  }
  updateNode(node.id,{data:{...node.data,relationNodeId:`${id}`}})
  addNodes([{
    id: `${id}`,
    position: { x: node.position.x+200, y: node.position.y },
    data: { label: '', text: String(id),visible:true,toolBarVisible:false,relationNodeId:`${node.id}` },
    type:'Line'
  }])
  localStorage.setItem('useId',String(id))
  const edgeId = 'e' + String(node.id) + '>' + String(id)
  addEdges([{
    id: edgeId,
    source: String(node.id),
    target: String(id),
    label: edgeId,
    ...commonTransparentEdgeConfig
  }])
}

// watch(nodes,(nv,ov)=>{
//   if (ov.length>nv.length) return
//   const node = nodes.value[nodes.value.length-1]
//   if(node.type === 'Line'){
//     addLine(node)
//   }
// })

function handleOnchange  (uploadFile: any)  {
  let file = uploadFile.raw  // 获取文件信息
  const fileReader = new FileReader()
  fileReader.readAsText(file!)  // 开始读取文件的内容为二进制
  fileReader.onload = (ev) => { // 读取完成,对数据进行自己的操作
    const data = ev.target?.result //获取内容
    console.log(JSON.parse(data as string))
  }
}

function handleExportData(){
  const json = JSON.stringify({nodes:nodes.value,edges:edges.value})
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'data.json'
  a.click()
}

</script>

<template>
  <TheContainer>

    <div class="main" @drop="onDrop" style="z-index: 100">
      <VueFlow
        style="width: 100vw;height: calc(100vh - 60px);border: 1px solid black;"
        v-model:nodes="nodes"
        v-model:edges="edges"
        @nodeClick="handleNodeClick"

        @dragover="onDragOver"
        @dragleave="onDragLeave"
        :pan-on-scroll="false"
        :zoom-on-scroll="false"
        :zoom-on-pinch="false"
        :zoom-on-double-click="false"
        :pan-on-drag="false"
        :fit-view-on-init="true"
        :prevent-scrolling='false'
        :nodes-connectable="false"

      >
        <template #node-Line="props">
          <LineNode :data="props.data" />
        </template>
        <template #node-Tong="props">
          <TongNode :data="props.data" />
        </template>
        <template #node-Wrench="props">
          <WrenchNode :data="props.data" />
        </template>
        <template #node-Car="props">
          <CarNode :data="props.data" />
        </template>
        <template #node-Bg="props">
          <BgNode :data="props.data" />
        </template>

        <template #edge-TestOne="props" >
          <TestOneEdge v-bind="props"/>
        </template>


        <Background style="background-color: rgb(0,18,29);" />
        <Panel>
          <el-row style="align-items: center">
<!--            <el-tag size="large" style="margin-right: 12px;min-width: 150px">当前选中节点Id:{{currentNode?.id}}</el-tag>-->
            <el-button @click="handleHideNode">{{ visibleFlag?'隐藏透明节点':'显示透明节点' }}</el-button>
<!--            <el-button @click="handleDelNode">删除节点</el-button>-->
<!--            <el-button @click="handleShowData">查看数据</el-button>-->
            <el-button @click="handleExportData">导出数据</el-button>
            <el-upload
                style="margin-left: 8px"
                :show-file-list="false"
                accept=".json"
                :auto-upload="false"
                :limit="1"
                :on-change="handleOnchange"
            >
              <el-button>导入数据</el-button>
            </el-upload>
          </el-row>
        </Panel>
        <Panel style="top:40px">
            <el-space direction="vertical" style="margin-top: 12px">
<!--            <div class="nodeItem" @mousedown="handleAddLine">-->
            <div class="nodeItem" :draggable="true" @dragstart="handleAddNode($event,'Line')">
              <el-image style="width: 40px;height: 40px" fit="fill" :src="<string>lineImg"/>
            </div>
            <div class="nodeItem" :draggable="true" @dragstart="handleAddNode($event,'Tong')">
              <el-image :src="<string>tongImg" style="width: 100%;height: 100%" fit="cover"/>
            </div>
              <div class="nodeItem" :draggable="true" @dragstart="handleAddNode($event,'Wrench')">
                <el-image :src="<string>wrench" style="width: 100%;height: 100%" fit="contain"/>
              </div>
              <div class="nodeItem" :draggable="true" @dragstart="handleAddNode($event,'Car')">
                <el-image :src="<string>Car" style="width: 100%;height: 100%" fit="contain"/>
              </div>
            </el-space>
<!--            <el-button @click="handleLine">添加一条线</el-button>-->
<!--            <el-button @click="handleLine">添加一条线</el-button>-->

        </Panel>
      </VueFlow>
<!--      <el-image :draggable="false" style="position: absolute;top:46px;left: 253.4px;height: 796px;z-index: 0" fit="cover" :src="bgTest"/>-->
    </div>

  </TheContainer>
</template>

<style>
.vue-flow__node.selected{
  box-shadow: 0 0 4px 2px rgba(255, 255, 255, 1);
}

.showNode{
  font-size: 16px;
  height: 8px;
  width: 8px;
  text-align: center;
  border: 2px solid #38bdf8;
  border-radius: 100px;
  background: white;
  color:#fff;
}
.hideNode{
  font-size: 16px;
  height: 0;
  width: 0;
  text-align: center;
  background:unset;
  color:#fff;
  border-radius: 0;
}
.selectNode{
  font-size: 16px;
  height: 20px;
  width: 20px;
  text-align: center;
  background: #003344;
  color:#fff;
  border-radius: 4px;
}
.nodeItem{
  height: 40px;width: 40px;border: 2px solid #38bdf8;border-radius: 4px;cursor: pointer;
}
</style>