'use client'
import { useState, DragEvent } from 'react'

interface Square {
  id: string
  color: string
}

const initialSquares: Square[] = [
  { id: 'red', color: 'bg-red-500' },
  { id: 'blue', color: 'bg-blue-500' },
  { id: 'green', color: 'bg-green-500' },
  { id: 'yellow', color: 'bg-yellow-500' }
]

const DragAndDropExample = () => {
  const [grid, setGrid] = useState<(Square | null)[]>(Array(4).fill(null))
  const [squares, setSquares] = useState<Square[]>(initialSquares)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  //   const [draggingFromGrid, setDraggingFromGrid] = useState<number | null>(null)

  // Handles dragging event
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string, fromGrid: number | null) => {
    e.dataTransfer.setData('id', id)
    e.dataTransfer.setData('fromGrid', fromGrid !== null ? fromGrid.toString() : '')
    setDraggingId(id)
    // setDraggingFromGrid(fromGrid)
  }

  // Handles drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    const id = e.dataTransfer.getData('id')
    const fromGridIndex = e.dataTransfer.getData('fromGrid')
    const isFromGrid = fromGridIndex !== ''

    if (!id) return

    const square = isFromGrid ? grid[Number(fromGridIndex)] : squares.find((sq) => sq.id === id)

    if (!square || grid[index]) return

    const newGrid = [...grid]

    if (isFromGrid) {
      // Move square within grid
      newGrid[Number(fromGridIndex)] = null // Clear original position
    } else {
      // Remove from pool
      setSquares((prevSquares) => prevSquares.filter((sq) => sq.id !== id))
    }

    newGrid[index] = square

    setGrid(newGrid)
    setDraggingId(null)
    // setDraggingFromGrid(null)
  }

  // Removes a square from the grid and places it back in the pool
  const handleSquareClick = (index: number) => {
    const square = grid[index]

    if (square) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid]
        newGrid[index] = null // Remove from grid
        return newGrid
      })

      setSquares((prevSquares) => [...prevSquares, square]) // Add back to pool
    }
  }

  // Resets the board
  const handleReset = () => {
    setGrid(Array(4).fill(null))
    setSquares(initialSquares)
    setDraggingId(null)
    // setDraggingFromGrid(null)
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center relative">
      {/* Squares Pool */}
      <div className="absolute top-10 right-10 flex gap-4">
        {squares.map((square) => (
          <div
            key={square.id}
            draggable
            onDragStart={(e) => handleDragStart(e, square.id, null)}
            className={`w-20 h-20 ${square.color} cursor-move shadow-lg 
              ${draggingId === square.id ? 'border-4 border-dotted' : ''} 
              ${
                square.id === 'red'
                  ? 'border-red-500'
                  : square.id === 'blue'
                  ? 'border-blue-500'
                  : square.id === 'green'
                  ? 'border-green-500'
                  : 'border-yellow-500'
              }`}
          />
        ))}
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        {grid.map((square, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleSquareClick(index)}
            className="w-40 h-40 bg-white border-2 border-gray-300 flex items-center justify-center shadow-md cursor-pointer"
          >
            {square ? (
              <div draggable onDragStart={(e) => handleDragStart(e, square.id, index)} className={`w-20 h-20 ${square.color} shadow-md`} />
            ) : (
              <span className="text-gray-400">Drop here</span>
            )}
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button onClick={handleReset} className="absolute bottom-10 px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700">
        Reset
      </button>
    </div>
  )
}

export default DragAndDropExample
