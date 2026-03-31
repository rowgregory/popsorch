import { store, useCampSelector, useFormSelector } from '@/app/redux/store'
import { resetForm } from '@/app/redux/features/formSlice'
import { setCloseCampApplicationDrawer } from '@/app/redux/features/campSlice'
import { formatDate } from '@/app/utils/date.functions'
import { CheckCircle, MapPin, Music, User, Users, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 flex items-center justify-center shrink-0 bg-surface-dark border border-border-dark">
        <Icon className="w-3.5 h-3.5 text-primary-dark" />
      </div>
      <h5 className="text-xs font-bold uppercase tracking-widest text-stat-label-dark">{title}</h5>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </div>
)

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="px-4 py-3 bg-surface-dark border border-border-dark">
    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-muted-dark">{label}</p>
    <p className="text-sm font-medium text-text-dark">{value || '—'}</p>
  </div>
)

const Divider = () => <div className="h-px w-full bg-border-dark" />

const CampApplicationViewDrawer = () => {
  const { campForm } = useFormSelector()
  const { campApplicationDrawer } = useCampSelector()
  const drawerRef = useRef<HTMLDivElement>(null)

  const reset = () => {
    store.dispatch(resetForm('campForm'))
    store.dispatch(setCloseCampApplicationDrawer())
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (campApplicationDrawer && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        reset()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [campApplicationDrawer])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && campApplicationDrawer) reset()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [campApplicationDrawer])

  const app = campForm?.inputs

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-topbar-dark/75 transition-opacity duration-300"
        style={{
          opacity: campApplicationDrawer ? 1 : 0,
          pointerEvents: campApplicationDrawer ? 'auto' : 'none'
        }}
        aria-hidden="true"
      />

      {/* Right-side drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Camp Application"
        className="fixed top-0 right-0 z-50 h-full w-full max-w-xl flex flex-col transition-transform duration-300 ease-in-out overflow-hidden bg-bg-dark border-l border-border-dark"
        style={{ transform: campApplicationDrawer ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Top accent bar */}
        <div className="h-0.5 w-full shrink-0 bg-linear-to-r from-primary-light to-primary-dark" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-8 px-6 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-primary-dark">
                  Youth Music Camp
                </p>
                <h1 className="text-2xl font-black text-text-dark">Camp Application</h1>
                <p className="text-xs font-mono mt-1 text-muted-dark">{app?.id}</p>
              </div>
              <button
                onClick={reset}
                className="w-9 h-9 flex items-center justify-center bg-surface-dark border border-border-dark text-muted-dark hover:bg-button-dark transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Divider />

            <Section title="Student Details" icon={User}>
              <Field label="First Name" value={app?.student?.firstName} />
              <Field label="Last Name" value={app?.student?.lastName} />
              <Field label="Email" value={app?.student?.studentEmailAddress} />
              <Field label="Phone" value={app?.student?.studentPhoneNumber} />
              <Field label="Grade" value={app?.student?.grade} />
              <Field label="School" value={app?.student?.school} />
            </Section>

            <Divider />

            <Section title="Parent / Guardian" icon={Users}>
              <Field label="First Name" value={app?.parent?.firstName} />
              <Field label="Last Name" value={app?.parent?.lastName} />
              <Field label="Relationship" value={app?.parent?.relationshipToStudent} />
              <Field label="Email" value={app?.parent?.parentEmailAddress} />
              <Field label="Phone" value={app?.parent?.parentPhoneNumber} />
            </Section>

            <Divider />

            <Section title="Address" icon={MapPin}>
              <Field label="Address Line 1" value={app?.address?.addressLine1} />
              <Field label="Address Line 2" value={app?.address?.addressLine2} />
              <Field label="City" value={app?.address?.city} />
              <Field label="State" value={app?.address?.state} />
              <Field label="ZIP Code" value={app?.address?.zipPostalCode} />
            </Section>

            <Divider />

            <Section title="Instrument & Training" icon={Music}>
              <Field label="Instrument" value={app?.instrument} />
              <Field label="Music Teacher" value={app?.musicTeacher} />
              <Field label="Strings" value={app?.strings} />
              <Field label="Brass & Percussion" value={app?.brassAndPercussion} />
              <Field label="Woodwinds" value={app?.woodwinds} />
              <Field label="Referral Source" value={app?.referralSource} />
            </Section>

            <Divider />

            {/* Consent */}
            <div className="flex items-start gap-3 px-4 py-3 bg-surface-dark border border-border-dark">
              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-text-dark">Consent Agreed</p>
                <p className="text-xs mt-0.5 text-muted-dark">
                  {formatDate(app?.createdAt, { minute: 'numeric', second: 'numeric', hour: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 px-6 py-4 border-t border-border-dark bg-bg-dark">
          <button
            onClick={reset}
            className="w-full py-3 text-sm font-bold text-text-dark transition-opacity hover:opacity-90 bg-linear-to-r from-primary-light to-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default CampApplicationViewDrawer
