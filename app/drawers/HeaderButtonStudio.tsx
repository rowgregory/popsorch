import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Home,
  Globe,
  Phone,
  Palette,
  Type,
  Link,
  Play,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Plus,
  GripVertical,
  Trash2,
  Hand
} from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseHeaderButtonStudio } from '../redux/features/appSlice'
import {
  useAssignHeaderButtonMutation,
  useCreateHeaderButtonMutation,
  useDeleteHeaderButtonMutation,
  useFetchHeaderButtonsQuery,
  useUpdateHeaderButtonMutation
} from '../redux/services/headerButtonApi'
import { resetSuccessUpdate } from '../redux/features/headerButtonSlice'

const animations = [
  {
    id: 'scale',
    name: 'Scale',
    description: 'Smooth scaling effect',
    icon: '📏',
    variants: {
      initial: { scale: 1 },
      hover: { scale: 1.05 }
    }
  },
  {
    id: 'slide',
    name: 'Slide',
    description: 'Slide animation with shadow',
    icon: '🎯',
    variants: {
      initial: { x: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      hover: { x: 4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
    }
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Playful bounce effect',
    icon: '🏀',
    variants: {
      initial: { y: 0 },
      hover: { y: -8 }
    }
  },
  {
    id: 'glow',
    name: 'Glow',
    description: 'Glowing border effect',
    icon: '✨',
    variants: {
      initial: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
      hover: { boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.3)' }
    }
  },
  {
    id: 'rotate',
    name: 'Rotate',
    description: 'Subtle rotation effect',
    icon: '🔄',
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 2 }
    }
  }
]

const navigationTabs = [
  { id: 'type', label: 'Type', icon: Hand },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'link', label: 'Link', icon: Link },
  { id: 'animations', label: 'Animations', icon: Sparkles }
]

const HeaderButtonStudio = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('scale')
  const { toggleHeaderButtonStudio } = useAppSelector((state: RootState) => state.app)
  const { headerButtons, successUpdate } = useAppSelector((state: RootState) => state.headerButton)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState('type')
  const initialButtonState = {
    text: 'Get Started',
    fontColor: '#ffffff',
    backgroundColor: '#3b82f6',
    linkType: 'internal',
    link: '/get-started',
    id: '',
    buttonType: 'button', // 'button' or 'dropdown'
    dropdownItems: []
  }
  const [buttonConfig, setButtonConfig] = useState(initialButtonState) as any
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseHeaderButtonStudio())
  const [createHeaderButton, { isLoading: loadingCreate }] = useCreateHeaderButtonMutation()
  const [deleteHeaderButton] = useDeleteHeaderButtonMutation()
  const [assignHeaderButton, { isLoading: loadingAssign }] = useAssignHeaderButtonMutation()
  const [updateHeaderButton] = useUpdateHeaderButtonMutation()
  useFetchHeaderButtonsQuery(undefined)
  const [loading, setLoading] = useState({}) as any
  const [loadingUpdate, setLoadingUpdate] = useState({}) as any

  const playPreview = (animationId: any) => {
    setSelectedAnimation(animationId)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const getLinkIcon = () => {
    const iconProps = { className: 'w-4 h-4 text-gray-400' }
    switch (buttonConfig.linkType) {
      case 'phone':
        return <Phone {...iconProps} />
      case 'external':
        return <Globe {...iconProps} />
      default:
        return <Home {...iconProps} />
    }
  }

  const getLinkPlaceholder = () => {
    switch (buttonConfig.linkType) {
      case 'phone':
        return '+1-555-123-4567'
      case 'external':
        return 'https://example.com'
      default:
        return '/about'
    }
  }

  const getPreviewHref = () => {
    if (!buttonConfig.link) return 'No link set'
    switch (buttonConfig.linkType) {
      case 'phone':
        return `tel:${buttonConfig.link}`
      case 'external':
        return buttonConfig.link
      default:
        return buttonConfig.link
    }
  }

  const addDropdownItem = () => {
    setButtonConfig({
      ...buttonConfig,
      dropdownItems: [
        ...buttonConfig.dropdownItems,
        {
          id: Date.now(),
          text: '',
          linkType: 'internal',
          link: '',
          icon: ''
        }
      ]
    })
  }

  const updateDropdownItem = (index: number, field: any, value: any) => {
    const updatedItems = buttonConfig.dropdownItems.map((item: any, i: number) =>
      i === index ? { ...item, [field]: value } : item
    )
    setButtonConfig({ ...buttonConfig, dropdownItems: updatedItems })
  }

  const removeDropdownItem = (index: number) => {
    const updatedItems = buttonConfig.dropdownItems.filter((_: any, i: number) => i !== index)
    setButtonConfig({ ...buttonConfig, dropdownItems: updatedItems })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Button Text</h3>
              <p className="text-sm text-gray-400 mb-4">Set the text that appears on your button</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Button Text</label>
              <input
                type="text"
                value={buttonConfig.text}
                onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, text: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-lg"
                placeholder="Enter button text"
              />
            </div>
          </div>
        )

      case 'colors':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Colors</h3>
              <p className="text-sm text-gray-400 mb-4">Customize the appearance of your button</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={buttonConfig.fontColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, fontColor: e.target.value }))}
                    className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-800 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={buttonConfig.fontColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, fontColor: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={buttonConfig.backgroundColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-800 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={buttonConfig.backgroundColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'link':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Link Settings</h3>
              <p className="text-sm text-gray-400 mb-4">Configure where your button should navigate</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300">Link Type</label>
              <div className="grid gap-3">
                {[
                  { value: 'internal', label: 'Internal Page', icon: Home, desc: 'Navigate within your app' },
                  { value: 'external', label: 'External Website', icon: Globe, desc: 'Open external website' },
                  { value: 'phone', label: 'Phone Number', icon: Phone, desc: 'Dial phone number' }
                ].map((type) => (
                  <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setButtonConfig((prev: any) => ({ ...prev, linkType: type.value, link: '' }))}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      buttonConfig.linkType === type.value
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <type.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm opacity-75">{type.desc}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getLinkIcon()}
                <label className="text-sm font-medium text-gray-300">
                  {buttonConfig.linkType === 'phone'
                    ? 'Phone Number'
                    : buttonConfig.linkType === 'external'
                    ? 'External URL'
                    : 'Internal Path'}
                </label>
              </div>
              <input
                type="text"
                value={buttonConfig.link}
                onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, link: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder={getLinkPlaceholder()}
              />
              <div className="text-xs text-gray-400">
                {buttonConfig.linkType === 'internal' && 'Use paths like /about, /contact, /services'}
                {buttonConfig.linkType === 'external' && 'Include https:// for external links'}
                {buttonConfig.linkType === 'phone' && 'Format: +1-555-123-4567 or (555) 123-4567'}
              </div>
            </div>
          </div>
        )

      case 'animations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Animations</h3>
              <p className="text-sm text-gray-400 mb-4">Choose how your button responds to user interaction</p>
            </div>

            <div className="space-y-3">
              {animations.map((animation) => (
                <motion.div
                  key={animation.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedAnimation === animation.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedAnimation(animation.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{animation.icon}</span>
                      <div>
                        <h4 className="text-white font-medium">{animation.name}</h4>
                        <p className="text-sm text-gray-400">{animation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          playPreview(animation.id)
                        }}
                        className="px-3 py-1 text-xs bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-3 h-3" />
                        Preview
                      </motion.button>
                      {selectedAnimation === animation.id && (
                        <motion.div
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return renderTypeTab()
    }
  }

  const renderTypeTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">Choose Button Type</label>
        <div className="space-y-3">
          <motion.label
            className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              name="buttonType"
              value="button"
              checked={buttonConfig.buttonType === 'button'}
              onChange={(e) =>
                setButtonConfig({
                  ...buttonConfig,
                  buttonType: e.target.value,
                  dropdownItems: []
                })
              }
              className="mr-3 text-blue-600"
            />
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-3 text-blue-400" />
              <div>
                <span className="text-white font-medium">Regular Button</span>
                <p className="text-sm text-gray-400">Simple button that links to a page</p>
              </div>
            </div>
          </motion.label>

          <motion.label
            className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              name="buttonType"
              value="dropdown"
              checked={buttonConfig.buttonType === 'dropdown'}
              onChange={(e) =>
                setButtonConfig({
                  ...buttonConfig,
                  buttonType: e.target.value,
                  link: ''
                })
              }
              className="mr-3 text-blue-600"
            />
            <div className="flex items-center">
              <ChevronDown className="w-5 h-5 mr-3 text-purple-400" />
              <div>
                <span className="text-white font-medium">Dropdown Menu</span>
                <p className="text-sm text-gray-400">Button with multiple menu options</p>
              </div>
            </div>
          </motion.label>
        </div>
      </div>

      {buttonConfig.buttonType === 'dropdown' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Dropdown Items</h3>
            <motion.button
              onClick={addDropdownItem}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Item
            </motion.button>
          </div>

          {buttonConfig.dropdownItems.length === 0 ? (
            <div className="text-center py-6 border border-gray-600 border-dashed rounded-lg">
              <ChevronDown className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No dropdown items yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {buttonConfig.dropdownItems.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-300">Item {index + 1}</span>
                    </div>
                    <button
                      onClick={() => removeDropdownItem(index)}
                      className="p-1 hover:bg-gray-700 rounded text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateDropdownItem(index, 'text', e.target.value)}
                      className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white placeholder-gray-500 text-sm"
                      placeholder="Menu item text"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateDropdownItem(index, 'linkType', 'internal')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          item.linkType === 'internal'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        Internal
                      </button>
                      <button
                        onClick={() => updateDropdownItem(index, 'linkType', 'external')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          item.linkType === 'external'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        External
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => updateDropdownItem(index, 'link', e.target.value)}
                      className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white placeholder-gray-500 text-sm"
                      placeholder={item.linkType === 'external' ? 'https://example.com' : '/link-url'}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )

  const handleCreateHeaderButton = async () => {
    const buttonData = {
      ...buttonConfig,
      animation: selectedAnimation
    }

    await createHeaderButton(buttonData).unwrap()

    setButtonConfig(initialButtonState)
    setSelectedAnimation('scale')
    setActiveTab('text')
  }

  const handleAssignHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()
    await assignHeaderButton({ buttonId }).unwrap()
  }

  const handleDeleteHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()
    setLoading({ [buttonId]: true })
    await deleteHeaderButton({ buttonId }).unwrap()
    setLoading({ [buttonId]: false })
  }

  const handleUpdateHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()
    setLoadingUpdate({ [buttonId]: true })

    const buttonData = {
      ...buttonConfig,
      animation: selectedAnimation,
      buttonId
    }

    await updateHeaderButton(buttonData).unwrap()
    setLoadingUpdate({ [buttonId]: false })
    setActiveTab('text')
    setButtonConfig(initialButtonState)
  }

  useEffect(() => {
    if (successUpdate) {
      const timer = setTimeout(() => {
        dispatch(resetSuccessUpdate()) // or however you reset the success state
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, successUpdate])

  console.log('BUTTON CONFIG: ', buttonConfig)

  return (
    <AnimatePresence>
      {toggleHeaderButtonStudio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex"
        >
          {/* Left Navigation Panel */}
          <div className="w-80 bg-[#1a1a1a] border-r border-gray-700 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Header Button Studio</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="p-4 border-b border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {navigationTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
                      activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">{renderTabContent()}</div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-700">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  disabled={
                    loadingCreate ||
                    loadingUpdate[buttonConfig.id] ||
                    buttonConfig.text === 'Get Started' ||
                    buttonConfig.link === '/get-started'
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) =>
                    buttonConfig.id !== '' ? handleUpdateHeaderButton(e, buttonConfig.id) : handleCreateHeaderButton()
                  }
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium disabled:cursor-not-allowed ${
                    successUpdate
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500'
                  }`}
                >
                  {loadingUpdate[buttonConfig.id] ? 'Saving' : successUpdate ? 'Saved!' : 'Save Button'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Saved Buttons Panel - Only show if there are saved buttons */}
          {headerButtons?.length > 0 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-[#161616] border-r border-gray-700 flex flex-col"
            >
              {/* Saved Buttons Header */}
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Saved Buttons</h3>
                <p className="text-sm text-gray-400">
                  {headerButtons.length} button{headerButtons?.length !== 1 ? 's' : ''} created
                </p>
              </div>

              {/* Saved Buttons List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {headerButtons?.map((button: any) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      buttonConfig.id === button.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                    onClick={() => {
                      if (buttonConfig.id !== '') {
                        setButtonConfig(initialButtonState)
                        setActiveTab('text')
                      } else {
                        setButtonConfig({ ...button, buttonType: button.type })
                      }
                    }}
                  >
                    {/* Full Button Preview - Exactly as created */}
                    <div className="mb-4 flex justify-center">
                      <motion.button
                        className="px-6 py-3 rounded-lg font-medium relative overflow-hidden shadow-md"
                        variants={animations.find((a) => a.id === button.animation)?.variants}
                        initial="initial"
                        whileHover="hover"
                        style={{
                          backgroundColor: `${button.backgroundColor}`,
                          color: `${button.fontColor}`
                        }}
                      >
                        <span className="relative z-10">{button.text}</span>

                        {button.animation === 'glow' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg"
                            whileHover={{
                              opacity: [0.5, 0.8, 0.5],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    </div>

                    {/* Button Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm truncate">{button.text}</span>
                        {buttonConfig.id === button.id && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Editing</span>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <span>Button Type:</span>
                          <span className="text-blue-300 capitalize">{button.type}</span>
                        </div>
                        {button.type === 'dropdown' && (
                          <div className="flex items-center gap-2">
                            <span>Dropdown item total:</span>
                            <span className="text-blue-300 capitalize">{button.dropdownItems.length}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span>Animation:</span>
                          <span className="text-blue-300 capitalize">{button.animation}</span>
                          <span className="text-lg">{animations.find((a) => a.id === button.animation)?.icon}</span>
                        </div>
                        {button.link && (
                          <div className="flex items-center gap-2">
                            <span>Link:</span>
                            <span className="text-blue-300 capitalize">{button.linkType}</span>
                            {button.link && (
                              <span className="text-gray-500 truncate max-w-32" title={button.link}>
                                {button.linkType === 'phone' ? `tel:${button.link}` : button.link}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span>Colors:</span>
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3 rounded border border-gray-500"
                              style={{ backgroundColor: `${button.backgroundColor}` }}
                              title={`Background: #${button.backgroundColor}`}
                            />
                            <div
                              className="w-3 h-3 rounded border border-gray-500"
                              style={{ backgroundColor: `${button.fontColor}` }}
                              title={`Text: #${button.fontColor}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          disabled={loadingAssign}
                          onClick={(e) => handleAssignHeaderButton(e, button.id)}
                          className={`flex-1 px-3 py-2 text-xs rounded font-medium transition-colors ${
                            button.isActive
                              ? 'bg-green-600 text-white cursor-default'
                              : loadingAssign
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {button.isActive ? 'Active' : loadingAssign ? 'Assigning...' : 'Assign'}
                        </button>
                        <button
                          disabled={loading[button.id]}
                          onClick={(e) => handleDeleteHeaderButton(e, button.id)}
                          className="flex-1 px-3 py-2 text-xs bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors font-medium"
                        >
                          {loading[button.id] ? 'Deleting' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Main Canvas Area */}
          <div className="flex-1 bg-gray-900 flex flex-col">
            {/* Canvas Header */}
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
              <p className="text-sm text-gray-400">See how your button will look and behave</p>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="max-w-2xl w-full">
                {/* Preview Area */}
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-12 flex flex-col items-center justify-center min-h-96 relative">
                  <AnimatePresence mode="wait">
                    {buttonConfig.type === 'dropdown' || buttonConfig.buttonType === 'dropdown' ? (
                      <div className="relative inline-block">
                        <motion.button
                          style={{
                            backgroundColor: buttonConfig.backgroundColor,
                            color: buttonConfig.fontColor
                          }}
                          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
                          variants={animations.find((a) => a.id === selectedAnimation)?.variants}
                          initial="initial"
                          whileHover="hover"
                          animate={isPlaying ? 'hover' : 'initial'}
                        >
                          {buttonConfig.text}
                          <ChevronDown className="w-4 h-4" />
                        </motion.button>

                        {buttonConfig.dropdownItems.length > 0 && (
                          <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] group border border-zinc-900 rounded-lg shadow-lg min-w-48 z-10">
                            {buttonConfig.dropdownItems.map((item: any, index: number) => (
                              <div
                                key={index}
                                className="px-4 py-2 text-white first:rounded-t-lg last:rounded-b-lg transition-colors hover:text-blaze cursor-pointer"
                              >
                                {item.text || `Item ${index + 1}`}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <motion.button
                        key={selectedAnimation}
                        className="px-6 py-3 rounded-xl font-semibold text-lg relative overflow-hidden shadow-lg"
                        variants={animations.find((a) => a.id === selectedAnimation)?.variants}
                        initial="initial"
                        animate={isPlaying ? 'hover' : 'initial'}
                        whileHover="hover"
                        style={{
                          backgroundColor: buttonConfig.backgroundColor,
                          color: buttonConfig.fontColor
                        }}
                      >
                        <span className="relative z-10">{buttonConfig.text}</span>

                        {/* Glow effect background for glow animation */}
                        {selectedAnimation === 'glow' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl"
                            animate={
                              isPlaying
                                ? {
                                    opacity: [0.5, 0.8, 0.5],
                                    scale: [1, 1.05, 1]
                                  }
                                : {}
                            }
                            transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
                          />
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      {isPlaying ? '🎬 Playing preview animation...' : 'Hover over the button to see the animation'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {buttonConfig.linkType === 'phone' && 'Will dial: '}
                      {buttonConfig.linkType === 'external' && 'External link: '}
                      {buttonConfig.linkType === 'internal' && 'Internal page: '}
                      <span className="text-blue-400">{getPreviewHref()}</span>
                    </p>
                  </div>
                </div>

                {/* Additional Preview Info */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-white font-medium mb-2">Animation</h4>
                    <p className="text-sm text-gray-400">
                      {animations.find((a) => a.id === selectedAnimation)?.name} -{' '}
                      {animations.find((a) => a.id === selectedAnimation)?.description}
                    </p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-white font-medium mb-2">Link Type</h4>
                    <p className="text-sm text-gray-400 capitalize">
                      {buttonConfig.linkType}{' '}
                      {buttonConfig.linkType === 'phone'
                        ? 'Number'
                        : buttonConfig.linkType === 'external'
                        ? 'Website'
                        : 'Page'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HeaderButtonStudio
