import { useState } from 'react'

const DragDropTextEditor = () => {
  const [blocks, setBlocks] = useState<
    { id: number; text: string; position: { x: number; y: number }; size: { width: number; height: number } }[]
  >([]) // Store dropped blocks
  const [draggingBlock, setDraggingBlock] = useState<string | null>(null)

  // Handle text drop into the grid area
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault()
    if (draggingBlock) {
      const newBlock = {
        id: Date.now(),
        text: draggingBlock,
        position: { x, y },
        size: { width: 1, height: 1 } // Default block size
      }
      setBlocks((prev) => [...prev, newBlock])
      setDraggingBlock(null) // Reset the dragging state
    }
  }

  // Allow drop (must call preventDefault)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Create draggable text blocks dynamically
  const createTextBlock = (text: string) => {
    setDraggingBlock(text) // Set the current dragging block
  }

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedBlocks = blocks.map((block) => (block.id === id ? { ...block, text: e.target.value } : block))
    setBlocks(updatedBlocks) // Update block text as user types
  }

  // Handle the dragging of a block
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    const updatedBlocks = blocks.map((block) => (block.id === id ? { ...block, position: { x: e.clientX, y: e.clientY } } : block))
    setBlocks(updatedBlocks)
  }

  // Handle resizing the block
  const handleResize = (id: number, direction: string) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === id) {
        const newSize = { ...block.size }
        if (direction === 'increaseWidth') newSize.width += 1
        if (direction === 'decreaseWidth') newSize.width = Math.max(1, newSize.width - 1)
        if (direction === 'increaseHeight') newSize.height += 1
        if (direction === 'decreaseHeight') newSize.height = Math.max(1, newSize.height - 1)
        return { ...block, size: newSize }
      }
      return block
    })
    setBlocks(updatedBlocks)
  }

  return (
    <div className="flex gap-8 p-8">
      {/* Left side - Draggable Text Blocks */}
      <div className="flex flex-col gap-4 w-1/3 p-4">
        <div
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-400"
          draggable
          onDragStart={() => createTextBlock('Block 1')}
        >
          Block 1
        </div>
        <div
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-400"
          draggable
          onDragStart={() => createTextBlock('Block 2')}
        >
          Block 2
        </div>
        <div
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-400"
          draggable
          onDragStart={() => createTextBlock('Block 3')}
        >
          Block 3
        </div>
      </div>

      {/* Right side - 12x12 Grid */}
      <div className="flex-1 grid grid-cols-12 grid-rows-12 gap-1 p-4 border-2 border-gray-300">
        {/* Loop through the grid and drop areas */}
        {Array.from({ length: 12 }).map((_, rowIndex) =>
          Array.from({ length: 12 }).map((_, colIndex) => {
            // Find any block that is dropped in this grid cell
            const blockInCell = blocks.find((block) => block.position.x === colIndex && block.position.y === rowIndex)
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-full h-full p-2 border border-gray-200"
                onDrop={(e) => handleDrop(e, colIndex, rowIndex)}
                onDragOver={handleDragOver}
              >
                {/* If there's a block in the cell, render it */}
                {blockInCell ? (
                  <div
                    className="w-full h-full bg-gray-100 p-2 border border-gray-300 rounded"
                    style={{
                      gridColumnStart: blockInCell.position.x + 1,
                      gridColumnEnd: blockInCell.position.x + blockInCell.size.width + 1,
                      gridRowStart: blockInCell.position.y + 1,
                      gridRowEnd: blockInCell.position.y + blockInCell.size.height + 1
                    }}
                    draggable
                    onDrag={(e) => handleDrag(e, blockInCell.id)}
                  >
                    <input
                      type="text"
                      value={blockInCell.text}
                      onChange={(e) => handleTextChange(e, blockInCell.id)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* Resize buttons */}
                    <div className="flex justify-between mt-2">
                      <button className="text-sm" onClick={() => handleResize(blockInCell.id, 'increaseWidth')}>
                        ➡️
                      </button>
                      <button className="text-sm" onClick={() => handleResize(blockInCell.id, 'decreaseWidth')}>
                        ⬅️
                      </button>
                      <button className="text-sm" onClick={() => handleResize(blockInCell.id, 'increaseHeight')}>
                        ⬇️
                      </button>
                      <button className="text-sm" onClick={() => handleResize(blockInCell.id, 'decreaseHeight')}>
                        ⬆️
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-transparent border border-gray-300 rounded"></div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default DragDropTextEditor
