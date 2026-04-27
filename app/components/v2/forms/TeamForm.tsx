'use client'

import { useState } from 'react'
import { Music2, Plus, Upload, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { TeamMember, TeamMemberRole } from '@prisma/client'
import { FieldLabel } from '../common/FieldLabel'
import { updateTeamMember } from '@/app/lib/actions/team/updateTeamMember'
import { createTeamMember } from '@/app/lib/actions/team/createTeamMember'
import { LogoutButton } from '../common/LogoutButton'
import Picture from '../../common/Picture'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FormState {
  firstName: string
  lastName: string
  position: string
  bio: string
  role: TeamMemberRole
}

type TeamormProps = {
  isEditing?: boolean
  team?: TeamMember
}

const inputCls =
  'w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors'

export default function TeamForm({ isEditing = false, team }: TeamormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(isEditing && team?.imageUrl ? team.imageUrl : null)

  const [form, setForm] = useState<FormState>({
    firstName: team?.firstName ?? '',
    lastName: team?.lastName ?? '',
    position: team?.position ?? '',
    bio: team?.bio ?? '',
    role: team?.role as TeamMemberRole
  })

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }))

  const handleImage = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!form.firstName.trim()) {
      store.dispatch(showToast({ type: 'error', message: 'Team Member name is required' }))
      return
    }
    if (!imagePreview && !isEditing) {
      store.dispatch(showToast({ type: 'error', message: 'Team Member image is required' }))
      return
    }

    setLoading(true)

    // Upload image only if a new file was selected
    let imageUrl = team?.imageUrl ?? ''
    let imageFilename = team?.imageFilename ?? ''

    if (imageFile) {
      imageUrl = await uploadFileToFirebase(imageFile, setUploadProgress)
      imageFilename = imageFile.name
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      position: form.position,
      bio: form.bio,
      role: form.role,
      imageUrl,
      imageFilename
    }

    const res = isEditing && team ? await updateTeamMember(team.id, payload) : await createTeamMember(payload)

    setLoading(false)

    if (res.success) {
      store.dispatch(
        showToast({
          type: 'success',
          message: isEditing ? 'Team Member updated!' : 'Team Member created!'
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
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Team Members</span>
          <span className="text-[9px] font-mono text-border-dark">·</span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">
            {isEditing ? `Edit — ${team?.firstName} ${team?.lastName[0]}` : 'New Team Member'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !form.firstName.trim()}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="w-3 h-3" aria-hidden="true" />
            )}
            {loading ? 'Saving...' : isEditing ? 'Update Team Member' : 'Save Team Member'}
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="team-first-name" required>
                  First Name
                </FieldLabel>
                <input
                  id="team-last-name"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                  placeholder="Karen"
                  className={inputCls}
                />
              </div>
              <div>
                <FieldLabel htmlFor="team-last-name" required>
                  Last Name
                </FieldLabel>
                <input
                  id="team-last-name"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  placeholder="Stein"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="team-position" required>
                  Position
                </FieldLabel>
                <input
                  id="team-position"
                  type="text"
                  value={form.position}
                  onChange={(e) => set('position', e.target.value)}
                  placeholder="Section Clarinet"
                  className={inputCls}
                />
              </div>
              <div>
                <FieldLabel>Role</FieldLabel>
                <select
                  value={form.role}
                  onChange={(e) => set('role', e.target.value as TeamMemberRole)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="MUSICIAN">Musican</option>
                  <option value="BOARD_MEMBER">Board Member</option>
                  <option value="STAFF">Staff</option>
                </select>
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
              <FieldLabel htmlFor="bio" required>
                Bio
              </FieldLabel>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => set('bio', e.target.value)}
                placeholder="Karen is..."
                rows={5}
                className={`${inputCls} resize-none`}
              />
              <p className="text-[9px] font-mono text-muted-dark/50 mt-1.5 leading-relaxed">
                To display your bio as bullet points, add a pipe <span className="text-muted-dark">( | )</span> after
                each sentence to indicate where it should be split.
              </p>
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
                aria-label="Upload team image"
              >
                {imagePreview ? (
                  <div className="relative">
                    <Picture
                      priority
                      src={imagePreview}
                      alt="Team Member preview"
                      className="w-full h-52 object-cover"
                    />
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
                aria-label="Team Member image file input"
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
