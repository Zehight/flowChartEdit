import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'



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

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

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
      addNodes(newNode)
    }else{
      const newNode:any = {
        id: nodeId,
        type: draggedType.value,
        position,
        data: { label: nodeId },
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
