const PopsLoader = ({ size = 'md', className = '' }) => {
  const sizeClasses: any = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center p-6 ${className}`}>
      {/* Animated Logo/Icon */}
      <div className={`relative ${sizeClasses[size]} mb-4`}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full animate-pulse flex items-center justify-center">
          {/* Center dot */}
          <div className="w-3 h-3 bg-amber-900 rounded-full animate-bounce"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping animation-delay-200"></div>
        <div className="absolute top-1/2 -left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping animation-delay-500"></div>
      </div>

      {/* Brand Text */}
      <div className="text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-1">
          The Pops
        </h3>
        <p className="text-amber-700 text-sm font-medium">Loading...</p>
      </div>

      {/* Progress dots */}
      <div className="flex space-x-1 mt-3">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce animation-delay-200"></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce animation-delay-500"></div>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}

export default PopsLoader
