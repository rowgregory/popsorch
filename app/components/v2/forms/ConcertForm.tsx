'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Music2, Plus, Upload, ArrowLeft, Calendar, ExternalLink, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Venue, ConcertStatus, ConcertType } from '@prisma/client'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { updateConcert } from '@/app/lib/actions/concert/updateConcert'
import { createConcert } from '@/app/lib/actions/concert/createConcert'
import { ConcertFormProps, ShowForm } from '@/app/types/entities/concert'
import { ShowRow } from '../concerts/ShowRow'
import { FieldLabel } from '../common/FieldLabel'
import { toTimeInput } from '@/app/utils/time.utils'
import { toDateInput } from '@/app/lib/utils/dateUtils'
import { LogoutButton } from '../common/LogoutButton'
import Picture from '../../common/Picture'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FormState {
  name: string
  subtitle: string
  description: string
  pressRelease: string
  type: ConcertType
  cardDate: string
  cueBoxExternalLink: string
  status: ConcertStatus
  shows: ShowForm[]
  season: string
}

const inputCls =
  'w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors'

export default function ConcertForm({ isEditing = false, concert, venues: initialVenues }: ConcertFormProps) {
  const router = useRouter()

  const [venues, setVenues] = useState<Venue[]>(initialVenues)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    isEditing && concert?.imageUrl ? concert.imageUrl : null
  )

  const [form, setForm] = useState<FormState>({
    name: concert?.name ?? '',
    subtitle: concert?.subtitle ?? '',
    description: concert?.description ?? '',
    pressRelease: concert?.pressRelease ?? '',
    type: concert?.type ?? 'SEASON',
    cardDate: concert?.cardDate ?? '',
    cueBoxExternalLink: concert?.cueBoxExternalLink ?? '',
    status: concert?.status ?? 'DRAFT',
    shows:
      concert?.shows.map((s) => ({
        id: crypto.randomUUID(),
        existingId: s.id,
        venueId: s.venueId,
        venueName: s.venue.name,
        date: toDateInput(s.date),
        time: toTimeInput(s.date),
        externalLink: s.externalLink
      })) ?? [],
    season: concert?.season
  })

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }))

  const addShow = () =>
    setForm((f) => ({
      ...f,
      shows: [
        ...f.shows,
        {
          id: crypto.randomUUID(),
          venueId: '',
          venueName: '',
          date: '',
          time: '',
          city: '',
          externalLink: ''
        }
      ]
    }))

  const updateShow = (id: string, updated: ShowForm) =>
    setForm((f) => ({ ...f, shows: f.shows.map((s) => (s.id === id ? updated : s)) }))

  const removeShow = (id: string) => setForm((f) => ({ ...f, shows: f.shows.filter((s) => s.id !== id) }))

  const handleImage = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      store.dispatch(showToast({ type: 'error', message: 'Concert name is required' }))
      return
    }
    if (!imagePreview && !isEditing) {
      store.dispatch(showToast({ type: 'error', message: 'Concert image is required' }))
      return
    }
    if (form.shows.length === 0) {
      store.dispatch(showToast({ type: 'error', message: 'At least one show date is required' }))
      return
    }

    setLoading(true)

    // Upload image only if a new file was selected
    let imageUrl = concert?.imageUrl ?? ''
    let imageFilename = concert?.imageFilename ?? ''

    if (imageFile) {
      imageUrl = await uploadFileToFirebase(imageFile, setUploadProgress)
      imageFilename = imageFile.name
    }

    const shows = form.shows.map((s) => ({
      existingId: s.existingId,
      venueId: s.venueId,
      // Combine date + time into a single DateTime
      date: new Date(`${s.date}T${s.time || '00:00'}`).toISOString(),
      externalLink: s.externalLink
    }))

    const payload = {
      name: form.name,
      subtitle: form.subtitle,
      description: form.description,
      pressRelease: form.pressRelease,
      type: form.type,
      cardDate: form.cardDate,
      cueBoxExternalLink: form.cueBoxExternalLink,
      status: form.status,
      imageUrl,
      imageFilename,
      shows,
      season: form.season
    }

    const res = isEditing && concert ? await updateConcert(concert.id, payload) : await createConcert(payload)

    setLoading(false)

    if (res.success) {
      store.dispatch(
        showToast({
          type: 'success',
          message: isEditing ? 'Concert updated!' : 'Concert created!'
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
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Concerts</span>
          <span className="text-[9px] font-mono text-border-dark">·</span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">
            {isEditing ? `Edit — ${concert?.name}` : 'New Concert'}
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
            {loading ? 'Saving...' : isEditing ? 'Update Concert' : 'Save Concert'}
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
              <FieldLabel htmlFor="concert-name" required>
                Concert Name
              </FieldLabel>
              <input
                id="concert-name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Born in the U.S.A."
                className={inputCls}
              />
            </div>

            <div>
              <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
              <input
                id="subtitle"
                type="text"
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
                placeholder="Music of Bruce Springsteen"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div>
                <FieldLabel>Type</FieldLabel>
                <select
                  value={form.type}
                  onChange={(e) => set('type', e.target.value as ConcertType)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="SEASON">Season</option>
                  <option value="ADD_ON">Add-On</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <FieldLabel>Status</FieldLabel>
                <select
                  value={form.status}
                  onChange={(e) => set('status', e.target.value as ConcertStatus)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="LIVE">Live</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="card-date">Card Date</FieldLabel>
                <input
                  id="card-date"
                  type="text"
                  value={form.cardDate}
                  onChange={(e) => set('cardDate', e.target.value)}
                  placeholder="Nov 14 – 16"
                  className={inputCls}
                />
                <p className="text-[9px] text-muted-dark/40 font-mono mt-1">Display date shown on concert cards</p>
              </div>

              <div>
                <FieldLabel>Season</FieldLabel>
                <select
                  value={form.season}
                  onChange={(e) => set('season', e.target.value)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="25-26">25-26</option>
                  <option value="26-27">26-27</option>
                  <option value="27-28">27-28</option>
                </select>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="cuebox-link">CueBox External Link</FieldLabel>
              <div className="relative">
                <ExternalLink
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-dark pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="cuebox-link"
                  type="url"
                  value={form.cueBoxExternalLink}
                  onChange={(e) => set('cueBoxExternalLink', e.target.value)}
                  placeholder="https://..."
                  className={`${inputCls} pl-9`}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-border-dark px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">Description</span>
            </div>

            <div>
              <FieldLabel htmlFor="description" required>
                Description
              </FieldLabel>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="This season's patriotic celebration comes alive..."
                rows={5}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <FieldLabel htmlFor="press-release">Press Release</FieldLabel>
              <textarea
                id="press-release"
                value={form.pressRelease}
                onChange={(e) => set('pressRelease', e.target.value)}
                placeholder="Full press release text..."
                rows={7}
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
                aria-label="Upload concert image"
              >
                {imagePreview ? (
                  <div className="relative">
                    <Picture priority src={imagePreview} alt="Concert preview" className="w-full h-52 object-cover" />
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
                aria-label="Concert image file input"
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

          {/* Shows */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-dark sticky top-0 bg-bg-dark z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">Show Dates</span>
                <span className="text-[9px] font-mono text-muted-dark/40">({form.shows.length})</span>
              </div>
              <button
                type="button"
                onClick={addShow}
                className="flex items-center gap-1 text-[9px] font-mono tracking-widest uppercase text-primary-dark hover:text-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              >
                <Plus className="w-2.5 h-2.5" />
                Add Show
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {form.shows.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <Calendar className="w-6 h-6 text-border-dark" aria-hidden="true" />
                  <p className="text-muted-dark text-[10px] font-mono">No shows added yet</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {form.shows.map((show, i) => (
                    <ShowRow
                      key={show.id}
                      show={show}
                      index={i}
                      venues={venues}
                      onChange={(updated) => updateShow(show.id, updated)}
                      onRemove={() => removeShow(show.id)}
                      onVenueCreated={(v) => setVenues((prev) => [...prev, v])}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
