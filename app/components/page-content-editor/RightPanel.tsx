const RightPanel = ({ sections, content }) => {
  return (
    <div className="w-full md:w-1/2 bg-neutral-950 overflow-y-auto border-l border-neutral-800">
      <div className="p-12 max-w-2xl mx-auto flex flex-col items-center">
        {sections.map((section: string) =>
          Object.entries(content[section]).map(([key, value]) => {
            if (key === 'heading' && typeof value === 'string') {
              return (
                <h2
                  key={`${section}-${key}`}
                  className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0 text-center"
                >
                  {value}
                </h2>
              )
            }

            if (key === 'subheading' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-lg text-neutral-300 mb-6 text-center">
                  {value}
                </p>
              )
            }

            if (key === 'bodyText' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-neutral-400 leading-relaxed mb-6">
                  {value}
                </p>
              )
            }

            if (key === 'detail' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-neutral-300 whitespace-pre-line mb-4">
                  {value}
                </p>
              )
            }

            if (key === 'description' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-sm text-neutral-400 mb-2">
                  {value}
                </p>
              )
            }

            if (key === 'trustBadges' && Array.isArray(value)) {
              return (
                <div key={`${section}-${key}`} className="flex flex-wrap gap-2 mb-6 justify-center">
                  {value.map((badge: string) => (
                    <span
                      key={badge}
                      className="inline-block px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )
            }

            if (key === 'contactMethods' && Array.isArray(value)) {
              return (
                <div key={`${section}-${key}`} className="space-y-4 mb-6">
                  {value.map((method: any) => (
                    <div key={method.title} className="p-4 rounded-lg border border-neutral-700 bg-neutral-900/50">
                      <h3 className="font-bold text-white">{method.title}</h3>
                      <p className="text-sm text-neutral-400 mt-1">{method.description}</p>
                      <p className="text-indigo-400 font-semibold mt-2">{method.detail}</p>
                    </div>
                  ))}
                </div>
              )
            }

            if (key === 'stats' && typeof value === 'object') {
              return (
                <div key={`${section}-${key}`} className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(value).map(([statKey, statValue]) => (
                    <div key={statKey} className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-indigo-500 mb-1">{statValue}</p>
                      <p className="text-sm text-neutral-400 capitalize">
                        {statKey.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              )
            }

            if (key.startsWith('paragraph') && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-neutral-400 leading-relaxed mb-6">
                  {value}
                </p>
              )
            }

            if (key.startsWith('reason') && key.endsWith('Title') && typeof value === 'string') {
              const number = key.slice(-1)
              const description = content[section][`reason${number}Description`]
              return (
                <div key={`${section}-${key}`} className="mb-6 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <p className="font-semibold text-white mb-2">{value}</p>
                  <p className="text-neutral-400 text-sm">{description}</p>
                </div>
              )
            }

            if (key.startsWith('bullet') && typeof value === 'string') {
              return (
                <div key={`${section}-${key}`} className="mb-3 flex gap-3">
                  <span className="text-indigo-500 font-bold">•</span>
                  <p className="text-neutral-400">{value}</p>
                </div>
              )
            }

            if (key === 'description' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-neutral-400 leading-relaxed mb-6">
                  {value}
                </p>
              )
            }
            if (key === 'descriptionContinued' && typeof value === 'string') {
              return (
                <p key={`${section}-${key}`} className="text-neutral-400 leading-relaxed mb-6">
                  {value}
                </p>
              )
            }

            if (key.startsWith('testimonial') && key.endsWith('Author') === false && typeof value === 'string') {
              const number = key.slice(-1)
              const author = content[section][`testimonial${number}Author`]
              return (
                <div key={`${section}-${key}`} className="mb-4 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <p className="text-neutral-300 italic mb-2">"{value}"</p>
                  <p className="text-sm text-neutral-500">— {author}</p>
                </div>
              )
            }

            if (key.startsWith('question') && typeof value === 'string') {
              const number = key.slice(-1)
              const answer = content[section][`answer${number}`]
              return (
                <div key={`${section}-${key}`} className="mb-4 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <p className="font-semibold text-white mb-2">{value}</p>
                  <p className="text-neutral-400 text-sm">{answer}</p>
                </div>
              )
            }

            if (key === 'placeholderText' && typeof value === 'string') {
              return (
                <div key={`${section}-${key}`} className="flex gap-2 mb-6">
                  <input
                    type="email"
                    placeholder={value}
                    className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm"
                  />
                  <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                    {content[section].buttonText}
                  </button>
                </div>
              )
            }

            if (key === 'buttonText' && typeof value === 'string' && section !== 'newsletter') {
              return (
                <button
                  key={`${section}-${key}`}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors w-fit mb-6"
                >
                  {value}
                </button>
              )
            }

            return null
          })
        )}
      </div>
    </div>
  )
}

export default RightPanel
