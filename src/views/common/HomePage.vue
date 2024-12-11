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
import Cang from '@/assets/image/cang.png'
import useDragAndDrop from '@/modules/useDnD'
import type { Node, Edge } from '@vue-flow/core'
import {ControlButton, Controls} from '@vue-flow/controls'
// import type {ITestOneNodeData} from '@/components/customNodes/LineNode.vue'

const { onDragOver, onDrop, onDragLeave,onDragStart } = useDragAndDrop()
const { updateEdge, addEdges,updateNode,addNodes,onConnect,onNodeDoubleClick,onEdgesChange,onNodesChange,removeNodes,removeEdges,onEdgeDoubleClick } = useVueFlow()
onConnect(addEdges)

const useId:any = ref(null)

onMounted(()=>{
  loadData()
})

const commonTransparentEdgeConfig={
  type: 'TestOne',
  animated:true,
  style: { stroke: '#3BB8D4', strokeWidth: 3 },
  labelStyle: { fill: 'white', fontWeight: 600 },
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 2,
  labelBgStyle: { fillOpacity:0,y:-18,fill:'#10b981',x:-8 },
}

const senceNodes:any=[

]

const senceEdges:any=[

]

const nodes = ref<Node[]>([
])

const edges = ref<Edge[]>([

])

function saveData(){
  localStorage.setItem('edges',JSON.stringify(edges.value))
  localStorage.setItem('nodes',JSON.stringify(nodes.value))
}

function loadData(){
  const findNodes = JSON.parse(localStorage.getItem('nodes') || '[]')
  if(!findNodes){
    addNodes(senceNodes)
    addEdges(senceEdges)
  }
  const locationEdges = JSON.parse(localStorage.getItem('edges') || '[]')
  if(locationEdges){
    edges.value=locationEdges
  }
  const locationNodes = JSON.parse(localStorage.getItem('nodes') || '[]')
  if(locationNodes){
    nodes.value=locationNodes
  }
  nextTick(()=>{
    edges.value.forEach(edge=>{
      edge.animated=false
      edge.style= {stroke: '#656565',strokeWidth:'8'}
    })
    const maxId = Math.max(...nodes.value.map(obj => Number(obj.id)))
    localStorage.setItem('useId',String(maxId+1))
  })

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


function handleNodeClick(e:any){
  if(e.node.type==='Bg'){
    nodes.value.forEach((node) => {
      updateNode(node.id,{selectable:false})
    })
  }
}




const editEdgeLabelDialog=ref(false)
const nodeDialog = ref(false)
const currentEdgeId=ref('')

const edgeFormData = ref({
  id:'',
  label:'',
  status:'',
  trans:false,
  offset_x:0,
  offset_y:0,
  fontSize:16,
  carGroupId:''
})


onEdgeDoubleClick((event) => {

  currentEdgeId.value=event.edge.id
  edgeFormData.value.id=event.edge.data.id
  edgeFormData.value.label=event.edge.data.label
  edgeFormData.value.offset_x=event.edge.data.offset_x || 0
  edgeFormData.value.offset_y=event.edge.data.offset_y || 0
  edgeFormData.value.carGroupId=event.edge.data.carGroupId || ''
  edgeFormData.value.fontSize=<number>event.edge.labelStyle?.['fontSize']
  edgeFormData.value.status = (event.edge.style as any)?.['stroke']
  edgeFormData.value.trans=false
  nodeDialog.value=false
  editEdgeLabelDialog.value=true
  edges.value.forEach((edge)=>{
    edge.labelStyle = edge.labelStyle || {}
    edge.labelStyle.fontSize = 12
  })
})

const currentNodeId:any = ref()

const nodeFormData = ref({
  id:'',
  distance:10.29,
  tongValue:0,
  label:''
})

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
  currentNodeId.value=event.node.id
  nodeFormData.value.id=event.node.data.id
  nodeFormData.value.distance=event.node.data.distance || 0
  nodeFormData.value.label=event.node.data.label || ''
  nodeFormData.value.tongValue=event.node.data.tongValue || 0
  editEdgeLabelDialog.value=false
  nodeDialog.value = true
})

function submitNodeLabel(){
  nodes.value.forEach((node) => {
    if(node.id===currentNodeId.value){
      console.log('aaa')
      updateNode(node.id,{data:{...node.data,id:nodeFormData.value.id,label:nodeFormData.value.label,distance:nodeFormData.value.distance,tongValue:nodeFormData.value.tongValue}})
    }
  })
  saveData()
  console.log(nodes.value)
}

function submitEdgeLabel(){
  edges.value.forEach((edge) => {
    if(edge.id===currentEdgeId.value){
      if(edgeFormData.value.trans){
        const source = edge.source
        edge.source=edge.target
        edge.target=source
      }
      edge.data.id=edgeFormData.value.id
      edge.data.carGroupId=edgeFormData.value.carGroupId
      edge.data.label=edgeFormData.value.label
      edge.data.offset_x=edgeFormData.value.offset_x
      edge.data.offset_y=edgeFormData.value.offset_y
      edge.style={stroke: edgeFormData.value.status, strokeWidth: 8}
      edge.labelStyle={ fill: 'rgba(138,138,138,0.85)',fontSize: edgeFormData.value.fontSize }
    }
  })
  saveData()
  console.log(edges.value)
}

onEdgesChange(()=>{
  saveData()
})

onNodesChange(()=>{
  saveData()
})

function handleShowData(){
  console.log(nodes.value)
  console.log(edges.value)
}

function handleCancalClick(){
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

function handleOnchange  (uploadFile: any)  {
  let file = uploadFile.raw  // 获取文件信息
  const fileReader = new FileReader()
  fileReader.readAsText(file!)  // 开始读取文件的内容为二进制
  fileReader.onload = (ev) => { // 读取完成,对数据进行自己的操作
    const data = ev.target?.result //获取内容
    const useData = JSON.parse(data as string)
    console.log(useData)
    nodes.value = useData.nodes
    edges.value = useData.edges
    nextTick(()=>{
      const maxId = Math.max(...nodes.value.map(obj => Number(obj.id)))
      localStorage.setItem('useId',String(maxId+1))
    })
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

function handleAllAnimate(){
  edges.value.forEach((edge:any) => {
    edge.style={stroke: 'rgba(86,255,39,0.85)',strokeWidth:'8','stroke-dasharray':'40px 12px'},
    edge.animated=true
    // updateEdge(edge,{animated:true})
  })
}

function handleAllAnimateClose(){
  edges.value.forEach((edge:any) => {
    edge.style={stroke: 'rgba(138,138,138,0.85)',strokeWidth:'8'},
    edge.animated=false
  })
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
        :pan-on-scroll="true"
        :zoom-on-scroll="true"
        :zoom-on-pinch="true"
        :zoom-on-double-click="true"
        :pan-on-drag="true"
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
        <template #node-Free="props">
          <FreeNode :data="props.data" />
        </template>
        <template #node-Cang="props">
          <CangNode :data="props.data" />
        </template>

        <template #edge-TestOne="props" >
          <TestOneEdge v-bind="props"/>
        </template>
        <Background style="background-color: rgb(0,18,29);" />
        <Panel position="top-left">
          <el-row style="align-items: center">
<!--            <el-tag size="large" style="margin-right: 12px;min-width: 150px">当前选中节点Id:{{currentNode?.id}}</el-tag>-->
            <el-button @click="handleHideNode">{{ visibleFlag?'隐藏透明节点':'显示透明节点' }}</el-button>
<!--            <el-button @click="handleDelNode">删除节点</el-button>-->
            <el-button @click="handleShowData">查看数据</el-button>
            <el-button @click="handleExportData">导出数据</el-button>
            <el-button @click="handleAllAnimate">全部动起来</el-button>
            <el-button @click="handleAllAnimateClose">全部停止</el-button>
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
        <Panel position="top-right" style="top:40px">
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
              <div class="nodeItem" :draggable="true" @dragstart="handleAddNode($event,'Cang')">
                <el-image :src="<string>Cang" style="width: 100%;height: 100%" fit="contain"/>
              </div>
            </el-space>
        </Panel>
      </VueFlow>
<!--      <el-image :draggable="false" style="position: absolute;top:46px;left: 253.4px;height: 796px;z-index: 0" fit="cover" :src="bgTest"/>-->
    </div>
    <div v-if="editEdgeLabelDialog" style="width: 400px;height: 100%;position: absolute;right:0;top:0;background: #ffffff;padding: 32px">
      <el-form label-width="100px">
        <el-form-item label="请输入ID:">
          <el-input v-model="edgeFormData.id"/>
        </el-form-item>
        <el-form-item label="请输入小车ID:">
          <el-input v-model="edgeFormData.carGroupId"/>
        </el-form-item>
        <el-form-item label="请输入显示值:">
          <el-input v-model="edgeFormData.label"/>
        </el-form-item>
        <el-form-item label="请选择状态:">
          <el-select v-model="edgeFormData.status">
            <el-option label="待机" value="#9B9B9B"/>
            <el-option label="正常" value="#3BB8D4"/>
            <el-option label="报警" value="#D99527"/>
            <el-option label="故障" value="#D95328"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否转向:">
          <el-select v-model="edgeFormData.trans">
            <el-option label="是" :value="true"/>
            <el-option label="否" :value="false"/>
          </el-select>
        </el-form-item>
        <el-form-item label="横轴偏移量:">
          <el-slider v-model="edgeFormData.offset_x" @input="submitEdgeLabel" :min="-500" :max="700" show-input/>
        </el-form-item>
        <el-form-item label="纵轴偏移量:">
          <el-slider v-model="edgeFormData.offset_y" @input="submitEdgeLabel" :min="-500" :max="700" show-input/>
        </el-form-item>
        <el-form-item label="字体大小:">
          <el-slider v-model="edgeFormData.fontSize" @input="submitEdgeLabel" :min="8" :max="100" show-input/>
        </el-form-item>
      </el-form>
<!--      <template #footer>-->
        <el-button @click="submitEdgeLabel">确定</el-button>
<!--      </template>-->
    </div>

    <div v-if="nodeDialog" style="width: 400px;height: 100%;position: absolute;right:0;top:0;background: #ffffff;padding: 32px">
      <el-form label-width="100px">
        <el-form-item label="请输入ID:">
          <el-input v-model="nodeFormData.id"/>
        </el-form-item>
        <el-form-item label="请输入显示值:">
          <el-input v-model="nodeFormData.label"/>
        </el-form-item>
        <el-form-item label="请输入距离:">
          <el-input v-model="nodeFormData.distance"/>
        </el-form-item>
        <el-form-item label="请输入筒数据:">
          <el-input v-model="nodeFormData.tongValue"/>
        </el-form-item>
      </el-form>
      <!--      <template #footer>-->
      <el-button @click="submitNodeLabel">确定</el-button>
      <!--      </template>-->
    </div>

  </TheContainer>
</template>

<style scoped>
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

:deep(.vue-flow__edge.animated path){
  stroke-dashoffset:30;
  animation: dashdraw 2s linear infinite;
}

@keyframes dashdraw {
  0% {
    stroke-dashoffset: -104;
  }
}
</style>