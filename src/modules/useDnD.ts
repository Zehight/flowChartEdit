import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import ShiftingEdgeLabel from '@/components/customEdges/ShiftingEdgeLabel.vue'



/**
 * @returns {string} - A unique id.
 */
function getId() {
  const storageId = Number(localStorage.getItem('useId'))
  const id = storageId+1

  const returnId = `${id}`
  localStorage.setItem('useId', String(id))
  return returnId
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}


const commonTransparentEdgeConfig={
  type: 'TestOne',
  animated:true,
  style: { stroke: 'rgb(59,184,212)', strokeWidth: 3 },
  labelStyle: { fill: 'white', fontWeight: 600 },
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 2,
  labelBgStyle: { fillOpacity:0,y:-18,fill:'#10b981',x:-8 },
}

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addEdges,addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event:any, type:any) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event:any) {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event:any) {
    const nodeId = getId()
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })
    if(draggedType.value === 'Line'){
      const newNode:any = {
        id: nodeId,
        type: draggedType.value,
        position,
        data: { label: '', text: String(nodeId),visible:true,toolBarVisible:false },
      }
      const nodeId2 = getId()
      const position2 = {
        x: newNode.position.x+200,
        y: newNode.position.y,
      }
      const newNode2:any = {
        id: nodeId2,
        type: 'Line',
        position:position2,
        data: { label: '', text: nodeId2,visible:true,toolBarVisible:false },
      }
      addNodes([newNode,newNode2])
      const edgeId = 'e' +newNode.id + '>' + newNode2.id
      addEdges([{
        id: edgeId,
        source: newNode.id,
        target: newNode2.id,
        label: edgeId,
        ...commonTransparentEdgeConfig
      }])
    }else if(draggedType.value === 'Tong'){
      const newNode:any = {
        id: nodeId,
        type: draggedType.value,
        position,
        data: { label: '',text: String(nodeId),progress:50,toolBarVisible:false },
      }
      addNodes(newNode)
    }
    else{
      const newNode:any = {
        id: nodeId,
        type: draggedType.value,
        position,
        data: { label: '',text: String(nodeId),toolBarVisible:false },
      }
      addNodes(newNode)
    }
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
