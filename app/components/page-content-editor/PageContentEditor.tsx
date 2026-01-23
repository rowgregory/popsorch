import { FC, JSX, useEffect, useState } from 'react'
import { Eye, EyeOff, Edit2, Check, ChevronDown, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import RightPanel from './RightPanel'

interface PageContent {
  [key: string]: Record<string, any>
}

interface PageContentEditorProps {
  initialContent: PageContent
  onSave: (content: PageContent) => Promise<void>
  isLoading: boolean
}

export const PageContentEditor: FC<PageContentEditorProps> = ({ initialContent, onSave, isLoading }) => {
  const [content, setContent] = useState<PageContent>(initialContent)
  const [expandedSections, setExpandedSections] = useState<string[]>(Object.keys(initialContent))
  const [editingField, setEditingField] = useState<string | null>(null)
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent)
    }
  }, [initialContent])

  if (!content || typeof content !== 'object' || Object.keys(content).length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-neutral-950">
        <p className="text-neutral-400">No content available</p>
      </div>
    )
  }

  const sections = Object.keys(content)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((s) => s !== sectionId) : [...prev, sectionId]
    )
  }

  const handleEdit = (section: string, fieldPath: string, value: string) => {
    const newContent = structuredClone(content)
    const pathParts = fieldPath.split('.')
    let current = newContent[section]

    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {}
      }
      current = current[pathParts[i]]
    }

    current[pathParts[pathParts.length - 1]] = value
    setContent(newContent)
  }

  const handleSave = async () => await onSave(content)

  const renderField = (
    section: string,
    fieldName: string,
    value: string,
    type: 'text' | 'textarea' = 'text'
  ): JSX.Element => {
    const fieldId = `${section}-${fieldName}`
    const isEditing = editingField === fieldId

    return (
      <div key={fieldId} className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-neutral-400">
            {fieldName.charAt(0).toUpperCase() + fieldName.replace(/([A-Z])/g, ' $1').slice(1)}
          </label>
          <button
            onClick={() => setEditingField(isEditing ? null : fieldId)}
            className="p-1 hover:bg-neutral-800 rounded transition-colors"
          >
            {isEditing ? <Check className="w-4 h-4 text-green-400" /> : <Edit2 className="w-4 h-4 text-neutral-500" />}
          </button>
        </div>

        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleEdit(section, fieldName, e.target.value)}
            disabled={!isEditing}
            rows={4}
            className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isEditing ? 'border-indigo-500' : 'border-neutral-700'
            } ${!isEditing && 'cursor-not-allowed opacity-75'}`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleEdit(section, fieldName, e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isEditing ? 'border-indigo-500' : 'border-neutral-700'
            } ${!isEditing && 'cursor-not-allowed opacity-75'}`}
          />
        )}

        {isEditing && <p className="text-xs text-neutral-500 mt-1">Click the checkmark to confirm changes</p>}
      </div>
    )
  }

  const renderSection = (sectionId: string, sectionData: Record<string, any>): JSX.Element => {
    const isExpanded = expandedSections.includes(sectionId)

    return (
      <div key={sectionId} className="bg-neutral-900 rounded-lg border border-neutral-800 mb-4">
        <button
          onClick={() => toggleSection(sectionId)}
          className="w-full flex items-center justify-between p-4 hover:bg-neutral-800/50 transition-colors rounded-lg"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-neutral-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            )}
            <h3 className="text-base font-semibold text-white capitalize">
              {sectionId.replace(/([A-Z])/g, ' $1')} Section
            </h3>
          </div>
          <span className="text-xs text-neutral-500">{Object.keys(sectionData).length} fields</span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-2">
                {Object.entries(sectionData).map(([field, value]) => {
                  // Handle strings
                  if (typeof value === 'string') {
                    return renderField(sectionId, field, value, value.length > 100 ? 'textarea' : 'text')
                  }

                  // Handle arrays
                  else if (Array.isArray(value)) {
                    // Check if it's an array of strings
                    const isStringArray = value.every((item) => typeof item === 'string')

                    if (isStringArray) {
                      // Array of strings (like paragraphs)
                      return (
                        <div key={field} className="ml-4 pl-4 border-l-2 border-neutral-800">
                          <h4 className="text-sm font-medium text-neutral-400 mb-3 capitalize">
                            {field.replace(/([A-Z])/g, ' $1')}
                          </h4>
                          {value.map((item, index) => (
                            <div key={index} className="mb-3">
                              <label className="text-xs text-neutral-500 mb-1 block">
                                {field.slice(0, -1)} {index + 1}
                              </label>
                              {renderField(
                                sectionId,
                                `${field}[${index}]`,
                                item as string,
                                (item as string).length > 100 ? 'textarea' : 'text'
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    } else {
                      return (
                        <div key={field} className="ml-4 pl-4 border-l-2 border-neutral-800">
                          <h4 className="text-sm font-medium text-neutral-400 mb-3 capitalize">
                            {field.replace(/([A-Z])/g, ' $1')}
                          </h4>
                          {value.map((item, index) => (
                            <div key={index} className="mb-4 p-3 bg-neutral-800/50 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-neutral-400">
                                  {field.slice(0, -1)} {index + 1}
                                </span>
                              </div>
                              {typeof item === 'string' ? (
                                renderField(sectionId, `${field}[${index}]`, item, 'text')
                              ) : (
                                <div className="space-y-2">
                                  {Object.entries(item as Record<string, unknown>).map(([itemField, itemValue]) => (
                                    <div key={itemField}>
                                      {typeof itemValue === 'string' && (
                                        <div>
                                          <label className="text-xs text-neutral-500 mb-1 block capitalize">
                                            {itemField.replace(/([A-Z])/g, ' $1')}
                                          </label>
                                          {renderField(
                                            sectionId,
                                            `${field}[${index}].${itemField}`,
                                            itemValue,
                                            itemValue.length > 100 ? 'textarea' : 'text'
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    }
                  }

                  // Handle nested objects
                  else if (typeof value === 'object' && value !== null) {
                    return (
                      <div key={field} className="ml-4 pl-4 border-l-2 border-neutral-800">
                        <h4 className="text-sm font-medium text-neutral-400 mb-3 capitalize">
                          {field.replace(/([A-Z])/g, ' $1')}
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(value as Record<string, unknown>).map(([subField, subValue]) => (
                            <div key={subField}>
                              {typeof subValue === 'string' && (
                                <div>
                                  <label className="text-xs text-neutral-500 mb-1 block capitalize">
                                    {subField.replace(/([A-Z])/g, ' $1')}
                                  </label>
                                  {renderField(
                                    sectionId,
                                    `${field}.${subField}`,
                                    subValue,
                                    subValue.length > 100 ? 'textarea' : 'text'
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="pt-12 h-[calc(100dvh-60px)] flex flex-col md:flex-row bg-neutral-950">
      {/* Left Panel - Editor */}
      <div
        className={`${
          isPreviewVisible ? 'w-full md:w-1/2' : 'w-full'
        } border-r border-neutral-800 flex flex-col overflow-hidden transition-all`}
      >
        {/* Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">Page Content Editor</h1>
        </div>

        {/* Content Editor */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {sections.map((section) => renderSection(section, content[section]))}
        </div>

        {/* Footer */}
        <div className="bg-neutral-900 border-t border-neutral-800 px-6 py-4 flex gap-3  relative">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-end">
            <button
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors w-full md:w-fit"
            >
              {isPreviewVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              {isPreviewVisible ? 'Hide' : 'Show'} Preview
            </button>

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors w-full md:w-fit"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      {isPreviewVisible && <RightPanel content={content} sections={sections} />}
    </div>
  )
}
