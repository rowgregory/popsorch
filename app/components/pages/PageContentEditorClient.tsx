'use client'

import { createPage } from '@/app/actions/createPage'
import { updatePage } from '@/app/actions/updatePage'
import { showToast } from '@/app/redux/features/toastSlice'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { setOpenPageSelectorModal } from '@/app/redux/features/dashboardSlice'
import { ChevronDown } from 'lucide-react'
import { PageContentEditor } from '../page-content-editor/PageContentEditor'

export default function PageContentEditorClient({ data }) {
  const dispatch = useAppDispatch()
  const { pageSelectorModal } = useDashboardSelector()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (content: any) => {
    setIsSaving(true)

    try {
      if (data?.id) {
        // Update existing page
        await updatePage(data?.slug, { content })
      } else {
        // Create new page
        await createPage({
          slug: data?.slug,
          content
        })
      }

      router.refresh()
      dispatch(
        showToast({
          message: `${data?.slug} page ${data?.id ? 'updated' : 'created'} successfully!`,
          type: 'success'
        })
      )
    } catch (error) {
      dispatch(
        showToast({
          message: error instanceof Error ? error.message : `Failed to ${data?.id ? 'update' : 'create'} page`,
          type: 'error'
        })
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="fixed top-15 w-full z-10 bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-700/30">
        <div className="px-2 xs:px-3 sm:px-6">
          <nav className="flex items-center py-2 xs:py-3 sm:py-4 overflow-x-auto scrollbar-none">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setOpenPageSelectorModal())}
              className="flex items-center gap-2 px-3 h-full text-white font-medium text-sm rounded-lg hover:bg-neutral-950 transition-colors"
            >
              <span className="capitalize">{data?.slug || ''}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${pageSelectorModal ? 'rotate-180' : ''}`} />
            </motion.button>
          </nav>
        </div>
      </div>

      <PageContentEditor fields={data?.content} onSave={handleSave} isLoading={isSaving} />
    </>
  )
}
