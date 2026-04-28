import Link from 'next/link'
import { ArrowLeft, User, MapPin, Users, Music, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/app/utils/date.functions'

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-4 h-px bg-blaze" aria-hidden="true" />
      <h2 className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">{label}</h2>
      <Icon className="w-3.5 h-3.5 text-blaze ml-auto" aria-hidden="true" />
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">{label}</p>
      <p className="font-lato text-sm text-white/70 leading-relaxed">
        {value || <span className="text-white/20 italic">Not provided</span>}
      </p>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-black border-l-2 border-blaze p-6 430:p-8 ${className}`}>{children}</div>
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SupporterOverviewCampApplicationClient({ application }) {
  const { student, address, parent } = application

  const musicSection = [
    application?.strings && { label: 'Strings', value: application?.strings },
    application?.brassAndPercussion && { label: 'Brass & Percussion', value: application?.brassAndPercussion },
    application?.woodwinds && { label: 'Woodwinds', value: application?.woodwinds }
  ].filter(Boolean)

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 430:px-6 py-10 430:py-14">
        {/* Back nav */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/supporter/overview"
            className="group inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-white/30 hover:text-blaze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>Back to Overview</span>
          </Link>
        </nav>

        {/* Page header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
            <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">The Pops Orchestra</span>
          </div>
          <h1 className="font-changa text-3xl 430:text-4xl text-white leading-none mb-3 uppercase">Camp Application</h1>
          <div className="w-8 h-px bg-blaze mb-6" aria-hidden="true" />

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-white/20" aria-hidden="true" />
              <time dateTime={application?.createdAt?.toISOString()} className="font-lato text-xs text-white/40">
                Submitted {formatDate(application?.createdAt)}
              </time>
            </div>
            <div
              className="flex items-center gap-2"
              aria-label={`Consent: ${application?.consent ? 'given' : 'not given'}`}
            >
              {application?.consent ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-400/60" aria-hidden="true" />
              )}
              <span className="font-changa text-[10px] uppercase tracking-widest text-white/30">
                Consent {application?.consent ? 'Given' : 'Not Given'}
              </span>
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="flex flex-col gap-px bg-white/5">
          {/* Student */}
          <Card>
            <SectionHeader label="Student Information" icon={User} />
            <dl className="grid grid-cols-1 430:grid-cols-2 gap-x-8 gap-y-6">
              <Field label="First Name" value={student?.firstName} />
              <Field label="Last Name" value={student?.lastName} />
              <Field label="Grade" value={student?.grade} />
              <Field label="School" value={student?.school} />
              <Field label="Email Address" value={student?.studentEmailAddress} />
              <Field label="Phone Number" value={student?.studentPhoneNumber} />
            </dl>
          </Card>

          {/* Address */}
          <Card>
            <SectionHeader label="Address" icon={MapPin} />
            <dl className="grid grid-cols-1 430:grid-cols-2 gap-x-8 gap-y-6">
              <div className="430:col-span-2">
                <Field label="Address Line 1" value={address?.addressLine1} />
              </div>
              {address?.addressLine2 && (
                <div className="430:col-span-2">
                  <Field label="Address Line 2" value={address.addressLine2} />
                </div>
              )}
              <Field label="City" value={address?.city} />
              <Field label="State" value={address?.state} />
              <Field label="ZIP / Postal Code" value={address?.zipPostalCode} />
            </dl>
          </Card>

          {/* Parent / Guardian */}
          <Card>
            <SectionHeader label="Parent / Guardian" icon={Users} />
            <dl className="grid grid-cols-1 430:grid-cols-2 gap-x-8 gap-y-6">
              <Field label="First Name" value={parent?.firstName} />
              <Field label="Last Name" value={parent?.lastName} />
              <Field label="Relationship to Student" value={parent?.relationshipToStudent} />
              <div className="430:col-span-2 w-px h-px" aria-hidden="true" /> {/* spacer */}
              <Field label="Email Address" value={parent?.parentEmailAddress} />
              <Field label="Phone Number" value={parent?.parentPhoneNumber} />
            </dl>
          </Card>

          {/* Music Details */}
          <Card>
            <SectionHeader label="Music Details" icon={Music} />
            <dl className="grid grid-cols-1 430:grid-cols-2 gap-x-8 gap-y-6">
              <Field label="Instrument" value={application?.instrument} />
              <Field label="Music Teacher" value={application?.musicTeacher} />

              {musicSection.length > 0 && (
                <div className="430:col-span-2">
                  <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3">Section</p>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {musicSection.map((item) => (
                      <li
                        key={item!.label}
                        className="bg-white/5 border-l-2 border-blaze px-3 py-1 font-lato text-xs text-white/70"
                      >
                        <span className="text-white/30 mr-1">{item!.label}:</span>
                        {item!.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {application?.referralSource && (
                <div className="430:col-span-2">
                  <Field label="How did you hear about us?" value={application?.referralSource} />
                </div>
              )}
            </dl>
          </Card>

          {/* Submitted timestamp footer */}
          <div className="bg-black px-6 430:px-8 py-4 flex items-center gap-2">
            <Clock className="w-3 h-3 text-white/10 shrink-0" aria-hidden="true" />
            <p className="font-lato text-[10px] text-white/20 leading-relaxed">
              Application ID: <span className="tracking-widest">{application?.id}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
