'use client'

import { createPage } from '@/app/actions/createPage'
import { updatePage } from '@/app/actions/updatePage'
import { PageContentEditor } from '@/app/components/page-content-editor/PageContentEditor'
import { showToast } from '@/app/redux/features/toastSlice'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { setOpenPageSelectorModal } from '@/app/redux/features/dashboardSlice'
import { ChevronDown } from 'lucide-react'
import { cauldronFolders } from '@/app/lib/constants/admin'

export default function TheCauldronClient({ data }) {
  const dispatch = useAppDispatch()
  const { pageSelectorModal } = useDashboardSelector()
  const params = useSearchParams()
  const selectedFolder = params.get('page')
  const selectedFolderObj = cauldronFolders.find((folder) => folder.value === selectedFolder)
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (content: any) => {
    setIsSaving(true)

    try {
      if (data?.id) {
        // Update existing page
        await updatePage(selectedFolder, { content })
      } else {
        // Create new page
        await createPage({
          slug: selectedFolder,
          content
        })
      }

      router.refresh()
      dispatch(
        showToast({
          message: `${selectedFolder} page ${data?.id ? 'updated' : 'created'} successfully!`,
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
      <div className="fixed top-[60px] w-full z-10 bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-700/30">
        <div className="px-2 xs:px-3 sm:px-6">
          <nav className="flex items-center py-2 xs:py-3 sm:py-4 overflow-x-auto scrollbar-none">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setOpenPageSelectorModal())}
              className="flex items-center gap-2 px-3 h-full text-white font-medium text-sm rounded-lg hover:bg-neutral-950 transition-colors"
            >
              <span className="capitalize">{selectedFolderObj?.textKey || ''}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${pageSelectorModal ? 'rotate-180' : ''}`} />
            </motion.button>
          </nav>
        </div>
      </div>

      <PageContentEditor initialContent={data?.content} onSave={handleSave} isLoading={isSaving} />
    </>
  )
}
