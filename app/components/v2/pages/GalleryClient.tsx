'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Image as Img, Upload, Loader2, Home } from 'lucide-react'
import Link from 'next/link'
import type { PhotoGalleryImage } from '@prisma/client'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { createGalleryPhoto } from '@/app/lib/actions/photo-gallery-image/createGalleryPhoto'
import { deleteGalleryPhoto } from '@/app/lib/actions/super/deleteGalleryPhoto'
import { toggleGalleryPhotoHero } from '@/app/lib/actions/photo-gallery-image/toggleGalleryPhotoHero'
import Picture from '../../common/Picture'
import { LogoutButton } from '../common/LogoutButton'
import { useRouter } from 'next/navigation'

interface Props {
  photos: PhotoGalleryImage[]
}

type TPhotoCard = {
  photo: PhotoGalleryImage
  onDelete: (id: string) => Promise<void>
  onToggleHero: (id: string, current: boolean) => Promise<void>
}

// ─── Photo Card ───────────────────────────────────────────────────────────────

function PhotoCard({ photo, onToggleHero }: TPhotoCard) {
  const [toggling, setToggling] = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    await onToggleHero(photo.id, photo.isHomeHero)
    setToggling(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative border border-border-dark overflow-hidden group bg-surface-dark"
    >
      {/* Image */}
      <Picture priority src={photo.imageUrl} alt={photo.imageFilename} className="w-full h-40 object-cover" />

      {/* Hero badge */}
      {photo.isHomeHero && (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-primary-dark text-white text-[8px] font-mono uppercase">
          <Home className="w-2.5 h-2.5" aria-hidden="true" />
          Hero
        </div>
      )}

      {/* Footer */}
      <div className="px-3 py-2.5 border-t border-border-dark flex items-center justify-between gap-2">
        {/* Hero toggle */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={toggling}
          className={`flex items-center gap-1.5 text-[9px] font-mono trackign-widest uppercase transition-colors disabled:opacity-50 focus-visible:outline-none ${
            photo.isHomeHero ? 'text-primary-dark hover:text-muted-dark' : 'text-muted-dark hover:text-text-dark'
          }`}
          aria-label={photo.isHomeHero ? 'Remove from hero' : 'Set as hero'}
          title={photo.isHomeHero ? 'Remove from hero' : 'Add to hero'}
        >
          {toggling ? (
            <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
          ) : (
            <Home className="w-3 h-3" aria-hidden="true" />
          )}
          {photo.isHomeHero ? 'Hero' : 'Set Hero'}
        </button>

        {/* Filename */}
        <p className="text-muted-dark/40 text-[9px] font-mono truncate flex-1 text-right hidden sm:block">
          {photo.imageFilename}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({ onUpload }: { onUpload: (file: File) => Promise<void> }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setProgress(0)
    await onUpload(file)
    setUploading(false)
    setProgress(0)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-dashed border-border-dark hover:border-primary-dark transition-colors relative group"
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full h-40 flex flex-col items-center justify-center gap-2 focus-visible:outline-none disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 className="w-5 h-5 text-primary-dark animate-spin" aria-hidden="true" />
            <p className="text-[9px] font-mono text-muted-dark">{Math.round(progress)}%</p>
            <div className="w-20 h-px bg-border-dark">
              <div className="h-px bg-primary-dark transition-all" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : (
          <>
            <Upload
              className="w-5 h-5 text-muted-dark group-hover:text-primary-dark transition-colors"
              aria-hidden="true"
            />
            <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark group-hover:text-text-dark transition-colors">
              Upload Photo
            </p>
            <p className="text-[8px] text-muted-dark/40">or drag & drop</p>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Upload gallery photo"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function GalleryClient({ photos: initialPhotos }: Props) {
  const [photos, setPhotos] = useState<PhotoGalleryImage[]>(initialPhotos)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const heroCount = photos.filter((p) => p.isHomeHero).length

  const handleUpload = async (file: File) => {
    setUploading(true)
    const imageUrl = await uploadFileToFirebase(file).catch(() => null)
    if (!imageUrl) {
      store.dispatch(showToast({ type: 'error', message: 'Upload failed' }))
      setUploading(false)
      return
    }

    const res = await createGalleryPhoto({ imageUrl, imageFilename: file.name })
    setUploading(false)

    if (res.success && res.data) {
      setPhotos((prev) => [res.data!, ...prev])
      store.dispatch(showToast({ type: 'success', message: 'Photo uploaded' }))
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to save photo' }))
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deleteGalleryPhoto(id)
    if (res.success) {
      setPhotos((prev) => prev.filter((p) => p.id !== id))
      store.dispatch(showToast({ type: 'success', message: 'Photo deleted' }))
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to delete photo' }))
    }
  }

  const handleToggleHero = async (id: string, current: boolean) => {
    const res = await toggleGalleryPhotoHero(id, current)
    if (res.success && res.data) {
      router.refresh()
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, isHomeHero: !current } : p)))
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to update photo' }))
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <div className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <Img className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Gallery</span>
          <span className="text-[9px] font-mono text-muted-dark/40">({photos.length})</span>
        </div>

        <div className="flex items-center gap-3">
          {heroCount > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-dark/10 border border-primary-dark/30">
              <Home className="w-3 h-3 text-primary-dark" aria-hidden="true" />
              <span className="text-[9px] font-mono uppercase text-primary-dark">{heroCount} hero</span>
            </div>
          )}
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {/* Upload card */}
          <UploadZone onUpload={handleUpload} />

          {/* Photo cards */}
          <AnimatePresence>
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onDelete={handleDelete} onToggleHero={handleToggleHero} />
            ))}
          </AnimatePresence>
        </motion.div>

        {photos.length === 0 && !uploading && (
          <div className="flex flex-col items-center justify-center h-48 gap-2 mt-8">
            <Img className="w-8 h-8 text-border-dark" aria-hidden="true" />
            <p className="text-muted-dark text-sm">No photos yet.</p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 border-t border-border-dark px-4 py-2.5 bg-surface-dark flex items-center justify-between">
        <p className="text-[9px] font-mono text-muted-dark">
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </p>
        <p className="text-[9px] font-mono text-muted-dark">{heroCount} set as home hero</p>
      </div>
    </div>
  )
}
