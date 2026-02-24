import { store, useCampSelector, useFormSelector } from '@/app/redux/store'
import BottomDrawer from '@/app/components/common/BottomDrawer'
import { resetForm } from '@/app/redux/features/formSlice'
import { setCloseCampApplicationDrawer } from '@/app/redux/features/campSlice'
import { formatDate } from '@/app/utils/date.functions'
import { CheckCircle, MapPin, Music, User, Users, X } from 'lucide-react'

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-neutral-800 border border-neutral-700">
        <Icon className="w-3.5 h-3.5 text-sunburst" />
      </div>
      <h5 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h5>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </div>
)

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm text-white font-medium">{value || '—'}</p>
  </div>
)

const Divider = () => <div className="h-px w-full bg-neutral-800" />

const CampApplicationViewDrawer = () => {
  const { campForm } = useFormSelector()
  const { campApplicationDrawer } = useCampSelector()

  const reset = () => {
    store.dispatch(resetForm('campForm'))
    store.dispatch(setCloseCampApplicationDrawer())
  }

  const app = campForm?.inputs

  return (
    <BottomDrawer isOpen={campApplicationDrawer}>
      <div className="w-full mx-auto h-full flex flex-col overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto py-10 px-4 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sunburst mb-1">Youth Music Camp</p>
              <h1 className="text-2xl font-black text-white">Camp Application</h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">{app?.id}</p>
            </div>
            <button
              onClick={reset}
              className="w-9 h-9 flex items-center justify-center bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Gradient bar */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }} />

          {/* Student */}
          <Section title="Student Details" icon={User}>
            <Field label="First Name" value={app?.student?.firstName} />
            <Field label="Last Name" value={app?.student?.lastName} />
            <Field label="Email" value={app?.student?.studentEmailAddress} />
            <Field label="Phone" value={app?.student?.studentPhoneNumber} />
            <Field label="Grade" value={app?.student?.grade} />
            <Field label="School" value={app?.student?.school} />
          </Section>

          <Divider />

          {/* Parent */}
          <Section title="Parent / Guardian" icon={Users}>
            <Field label="First Name" value={app?.parent?.firstName} />
            <Field label="Last Name" value={app?.parent?.lastName} />
            <Field label="Relationship" value={app?.parent?.relationshipToStudent} />
            <Field label="Email" value={app?.parent?.parentEmailAddress} />
            <Field label="Phone" value={app?.parent?.parentPhoneNumber} />
          </Section>

          <Divider />

          {/* Address */}
          <Section title="Address" icon={MapPin}>
            <Field label="Address Line 1" value={app?.address?.addressLine1} />
            <Field label="Address Line 2" value={app?.address?.addressLine2} />
            <Field label="City" value={app?.address?.city} />
            <Field label="State" value={app?.address?.state} />
            <Field label="ZIP Code" value={app?.address?.zipPostalCode} />
          </Section>

          <Divider />

          {/* Music */}
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
          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Consent Agreed</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                {formatDate(app?.createdAt, { minute: 'numeric', second: 'numeric', hour: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={reset}
            className="w-full py-3 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }}
          >
            Close
          </button>
        </div>
      </div>
    </BottomDrawer>
  )
}

export default CampApplicationViewDrawer
