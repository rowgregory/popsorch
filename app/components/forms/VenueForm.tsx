'use client'

import { useState } from 'react'
import { Music2, Plus, Upload, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { updateVenue } from '@/app/lib/actions/venue/updateVenue'
import { createVenue } from '@/app/lib/actions/venue/createVenue'
import { Venue } from '@prisma/client'
import { FieldLabel } from '../common/FieldLabel'
import { LogoutButton } from '../common/LogoutButton'
import Picture from '../common/Picture'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FormState {
  name: string
  capacity: string
  accessibility: string
  immersiveEnvironment: string
  parking: string
  address: string
  city: string
}

type VenueFormProps = {
  isEditing?: boolean
  venue?: Venue
}

const inputCls =
  'w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors'

export default function VenueForm({ isEditing = false, venue }: VenueFormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(isEditing && venue?.imageUrl ? venue.imageUrl : null)

  const [form, setForm] = useState<FormState>({
    name: venue?.name ?? '',
    capacity: venue?.capacity ?? '',
    accessibility: venue?.accessibility ?? '',
    immersiveEnvironment: venue?.immersiveEnvironment ?? '',
    parking: venue?.parking ?? '',
    address: venue?.address ?? '',
    city: venue?.city ?? ''
  })

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }))

  const handleImage = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      store.dispatch(showToast({ type: 'error', message: 'Venue name is required' }))
      return
    }
    if (!imagePreview && !isEditing) {
      store.dispatch(showToast({ type: 'error', message: 'Venue image is required' }))
      return
    }

    setLoading(true)

    // Upload image only if a new file was selected
    let imageUrl = venue?.imageUrl ?? ''
    let imageFilename = venue?.imageFilename ?? ''

    if (imageFile) {
      imageUrl = await uploadFileToFirebase(imageFile, setUploadProgress)
      imageFilename = imageFile.name
    }

    const payload = {
      name: form.name,
      capacity: form.capacity,
      accessibility: form.accessibility,
      immersiveEnvironment: form.immersiveEnvironment,
      parking: form.parking,
      imageUrl,
      imageFilename,
      city: form.city,
      address: form.address
    }

    const res = isEditing && venue ? await updateVenue(venue.id, payload) : await createVenue(payload)

    setLoading(false)

    if (res.success) {
      store.dispatch(
        showToast({
          type: 'success',
          message: isEditing ? 'Venue updated!' : 'Venue created!'
        })
      )
      router.push('/v2/dashboard')
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Something went wrong' }))
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
          <Music2 className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Venues</span>
          <span className="text-[9px] font-mono text-border-dark">·</span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">
            {isEditing ? `Edit — ${venue?.name}` : 'New Venue'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !form.name.trim()}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="w-3 h-3" aria-hidden="true" />
            )}
            {loading ? 'Saving...' : isEditing ? 'Update Venue' : 'Save Venue'}
          </button>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Two Column Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left — Core Fields ── */}
        <div className="flex-1 min-w-0 border-r border-border-dark overflow-y-auto">
          {/* Identity */}
          <div className="border-b border-border-dark px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">Identity</span>
            </div>

            <div>
              <FieldLabel htmlFor="venue-name" required>
                Venue Name
              </FieldLabel>
              <input
                id="venue-name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Neel Performing Arts Center"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div>
                <FieldLabel>City</FieldLabel>
                <select
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="BRADENTON">Bradenton</option>
                  <option value="SARASOTA">Sarasota</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                <input
                  id="capacity"
                  type="text"
                  value={form.capacity}
                  onChange={(e) => set('capacity', e.target.value)}
                  placeholder="1000"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="accessibility">Accessibility</FieldLabel>
              <input
                id="accessibility"
                type="text"
                value={form.accessibility}
                onChange={(e) => set('accessibility', e.target.value)}
                placeholder="Wheelchair accessible seating."
                className={inputCls}
              />
            </div>

            <div>
              <FieldLabel htmlFor="immersiveEnvironment">Parking</FieldLabel>
              <div className="relative">
                <input
                  id="parking"
                  type="url"
                  value={form.parking}
                  onChange={(e) => set('parking', e.target.value)}
                  placeholder="Free parking on..."
                  className={`${inputCls}`}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-border-dark px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">Details</span>
            </div>

            <div>
              <FieldLabel htmlFor="immersiveEnvironment" required>
                Immersive Environment
              </FieldLabel>
              <textarea
                id="immersiveEnvironment"
                value={form.immersiveEnvironment}
                onChange={(e) => set('immersiveEnvironment', e.target.value)}
                placeholder="Eaton Memorial Pipe Organ, a 50-rank..."
                rows={5}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <input
                id="address"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="5840 26th St W, Bradenton, FL 34207"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* ── Right — Image + Shows ── */}
        <div className="w-96 xl:w-105 shrink-0 overflow-y-auto flex flex-col">
          {/* Image */}
          <div className="border-b border-border-dark">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-dark/50">
              <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">Image</span>
            </div>
            <div className="p-4">
              <button
                type="button"
                onClick={() => document.getElementById('image-input')?.click()}
                className="w-full border border-border-dark hover:border-primary-dark transition-colors relative overflow-hidden group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                aria-label="Upload venue image"
              >
                {imagePreview ? (
                  <div className="relative">
                    <Picture priority src={imagePreview} alt="Venue preview" className="w-full h-52 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-white" aria-hidden="true" />
                      <span className="text-white text-[10px] font-mono">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-52 flex flex-col items-center justify-center gap-2 bg-surface-dark">
                    <Upload
                      className="w-5 h-5 text-muted-dark group-hover:text-primary-dark transition-colors"
                      aria-hidden="true"
                    />
                    <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark group-hover:text-text-dark transition-colors">
                      Upload Image
                    </span>
                  </div>
                )}
              </button>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Venue image file input"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleImage(f)
                }}
              />
              {loading && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="h-px bg-border-dark w-full">
                    <div
                      className="h-px bg-primary-dark transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[9px] font-mono text-muted-dark mt-1">
                    Uploading... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
