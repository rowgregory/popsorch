import { useState } from 'react'
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
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setCloseHeaderButtonStudio } from '@/app/redux/features/appSlice'
import { createHeaderButton } from '@/app/actions/createHeaderButton'
import { assignHeaderButton } from '@/app/actions/assignHeaderButton'
import { deleteHeaderButton } from '@/app/actions/deleteHeaderButton'
import { updateHeaderButton } from '@/app/actions/updateHeaderButton'
import { showToast } from '@/app/redux/features/toastSlice'
import { useRouter } from 'next/navigation'

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

const HeaderButtonStudioDrawer = ({ data }) => {
  const [selectedAnimation, setSelectedAnimation] = useState('scale')
  const { toggleHeaderButtonStudio } = useAppSelector((state: RootState) => state.app)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState('type')
  const initialButtonState = {
    text: 'Get Started',
    fontColor: '#ffffff',
    backgroundColor: '#3b82f6',
    linkType: 'internal',
    link: '/get-started',
    id: '',
    buttonType: 'button', // 'button' or 'dropdown' or 'double
    dropdownItems: []
  }
  const [buttonConfig, setButtonConfig] = useState(initialButtonState) as any
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseHeaderButtonStudio())
  const [loading, setLoading] = useState({}) as any
  const [loadingUpdate, setLoadingUpdate] = useState({}) as any
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const router = useRouter()
  const headerButtons = data

  const playPreview = (animationId: any) => {
    setSelectedAnimation(animationId)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const getLinkIcon = () => {
    const iconProps = { className: 'w-4 h-4 text-neutral-400' }
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
              <p className="text-sm text-neutral-400 mb-4">Set the text that appears on your button</p>
            </div>

            {/* Primary Button Text */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                {buttonConfig.buttonType === 'double' ? 'Primary Button Text' : 'Button Text'}
              </label>
              <input
                type="text"
                value={buttonConfig.text}
                onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, text: e.target.value }))}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600  text-white placeholder-neutral-400 focus:border-sky-500 focus:outline-none text-lg"
                placeholder="Enter button text"
              />
            </div>

            {/* Secondary Button Text (for double button type) */}
            {buttonConfig.buttonType === 'double' && (
              <div className="space-y-2 pt-6 border-t border-neutral-600">
                <label className="text-sm font-medium text-neutral-300">Secondary Button Text</label>
                <input
                  type="text"
                  value={buttonConfig.secondaryButton?.text || ''}
                  onChange={(e) =>
                    setButtonConfig((prev: any) => ({
                      ...prev,
                      secondaryButton: {
                        ...prev.secondaryButton,
                        text: e.target.value
                      }
                    }))
                  }
                  className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600  text-white placeholder-neutral-400 focus:border-sky-500 focus:outline-none text-lg"
                  placeholder="Enter secondary button text"
                />
              </div>
            )}
          </div>
        )

      case 'colors':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Colors</h3>
              <p className="text-sm text-neutral-400 mb-4">Customize the appearance of your button</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-300">Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={buttonConfig.fontColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, fontColor: e.target.value }))}
                    className="w-12 h-12  border border-neutral-600 bg-neutral-800 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={buttonConfig.fontColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, fontColor: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600  text-white text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-300">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={buttonConfig.backgroundColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-12 h-12  border border-neutral-600 bg-neutral-800 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={buttonConfig.backgroundColor}
                    onChange={(e) => setButtonConfig((prev: any) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600  text-white text-sm"
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
              <p className="text-sm text-neutral-400 mb-4">Configure where your button should navigate</p>
            </div>

            {buttonConfig.buttonType === 'dropdown' ? (
              // Dropdown menu items configuration
              <div>Dropdown configuration</div>
            ) : (
              <>
                {/* Primary Button Link Settings */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-neutral-300">
                    {buttonConfig.buttonType === 'double' ? 'Primary Button - Link Type' : 'Link Type'}
                  </label>
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
                        className={`p-4  border-2 transition-all text-left ${
                          buttonConfig.linkType === type.value
                            ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                            : 'border-neutral-600 bg-neutral-700 text-neutral-300 hover:border-neutral-500'
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
                    <label className="text-sm font-medium text-neutral-300">
                      {buttonConfig.buttonType === 'double' ? 'Primary Button - ' : ''}
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
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600  text-white placeholder-neutral-400 focus:border-sky-500 focus:outline-none"
                    placeholder={getLinkPlaceholder()}
                  />
                  <div className="text-xs text-neutral-400">
                    {buttonConfig.linkType === 'internal' && 'Use paths like /about, /contact, /services'}
                    {buttonConfig.linkType === 'external' && 'Include https:// for external links'}
                    {buttonConfig.linkType === 'phone' && 'Format: +1-555-123-4567 or (555) 123-4567'}
                  </div>
                </div>

                {/* Secondary Button Link Settings (for double button type) */}
                {buttonConfig.buttonType === 'double' && (
                  <div className="space-y-4 pt-6 border-t border-neutral-600">
                    <label className="text-sm font-medium text-neutral-300">Secondary Button - Link Type</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'internal', label: 'Internal Page', icon: Home, desc: 'Navigate within your app' },
                        { value: 'external', label: 'External Website', icon: Globe, desc: 'Open external website' },
                        { value: 'phone', label: 'Phone Number', icon: Phone, desc: 'Dial phone number' }
                      ].map((type) => (
                        <motion.button
                          key={`secondary-${type.value}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() =>
                            setButtonConfig((prev: any) => ({
                              ...prev,
                              secondaryButton: {
                                ...prev.secondaryButton,
                                linkType: type.value,
                                link: ''
                              }
                            }))
                          }
                          className={`p-4  border-2 transition-all text-left ${
                            buttonConfig.secondaryButton?.linkType === type.value
                              ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                              : 'border-neutral-600 bg-neutral-700 text-neutral-300 hover:border-neutral-500'
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {buttonConfig.secondaryButton?.linkType === 'phone' ? (
                          <Phone className="w-5 h-5 text-neutral-400" />
                        ) : buttonConfig.secondaryButton?.linkType === 'external' ? (
                          <Globe className="w-5 h-5 text-neutral-400" />
                        ) : (
                          <Home className="w-5 h-5 text-neutral-400" />
                        )}
                        <label className="text-sm font-medium text-neutral-300">
                          {buttonConfig.secondaryButton?.linkType === 'phone'
                            ? 'Phone Number'
                            : buttonConfig.secondaryButton?.linkType === 'external'
                              ? 'External URL'
                              : 'Internal Path'}
                        </label>
                      </div>
                      <input
                        type="text"
                        value={buttonConfig.secondaryButton?.link || ''}
                        onChange={(e) =>
                          setButtonConfig((prev: any) => ({
                            ...prev,
                            secondaryButton: {
                              ...prev.secondaryButton,
                              link: e.target.value
                            }
                          }))
                        }
                        className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600  text-white placeholder-neutral-400 focus:border-sky-500 focus:outline-none"
                        placeholder={
                          buttonConfig.secondaryButton?.linkType === 'phone'
                            ? '+1-555-123-4567'
                            : buttonConfig.secondaryButton?.linkType === 'external'
                              ? 'https://example.com'
                              : '/about'
                        }
                      />
                      <div className="text-xs text-neutral-400">
                        {buttonConfig.secondaryButton?.linkType === 'internal' &&
                          'Use paths like /about, /contact, /services'}
                        {buttonConfig.secondaryButton?.linkType === 'external' && 'Include https:// for external links'}
                        {buttonConfig.secondaryButton?.linkType === 'phone' &&
                          'Format: +1-555-123-4567 or (555) 123-4567'}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )

      case 'animations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Animations</h3>
              <p className="text-sm text-neutral-400 mb-4">Choose how your button responds to user interaction</p>
            </div>

            <div className="space-y-3">
              {animations.map((animation) => (
                <motion.div
                  key={animation.id}
                  className={`p-4  border-2 cursor-pointer transition-all duration-300 ${
                    selectedAnimation === animation.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-neutral-600 bg-neutral-700 hover:border-neutral-500'
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
                        <p className="text-sm text-neutral-400">{animation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          playPreview(animation.id)
                        }}
                        className="px-3 py-1 text-xs bg-purple-500 text-white -full hover:bg-purple-600 transition-colors flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-3 h-3" />
                        Preview
                      </motion.button>
                      {selectedAnimation === animation.id && (
                        <motion.div
                          className="w-2 h-2 bg-purple-500 -full"
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
        <label className="block text-sm font-medium text-neutral-300 mb-4">Choose Button Type</label>
        <div className="space-y-3">
          <motion.label
            className="flex items-center p-4 border border-neutral-600  cursor-pointer hover:border-sky-500 transition-colors"
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
              className="mr-3 text-sky-600"
            />
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-3 text-sky-400" />
              <div>
                <span className="text-white font-medium">Regular Button</span>
                <p className="text-sm text-neutral-400">Simple button that links to a page</p>
              </div>
            </div>
          </motion.label>

          <motion.label
            className="flex items-center p-4 border border-neutral-600  cursor-pointer hover:border-sky-500 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              name="buttonType"
              value="double"
              checked={buttonConfig.buttonType === 'double'}
              onChange={(e) =>
                setButtonConfig({
                  ...buttonConfig,
                  buttonType: e.target.value,
                  dropdownItems: [],
                  secondaryButton: {
                    text: 'Button 2',
                    link: '',
                    backgroundColor: '#3b82f6',
                    fontColor: '#ffffff'
                  }
                })
              }
              className="mr-3 text-sky-600"
            />
            <div className="flex items-center">
              <div className="w-5 h-5 mr-3 text-green-400 flex items-center gap-1">
                <span className="text-xs">⚫</span>
                <span className="text-xs">⚫</span>
              </div>
              <div>
                <span className="text-white font-medium">Double Button</span>
                <p className="text-sm text-neutral-400">Two buttons side by side in the header</p>
              </div>
            </div>
          </motion.label>

          <motion.label
            className="flex items-center p-4 border border-neutral-600  cursor-pointer hover:border-sky-500 transition-colors"
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
              className="mr-3 text-sky-600"
            />
            <div className="flex items-center">
              <ChevronDown className="w-5 h-5 mr-3 text-purple-400" />
              <div>
                <span className="text-white font-medium">Dropdown Menu</span>
                <p className="text-sm text-neutral-400">Button with multiple menu options</p>
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
              className="px-3 py-2 bg-sky-600 text-white  hover:bg-sky-700 transition-colors flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Item
            </motion.button>
          </div>

          {buttonConfig.dropdownItems.length === 0 ? (
            <div className="text-center py-6 border border-neutral-600 border-dashed ">
              <ChevronDown className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-neutral-400 text-sm">No dropdown items yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {buttonConfig.dropdownItems.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-800 border border-neutral-700  p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-neutral-500" />
                      <span className="text-xs font-medium text-neutral-300">Item {index + 1}</span>
                    </div>
                    <button
                      onClick={() => removeDropdownItem(index)}
                      className="p-1 hover:bg-neutral-700  text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateDropdownItem(index, 'text', e.target.value)}
                      className="w-full px-2 py-1 bg-neutral-900 border border-neutral-600  text-white placeholder-neutral-500 text-sm"
                      placeholder="Menu item text"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateDropdownItem(index, 'linkType', 'internal')}
                        className={`flex-1 px-2 py-1  text-xs font-medium transition-colors ${
                          item.linkType === 'internal'
                            ? 'bg-sky-600 text-white'
                            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                      >
                        Internal
                      </button>
                      <button
                        onClick={() => updateDropdownItem(index, 'linkType', 'external')}
                        className={`flex-1 px-2 py-1  text-xs font-medium transition-colors ${
                          item.linkType === 'external'
                            ? 'bg-sky-600 text-white'
                            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                      >
                        External
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => updateDropdownItem(index, 'link', e.target.value)}
                      className="w-full px-2 py-1 bg-neutral-900 border border-neutral-600  text-white placeholder-neutral-500 text-sm"
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
      animation: selectedAnimation,
      backgroundColor: buttonConfig.backgroundColor,
      fontColor: buttonConfig.fontColor,
      text: buttonConfig.text,
      linkType: buttonConfig.linkType,
      link: buttonConfig.link,
      type: buttonConfig.buttonType,
      dropdownItems: buttonConfig.buttonType === 'dropdown' ? buttonConfig.dropdownItems : [],
      ...(buttonConfig.buttonType === 'double' && {
        secondaryButton: {
          text: buttonConfig.secondaryButton?.text,
          link: buttonConfig.secondaryButton?.link,
          linkType: buttonConfig.secondaryButton?.linkType,
          backgroundColor: buttonConfig.backgroundColor,
          fontColor: buttonConfig.fontColor
        }
      })
    }

    try {
      await createHeaderButton(buttonData)
      router.refresh()
      setButtonConfig(initialButtonState)
      setSelectedAnimation('scale')
      setActiveTab('text')
      dispatch(
        showToast({
          message: 'Header button created successfully!',
          type: 'success'
        })
      )
    } catch (error) {
      dispatch(
        showToast({
          message: error instanceof Error ? error.message : 'Failed to create header button',
          type: 'error'
        })
      )
    }
  }

  const handleAssignHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()

    try {
      setAssigningId(buttonId)
      await assignHeaderButton(buttonId)
      router.refresh()
      dispatch(
        showToast({
          message: 'Button assigned successfully!',
          type: 'success'
        })
      )
    } catch (error) {
      dispatch(
        showToast({
          message: 'Failed to assign button',
          type: 'error'
        })
      )
    } finally {
      setAssigningId(null)
    }
  }

  const handleDeleteHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()
    setLoading({ [buttonId]: true })
    await deleteHeaderButton(buttonId)
    setLoading({ [buttonId]: false })
  }

  const handleUpdateHeaderButton = async (e: any, buttonId: string) => {
    e.stopPropagation()
    setLoadingUpdate({ [buttonId]: true })

    const buttonData = {
      animation: selectedAnimation,
      backgroundColor: buttonConfig.backgroundColor,
      fontColor: buttonConfig.fontColor,
      text: buttonConfig.text,
      linkType: buttonConfig.linkType,
      link: buttonConfig.link,
      type: buttonConfig.buttonType,
      dropdownItems: buttonConfig.buttonType === 'dropdown' ? buttonConfig.dropdownItems : [],
      ...(buttonConfig.buttonType === 'double' && {
        secondaryButton: {
          text: buttonConfig.secondaryButton?.text,
          link: buttonConfig.secondaryButton?.link,
          linkType: buttonConfig.secondaryButton?.linkType,
          backgroundColor: buttonConfig.secondaryButton?.backgroundColor,
          fontColor: buttonConfig.secondaryButton?.fontColor
        }
      })
    }

    try {
      await updateHeaderButton(buttonId, buttonData)

      router.refresh()
      setActiveTab('text')
      setButtonConfig(initialButtonState)

      dispatch(
        showToast({
          message: 'Header button updated successfully!',
          type: 'success'
        })
      )
    } catch (error) {
      dispatch(
        showToast({
          message: error instanceof Error ? error.message : 'Failed to update header button',
          type: 'error'
        })
      )
    } finally {
      setLoadingUpdate({ [buttonId]: false })
    }
  }

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
          <div className="w-80 border-r border-neutral-700 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <h2 className="text-xl font-semibold text-white">Header Button Studio</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-700  transition-colors">
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="p-4 border-b border-neutral-700">
              <div className="grid grid-cols-2 gap-2">
                {navigationTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3  transition-all flex flex-col items-center gap-1 ${
                      activeTab === tab.id
                        ? 'bg-sky-500 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-900'
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
            <div className="p-6 border-t border-neutral-700">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-neutral-700 text-neutral-300  hover:bg-neutral-600 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  disabled={
                    loadingUpdate[buttonConfig.id] ||
                    buttonConfig.text === 'Get Started' ||
                    buttonConfig.link === '/get-started'
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) =>
                    buttonConfig.id !== '' ? handleUpdateHeaderButton(e, buttonConfig.id) : handleCreateHeaderButton()
                  }
                  className={`flex-1 px-4 py-3  transition-colors font-medium disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 text-white disabled:bg-neutral-500'
                  }`}
                >
                  {loadingUpdate[buttonConfig.id] ? 'Saving' : 'Save Button'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Saved Buttons Panel - Only show if there are saved buttons */}
          {headerButtons?.length > 0 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-64 border-r border-neutral-700 flex flex-col"
            >
              {/* Header */}

              <div className="px-6 py-4.5 border-b border-neutral-700">
                <h3 className="text-lg font-semibold text-white">Saved Buttons</h3>
                <p className="text-sm text-neutral-400">{headerButtons.length}</p>
              </div>

              {/* List */}
              <div className="overflow-y-auto p-2 flex flex-col gap-1.5">
                {headerButtons?.map((button: any) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 border transition-all cursor-pointer rounded-sm ${
                      buttonConfig.id === button.id
                        ? 'border-sky-500 bg-sky-500/10'
                        : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-500 hover:bg-neutral-700/50'
                    }`}
                    onClick={() => {
                      if (buttonConfig.id !== '') {
                        setButtonConfig(initialButtonState)
                        setActiveTab('text')
                      } else {
                        setButtonConfig({
                          ...button,
                          buttonType: button.type,
                          secondaryButton: button.secondaryButton || null
                        })
                      }
                    }}
                  >
                    {/* Full Button Preview */}
                    <div className="mb-4 flex justify-center gap-3">
                      {button.type === 'dropdown' ? (
                        // Dropdown Preview
                        <div className="relative inline-block">
                          <motion.button
                            className="flex items-center gap-2 px-6 py-3  font-medium"
                            variants={animations.find((a) => a.id === button.animation)?.variants}
                            initial="initial"
                            whileHover="hover"
                            style={{
                              backgroundColor: button.backgroundColor,
                              color: button.fontColor
                            }}
                          >
                            {button.text}
                            <ChevronDown className="w-4 h-4" />
                          </motion.button>
                          {/* {button.dropdownItems?.length > 0 && (
                            <div className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-zinc-900  shadow-lg min-w-48 z-10">
                              {button.dropdownItems.slice(0, 2).map((item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="px-4 py-2 text-white text-sm border-b border-zinc-900 last:border-b-0"
                                >
                                  {item.text}
                                </div>
                              ))}
                              {button.dropdownItems.length > 2 && (
                                <div className="px-4 py-2 text-neutral-500 text-xs">
                                  +{button.dropdownItems.length - 2} more
                                </div>
                              )}
                            </div>
                          )} */}
                        </div>
                      ) : button.type === 'double' ? (
                        // Double Button Preview
                        <>
                          <motion.button
                            className="px-6 py-3  font-medium relative overflow-hidden shadow-md"
                            variants={animations.find((a) => a.id === button.animation)?.variants}
                            initial="initial"
                            whileHover="hover"
                            style={{
                              backgroundColor: button.backgroundColor,
                              color: button.fontColor
                            }}
                          >
                            <span className="relative z-10">{button.text}</span>
                            {button.animation === 'glow' && (
                              <motion.div
                                className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 "
                                whileHover={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            )}
                          </motion.button>
                          <motion.button
                            className="px-6 py-3  font-medium relative overflow-hidden shadow-md"
                            variants={animations.find((a) => a.id === button.animation)?.variants}
                            initial="initial"
                            whileHover="hover"
                            style={{
                              backgroundColor: button?.backgroundColor,
                              color: button?.fontColor
                            }}
                          >
                            <span className="relative z-10">{button.secondaryButton?.text}</span>
                            {button.animation === 'glow' && (
                              <motion.div
                                className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 "
                                whileHover={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            )}
                          </motion.button>
                        </>
                      ) : (
                        // Single Button Preview
                        <motion.button
                          className="px-6 py-3  font-medium relative overflow-hidden shadow-md"
                          variants={animations.find((a) => a.id === button.animation)?.variants}
                          initial="initial"
                          whileHover="hover"
                          style={{
                            backgroundColor: button.backgroundColor,
                            color: button.fontColor
                          }}
                        >
                          <span className="relative z-10">{button.text}</span>
                          {button.animation === 'glow' && (
                            <motion.div
                              className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 "
                              whileHover={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </motion.button>
                      )}
                    </div>

                    {/* Button Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm truncate">{button.text}</span>
                        {buttonConfig.id === button.id && (
                          <span className="text-xs bg-sky-500 text-white px-2 py-1 -full">Editing</span>
                        )}
                      </div>

                      <div className="text-xs text-neutral-400 space-y-1">
                        {/* Button Type */}
                        <div className="flex items-center gap-2">
                          <span>Type:</span>
                          <span className="text-sky-300 capitalize">
                            {button.type === 'double'
                              ? 'Two Buttons'
                              : button.type === 'dropdown'
                                ? 'Dropdown'
                                : 'Single'}
                          </span>
                        </div>

                        {/* Dropdown Items Count */}
                        {button.type === 'dropdown' && (
                          <div className="flex items-center gap-2">
                            <span>Items:</span>
                            <span className="text-sky-300">{button.dropdownItems?.length || 0}</span>
                          </div>
                        )}

                        {/* Animation */}
                        <div className="flex items-center gap-2">
                          <span>Animation:</span>
                          <span className="text-sky-300">
                            {animations.find((a) => a.id === button.animation)?.name}
                          </span>
                          <span className="text-lg">{animations.find((a) => a.id === button.animation)?.icon}</span>
                        </div>

                        {/* Links */}
                        {button.type !== 'dropdown' && (
                          <>
                            <div className="flex items-center gap-2">
                              <span>Primary:</span>
                              <span className="text-sky-300 capitalize">{button.linkType}</span>
                              {button.link && (
                                <span className="text-neutral-500 truncate max-w-24" title={button.link}>
                                  {button.linkType === 'phone' ? `tel:${button.link}` : button.link}
                                </span>
                              )}
                            </div>
                            {button.type === 'double' && button.secondaryButton?.link && (
                              <div className="flex items-center gap-2">
                                <span>Secondary:</span>
                                <span className="text-sky-300 capitalize">{button.secondaryButton?.linkType}</span>
                                <span
                                  className="text-neutral-500 truncate max-w-24"
                                  title={button.secondaryButton?.link}
                                >
                                  {button.secondaryButton?.linkType === 'phone'
                                    ? `tel:${button.secondaryButton?.link}`
                                    : button.secondaryButton?.link}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Colors */}
                        <div className="flex items-center gap-2">
                          <span>Colors:</span>
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3  border border-neutral-500"
                              style={{ backgroundColor: button.backgroundColor }}
                              title={`BG: ${button.backgroundColor}`}
                            />
                            <div
                              className="w-3 h-3  border border-neutral-500"
                              style={{ backgroundColor: button.fontColor }}
                              title={`Text: ${button.fontColor}`}
                            />
                            {button.type === 'double' && (
                              <>
                                <div
                                  className="w-3 h-3  border border-neutral-500"
                                  style={{ backgroundColor: button?.backgroundColor }}
                                  title={`Secondary BG: ${button?.backgroundColor}`}
                                />
                                <div
                                  className="w-3 h-3  border border-neutral-500"
                                  style={{ backgroundColor: button?.fontColor }}
                                  title={`Secondary Text: ${button?.fontColor}`}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          disabled={assigningId === button.id}
                          onClick={(e) => handleAssignHeaderButton(e, button.id)}
                          className={`flex-1 px-3 py-2 text-xs  font-medium transition-colors ${
                            button.isActive
                              ? 'bg-green-600 text-white cursor-default'
                              : assigningId === button.id
                                ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                                : 'bg-sky-600 text-white hover:bg-sky-700'
                          }`}
                        >
                          {button.isActive ? 'Active' : assigningId === button.id ? 'Assigning...' : 'Assign'}
                        </button>
                        <button
                          disabled={loading[button.id]}
                          onClick={(e) => handleDeleteHeaderButton(e, button.id)}
                          className="flex-1 px-3 py-2 text-xs bg-red-600/20 text-red-400  hover:bg-red-600/30 transition-colors font-medium disabled:opacity-50"
                        >
                          {loading[button.id] ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Main Canvas Area */}
          <div className="flex-1 bg-black flex flex-col">
            {/* Canvas Header */}
            <div className="px-6 py-4.5 border-b border-neutral-700">
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <p className="text-sm text-neutral-400">See how your button will look and behave</p>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="max-w-2xl w-full">
                {/* Preview Area */}
                <div className="bg-neutral-800/30 -2xl border border-neutral-700 p-12 flex flex-col items-center justify-center min-h-96 relative">
                  <AnimatePresence mode="wait">
                    {buttonConfig.buttonType === 'dropdown' ? (
                      <div className="relative inline-block">
                        <motion.button
                          style={{
                            backgroundColor: buttonConfig.backgroundColor,
                            color: buttonConfig.fontColor
                          }}
                          className="flex items-center gap-2 px-6 py-3  font-medium transition-colors"
                          variants={animations.find((a) => a.id === selectedAnimation)?.variants}
                          initial="initial"
                          whileHover="hover"
                          animate={isPlaying ? 'hover' : 'initial'}
                        >
                          {buttonConfig.text}
                          <ChevronDown className="w-4 h-4" />
                        </motion.button>

                        {buttonConfig.dropdownItems.length > 0 && (
                          <div className="absolute top-full right-0 mt-2 bg-inkblack group border border-zinc-900  shadow-lg min-w-48 z-10">
                            {buttonConfig.dropdownItems.map((item: any, index: number) => (
                              <div
                                key={index}
                                className="px-4 py-2 text-white first:-t-lg last:-b-lg transition-colors hover:text-blaze cursor-pointer"
                              >
                                {item.text || `Item ${index + 1}`}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : buttonConfig.buttonType === 'double' ? (
                      <div className="flex gap-2 items-center justify-center">
                        {/* Primary Button */}
                        <motion.button
                          key={`primary-${selectedAnimation}`}
                          className="font-changa font-bold px-5 py-2 sm:px-6 sm:py-3 uppercase relative overflow-hidden shadow-lg"
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
                              className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 -xl"
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

                        {/* Secondary Button */}
                        <motion.button
                          key={`secondary-${selectedAnimation}`}
                          className="font-changa font-bold px-5 py-2 sm:px-6 sm:py-3 uppercase relative overflow-hidden shadow-lg"
                          variants={animations.find((a) => a.id === selectedAnimation)?.variants}
                          initial="initial"
                          animate={isPlaying ? 'hover' : 'initial'}
                          whileHover="hover"
                          style={{
                            backgroundColor: buttonConfig.backgroundColor,
                            color: buttonConfig.fontColor
                          }}
                        >
                          <span className="relative z-10">{buttonConfig.secondaryButton?.text}</span>

                          {/* Glow effect background for glow animation */}
                          {selectedAnimation === 'glow' && (
                            <motion.div
                              className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 -xl"
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
                      </div>
                    ) : (
                      <motion.button
                        key={selectedAnimation}
                        className="px-6 py-3 -xl font-semibold text-lg relative overflow-hidden shadow-lg"
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
                            className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-400/20 -xl"
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
                    <p className="text-sm text-neutral-400 mb-2">
                      {isPlaying ? '🎬 Playing preview animation...' : 'Hover over the button to see the animation'}
                    </p>
                    {buttonConfig.buttonType === 'double' ? (
                      <div className="text-xs text-neutral-500 space-y-1">
                        <p>
                          Primary: {buttonConfig.linkType === 'phone' && 'Will dial: '}
                          {buttonConfig.linkType === 'external' && 'External link: '}
                          {buttonConfig.linkType === 'internal' && 'Internal page: '}
                          <span className="text-sky-400">{getPreviewHref()}</span>
                        </p>
                        <p>
                          Secondary: {buttonConfig.secondaryButton?.linkType === 'phone' && 'Will dial: '}
                          {buttonConfig.secondaryButton?.linkType === 'external' && 'External link: '}
                          {buttonConfig.secondaryButton?.linkType === 'internal' && 'Internal page: '}
                          <span className="text-sky-400">{buttonConfig.secondaryButton?.link}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500">
                        {buttonConfig.linkType === 'phone' && 'Will dial: '}
                        {buttonConfig.linkType === 'external' && 'External link: '}
                        {buttonConfig.linkType === 'internal' && 'Internal page: '}
                        <span className="text-sky-400">{getPreviewHref()}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Preview Info */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-neutral-800/30  p-4 border border-neutral-700">
                    <h4 className="text-white font-medium mb-2">Animation</h4>
                    <p className="text-sm text-neutral-400">
                      {animations.find((a) => a.id === selectedAnimation)?.name} -{' '}
                      {animations.find((a) => a.id === selectedAnimation)?.description}
                    </p>
                  </div>
                  <div className="bg-neutral-800/30  p-4 border border-neutral-700">
                    <h4 className="text-white font-medium mb-2">Button Type</h4>
                    <p className="text-sm text-neutral-400 capitalize">
                      {buttonConfig.buttonType === 'double'
                        ? 'Two Buttons'
                        : buttonConfig.buttonType === 'dropdown'
                          ? 'Dropdown Menu'
                          : 'Single Button'}
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

export default HeaderButtonStudioDrawer
