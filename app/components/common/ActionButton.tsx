const ActionButton = ({
  onClick,
  title,
  description,
  dotColor = 'bg-purple-400',
  className = '',
  showDescription = true,
  disabled = false,
  isLoading = false,
  icon,
  variant = 'default'
}: any) => {
  const baseClasses =
    'w-full flex items-start space-x-3 p-3 text-left rounded-lg transition-all duration-200 group touch-manipulation'

  const variantClasses: Record<string, string> = {
    default: 'hover:bg-slate-700/30 active:bg-slate-600/40',
    danger: 'hover:bg-red-700/20 active:bg-red-600/30',
    success: 'hover:bg-green-700/20 active:bg-green-600/30',
    warning: 'hover:bg-yellow-700/20 active:bg-yellow-600/30',
    primary: 'hover:bg-purple-700/20 active:bg-purple-600/30'
  }

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-transparent active:bg-transparent'

  const buttonClasses = `
    ${baseClasses} 
    ${disabled ? disabledClasses : variantClasses[variant]} 
    ${className}
  `.trim()

  const handleClick = (e: { preventDefault: () => void }) => {
    if (disabled || isLoading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  return (
    <button onClick={handleClick} disabled={disabled || isLoading} className={buttonClasses} type="button">
      {/* Indicator Dot or Icon */}
      <div className="flex items-center justify-center mt-1 flex-shrink-0">
        {isLoading ? (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full animate-pulse"></div>
        ) : icon ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-purple-300 transition-colors">
            {icon}
          </div>
        ) : (
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${dotColor} rounded-full flex-shrink-0`}></div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="text-white font-medium text-sm group-hover:text-purple-200 leading-tight transition-colors">
          {isLoading ? 'Loading...' : title}
        </div>

        {description && showDescription && (
          <div className="text-slate-400 text-xs mt-1 leading-relaxed hidden sm:block group-hover:text-slate-300 transition-colors">
            {description}
          </div>
        )}
      </div>

      {/* Optional trailing content */}
      {!isLoading && (
        <div className="flex items-center justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </button>
  )
}

export default ActionButton
