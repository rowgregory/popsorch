const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border-2 border-cyan-400 p-4 shadow-2xl">
        <p className="text-white font-bold mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-300"></div>
            <span className="text-cyan-300 font-medium">Desktop: {payload[0]?.value}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500"></div>
            <span className="text-cyan-500 font-medium">Mobile: {payload[1]?.value}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default CustomTooltip
