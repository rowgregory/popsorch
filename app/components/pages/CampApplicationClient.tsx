'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, User, MapPin, Users, Music } from 'lucide-react'
import Breadcrumb from '../common/Breadcrumb'
import { createCampApplication } from '@/app/actions/createCampApplication'
import { useRouter } from 'next/navigation'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { setOpenCampApplicationSuccessModal } from '@/app/redux/features/campSlice'

const formSteps = [
  { id: 1, label: 'Student', icon: User },
  { id: 2, label: 'Address', icon: MapPin },
  { id: 3, label: 'Parent', icon: Users },
  { id: 4, label: 'Music', icon: Music }
]

const labelClass = 'block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5'

const inputClass = (error?: string) =>
  `w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors ${
    error
      ? 'border-[#da0032] focus:border-[#da0032] focus:ring-[#da0032]'
      : 'border-neutral-700 focus:border-[#da0032] focus:ring-[#da0032]'
  }`

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-blaze font-medium">{error}</p>}
    </div>
  )
}

type FormState = {
  firstName: string
  lastName: string
  grade: string
  school: string
  studentEmailAddress: string
  studentPhoneNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipPostalCode: string
  parentFirstName: string
  parentLastName: string
  relationshipToStudent: string
  parentEmailAddress: string
  parentPhoneNumber: string
  instrument: string
  musicTeacher: string
  strings: string
  brassAndPercussion: string
  woodwinds: string
  referralSource: string
  consent: boolean
}

const requiredByStep: Record<number, (keyof FormState)[]> = {
  1: ['firstName', 'lastName', 'grade', 'school', 'studentEmailAddress', 'studentPhoneNumber'],
  2: ['addressLine1', 'city', 'state', 'zipPostalCode'],
  3: ['parentFirstName', 'parentLastName', 'parentEmailAddress', 'parentPhoneNumber'],
  4: ['instrument', 'consent']
}

const fieldLabels: Partial<Record<keyof FormState, string>> = {
  firstName: 'First name',
  lastName: 'Last name',
  grade: 'Grade',
  school: 'School',
  studentEmailAddress: 'Email address',
  studentPhoneNumber: 'Phone number',
  addressLine1: 'Address',
  city: 'City',
  state: 'State',
  zipPostalCode: 'ZIP code',
  parentFirstName: 'First name',
  parentLastName: 'Last name',
  parentEmailAddress: 'Email address',
  parentPhoneNumber: 'Phone number',
  instrument: 'Primary instrument',
  consent: 'You must agree to the terms to continue'
}

const initialState = {
  firstName: '',
  lastName: '',
  grade: '',
  school: '',
  studentEmailAddress: '',
  studentPhoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipPostalCode: '',
  parentFirstName: '',
  parentLastName: '',
  relationshipToStudent: '',
  parentEmailAddress: '',
  parentPhoneNumber: '',
  instrument: '',
  musicTeacher: '',
  strings: '',
  brassAndPercussion: '',
  woodwinds: '',
  referralSource: '',
  consent: false
}

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 })
}

export default function CampApplicationClient({ data }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [form, setForm] = useState<FormState>(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const schedule = [
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_monday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_monday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_monday_items')?.value.split('\n') ?? []
    },
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_tuesday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_tuesday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_tuesday_items')?.value.split('\n') ?? []
    },
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_wednesday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_wednesday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_wednesday_items')?.value.split('\n') ?? []
    },
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_thursday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_thursday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_thursday_items')?.value.split('\n') ?? []
    },
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_friday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_friday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_friday_items')?.value.split('\n') ?? []
    },
    {
      date: data?.content?.find?.((d) => d.id === 'camp_schedule_saturday_date')?.value,
      time: data?.content?.find?.((d) => d.id === 'camp_schedule_saturday_time')?.value,
      items: data?.content?.find?.((d) => d.id === 'camp_schedule_saturday_items')?.value.split('\n') ?? []
    }
  ]

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (s: number): boolean => {
    const required = requiredByStep[s] ?? []
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    for (const field of required) {
      const val = form[field]
      if (field === 'consent') {
        if (!val) newErrors[field] = fieldLabels[field] ?? 'Required'
      } else if (!String(val).trim()) {
        newErrors[field] = `${fieldLabels[field] ?? 'This field'} is required`
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const go = (next: number) => {
    if (next > step && step > 0 && !validate(step)) return
    setDirection(next > step ? 1 : -1)
    setStep(next)
    setErrors({})
  }

  const e = (field: keyof FormState) => errors[field]

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validate(4)) return

    try {
      setIsLoading(true)
      await createCampApplication(form)
      store.dispatch(setOpenCampApplicationSuccessModal())
      router.refresh()
      setForm(initialState)
      store.dispatch(showToast({ type: 'success', message: 'Successfully submitted camp application.' }))
      setStep(1)
    } catch {
      store.dispatch(showToast({ type: 'error', message: 'Fail to submit camp application.' }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Breadcrumb breadcrumb="Camp Application" classname="1200:max-w-screen-1400" />
      <div className="bg-[#0a0a0a] flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-68 lg:sticky lg:top-6 shrink-0">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }} />
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sunburst mb-0.5">
                  Youth Music Camp
                </p>
                <h2 className="text-lg font-black text-white mb-5">Camp Schedule</h2>
                <div className="space-y-5">
                  {schedule.map((day) => (
                    <div key={day.date}>
                      <p className="text-xs font-bold text-white">{day.date}</p>
                      <p className="text-[11px] text-sunburst font-semibold mb-1.5">{day.time}</p>
                      <ul className="space-y-1">
                        {day.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-blaze shrink-0" />
                            <span className="text-[11px] text-neutral-400 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-neutral-800 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-blaze mt-0.5 shrink-0" />
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    At least two years of playing experience required
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="flex-1 min-w-0 w-full">
            {/* Wordmark */}
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sunburst mb-1">
                Bradenton & Sarasota
              </p>
              <h1 className="text-3xl font-black tracking-tight">
                <span className="text-white">THE </span>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #da0032, #ff9000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  POPS
                </span>
                <span className="text-white"> ORCHESTRA</span>
              </h1>
              <p className="text-neutral-500 text-sm mt-2 font-medium">Youth Music Camp Application</p>
            </div>

            {/* Step indicators — only show after intro */}
            {step > 0 && (
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center w-full max-w-sm">
                  {formSteps.map((s, i) => {
                    const Icon = s.icon
                    const done = step > s.id
                    const active = step === s.id
                    return (
                      <div key={s.id} className={`flex items-center ${i < formSteps.length - 1 ? 'flex-1' : ''}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          <button
                            onClick={() => step > s.id && go(s.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              done
                                ? 'bg-blaze border-blaze'
                                : active
                                  ? 'bg-transparent border-blaze shadow-[0_0_16px_rgba(218,0,50,0.4)]'
                                  : 'bg-transparent border-neutral-700'
                            }`}
                          >
                            {done ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <Icon className={`w-4 h-4 ${active ? 'text-blaze' : 'text-neutral-600'}`} />
                            )}
                          </button>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${active ? 'text-white' : done ? 'text-sunburst' : 'text-neutral-600'}`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < formSteps.length - 1 ? (
                          <div
                            className={`flex-1 h-px mx-3 mb-4 transition-all duration-500 ${step > s.id ? 'bg-blaze' : 'bg-neutral-800'}`}
                          />
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="h-1 w-full bg-linear-to-r from-blaze to-sunburst" />

              <div className="p-8" style={{ minHeight: 360 }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    {/* Step 1 — Student */}
                    {step === 1 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Student Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="First Name" error={e('firstName')}>
                            <input
                              className={inputClass(e('firstName'))}
                              placeholder="Jane"
                              value={form.firstName}
                              onChange={(e) => set('firstName', e.target.value)}
                            />
                          </Field>
                          <Field label="Last Name" error={e('lastName')}>
                            <input
                              className={inputClass(e('lastName'))}
                              placeholder="Doe"
                              value={form.lastName}
                              onChange={(e) => set('lastName', e.target.value)}
                            />
                          </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Grade" error={e('grade')}>
                            <input
                              className={inputClass(e('grade'))}
                              placeholder="9th"
                              value={form.grade}
                              onChange={(e) => set('grade', e.target.value)}
                            />
                          </Field>
                          <Field label="School" error={e('school')}>
                            <input
                              className={inputClass(e('school'))}
                              placeholder="Sarasota High"
                              value={form.school}
                              onChange={(e) => set('school', e.target.value)}
                            />
                          </Field>
                        </div>
                        <Field label="Email Address" error={e('studentEmailAddress')}>
                          <input
                            className={inputClass(e('studentEmailAddress'))}
                            type="email"
                            placeholder="jane@email.com"
                            value={form.studentEmailAddress}
                            onChange={(e) => set('studentEmailAddress', e.target.value)}
                          />
                        </Field>
                        <Field label="Phone Number" error={e('studentPhoneNumber')}>
                          <input
                            className={inputClass(e('studentPhoneNumber'))}
                            type="tel"
                            placeholder="(941) 555-0100"
                            value={form.studentPhoneNumber}
                            onChange={(e) => set('studentPhoneNumber', e.target.value)}
                          />
                        </Field>
                      </>
                    )}

                    {/* Step 2 — Address */}
                    {step === 2 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Home Address</h2>
                        <Field label="Address Line 1" error={e('addressLine1')}>
                          <input
                            className={inputClass(e('addressLine1'))}
                            placeholder="123 Main St"
                            value={form.addressLine1}
                            onChange={(e) => set('addressLine1', e.target.value)}
                          />
                        </Field>
                        <Field label="Address Line 2">
                          <input
                            className={inputClass()}
                            placeholder="Apt, Suite, etc. (optional)"
                            value={form.addressLine2}
                            onChange={(e) => set('addressLine2', e.target.value)}
                          />
                        </Field>
                        <div className="grid grid-cols-3 gap-4">
                          <Field label="City" error={e('city')}>
                            <input
                              className={inputClass(e('city'))}
                              placeholder="Sarasota"
                              value={form.city}
                              onChange={(e) => set('city', e.target.value)}
                            />
                          </Field>
                          <Field label="State" error={e('state')}>
                            <input
                              className={inputClass(e('state'))}
                              placeholder="FL"
                              value={form.state}
                              onChange={(e) => set('state', e.target.value)}
                            />
                          </Field>
                          <Field label="ZIP Code" error={e('zipPostalCode')}>
                            <input
                              className={inputClass(e('zipPostalCode'))}
                              placeholder="34230"
                              value={form.zipPostalCode}
                              onChange={(e) => set('zipPostalCode', e.target.value)}
                            />
                          </Field>
                        </div>
                      </>
                    )}

                    {/* Step 3 — Parent */}
                    {step === 3 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Parent / Guardian</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="First Name" error={e('parentFirstName')}>
                            <input
                              className={inputClass(e('parentFirstName'))}
                              placeholder="John"
                              value={form.parentFirstName}
                              onChange={(e) => set('parentFirstName', e.target.value)}
                            />
                          </Field>
                          <Field label="Last Name" error={e('parentLastName')}>
                            <input
                              className={inputClass(e('parentLastName'))}
                              placeholder="Doe"
                              value={form.parentLastName}
                              onChange={(e) => set('parentLastName', e.target.value)}
                            />
                          </Field>
                        </div>
                        <Field label="Relationship to Student">
                          <input
                            className={inputClass()}
                            placeholder="Parent, Guardian, etc."
                            value={form.relationshipToStudent}
                            onChange={(e) => set('relationshipToStudent', e.target.value)}
                          />
                        </Field>
                        <Field label="Email Address" error={e('parentEmailAddress')}>
                          <input
                            className={inputClass(e('parentEmailAddress'))}
                            type="email"
                            placeholder="john@email.com"
                            value={form.parentEmailAddress}
                            onChange={(e) => set('parentEmailAddress', e.target.value)}
                          />
                        </Field>
                        <Field label="Phone Number" error={e('parentPhoneNumber')}>
                          <input
                            className={inputClass(e('parentPhoneNumber'))}
                            type="tel"
                            placeholder="(941) 555-0101"
                            value={form.parentPhoneNumber}
                            onChange={(e) => set('parentPhoneNumber', e.target.value)}
                          />
                        </Field>
                      </>
                    )}

                    {/* Step 4 — Music */}
                    {step === 4 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Music Details</h2>
                        <Field label="Primary Instrument" error={e('instrument')}>
                          <input
                            className={inputClass(e('instrument'))}
                            placeholder="Violin, Trumpet, Flute..."
                            value={form.instrument}
                            onChange={(e) => set('instrument', e.target.value)}
                          />
                        </Field>
                        <Field label="Music Teacher (optional)">
                          <input
                            className={inputClass()}
                            placeholder="Teacher's name"
                            value={form.musicTeacher}
                            onChange={(e) => set('musicTeacher', e.target.value)}
                          />
                        </Field>
                        <div className="grid grid-cols-3 gap-4">
                          <Field label="Strings">
                            <select
                              className={inputClass()}
                              value={form.strings}
                              onChange={(e) => set('strings', e.target.value)}
                            >
                              <option value="" disabled className="text-neutral-500">
                                Select level
                              </option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </Field>
                          <Field label="Brass & Perc.">
                            <select
                              className={inputClass()}
                              value={form.brassAndPercussion}
                              onChange={(e) => set('brassAndPercussion', e.target.value)}
                            >
                              <option value="" disabled className="text-neutral-500">
                                Select level
                              </option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </Field>
                          <Field label="Woodwinds">
                            <select
                              className={inputClass()}
                              value={form.woodwinds}
                              onChange={(e) => set('woodwinds', e.target.value)}
                            >
                              <option value="" disabled className="text-neutral-500">
                                Select level
                              </option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </Field>
                        </div>
                        <Field label="How did you hear about us?">
                          <input
                            className={inputClass()}
                            placeholder="Friend, social media, school..."
                            value={form.referralSource}
                            onChange={(e) => set('referralSource', e.target.value)}
                          />
                        </Field>
                        <Field label="" error={e('consent')}>
                          <label className="flex items-start gap-3 group mt-2">
                            <div
                              onClick={() => set('consent', !form.consent)}
                              className={`mt-0.5 w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-all cursor-pointer ${
                                form.consent
                                  ? 'bg-blaze border-blaze'
                                  : e('consent')
                                    ? 'border-blaze'
                                    : 'border-neutral-600 group-hover:border-neutral-400'
                              }`}
                            >
                              {form.consent && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-neutral-400 leading-relaxed">
                              I consent to the terms and conditions of the Pops Orchestra Youth Music Camp and confirm
                              all information provided is accurate.
                            </span>
                          </label>
                        </Field>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="px-8 pb-8 flex items-center justify-between">
                {step !== 1 ? (
                  <button
                    onClick={() => go(step - 1)}
                    disabled={step === 0}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-400 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={() => go(step + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }}
                  >
                    {step === 0 ? 'Start Application' : 'Continue'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
