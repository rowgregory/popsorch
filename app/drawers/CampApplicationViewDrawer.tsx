import { useAppDispatch, useCampSelector, useFormSelector } from '../redux/store'
import BottomDrawer from '../components/common/BottomDrawer'
import { clearInputs } from '../redux/features/formSlice'
import { resetCampApplication, setCloseCampApplicationDrawer } from '../redux/features/campSlice'
import { formatDate } from '../utils/date.functions'

const CampApplicationViewDrawer = () => {
  const dispatch = useAppDispatch()
  const { campForm } = useFormSelector()
  const { campApplicationDrawer } = useCampSelector()

  const reset = () => {
    dispatch(resetCampApplication())
    dispatch(clearInputs({ formName: 'campForm' }))
    dispatch(setCloseCampApplicationDrawer())
  }

  return (
    <BottomDrawer isOpen={campApplicationDrawer}>
      <div className="w-full mx-auto h-full flex items-center flex-col max-h-1000:justify-start justify-center max-h-1000:my-20 overflow-y-auto">
        <div className="space-y-7 max-w-screen-md w-full">
          <div className="flex flex-col items-start justify-start w-fit">
            <h1 className="font-changa text-3xl font-semibold">Camp Application</h1>
            <h2 className="font-changa text-13 font-semibold text-blue-400">{campForm?.inputs?.id}</h2>
          </div>
          <div className="flex 760:items-center flex-col 760:flex-row gap-y-10 760:gap-x-10">
            <div>
              <h5 className="text-2xl font-changa font-semibold mb-3">Student Details</h5>
              <ul className="list-disc list-inside ml-4 space-y-1 font-lato text-15 text-white">
                <li>
                  Student Name:
                  <span className="text-white ml-2">
                    {campForm?.inputs?.student?.firstName} {campForm?.inputs?.student?.lastName}
                  </span>
                </li>
                <li>
                  Student Email:
                  <span className="text-white ml-2">{campForm?.inputs?.student?.studentEmailAddress}</span>
                </li>
                <li>
                  Student Phone Number:
                  <span className="text-white ml-2">{campForm?.inputs?.student?.studentPhoneNumber}</span>
                </li>
                <li>
                  Grade: <span className="text-white ml-2">{campForm?.inputs?.student?.grade}</span>
                </li>
                <li>
                  School: <span className="text-white ml-2">{campForm?.inputs?.student?.school}</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-2xl font-changa font-semibold mb-3">Parent / Guardian Details</h5>
              <ul className="list-disc list-inside ml-4 space-y-1 font-lato text-15 text-white">
                <li>
                  Parent / Guardian Name:
                  <span className="text-white ml-2">
                    {campForm?.inputs?.parent?.firstName} {campForm?.inputs?.parent?.lastName}
                  </span>
                </li>
                <li>
                  Relationship to Student:
                  <span className="text-white ml-2">{campForm?.inputs?.parent?.relationshipToStudent}</span>
                </li>
                <li>
                  Parent / Guardian Email:
                  <span className="text-white ml-2">{campForm?.inputs?.parent?.parentEmailAddress}</span>
                </li>
                <li>
                  Parent / Guardian Phone Number:
                  <span className="text-white ml-2">{campForm?.inputs?.parent?.parentPhoneNumber}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-[1px] my-8 bg-zinc-700/70" />
          <div>
            <h5 className="text-2xl font-changa font-semibold mb-3">Address</h5>
            <ul className="list-disc list-inside ml-4 space-y-1 font-lato text-15 text-white">
              <li>
                Address Line 1:
                <span className="text-white ml-2">{campForm?.inputs?.address?.addressLine1}</span>
              </li>
              <li>
                Address Line 2:
                <span className="text-white ml-2">{campForm?.inputs?.address?.addressLine2}</span>
              </li>
              <li>
                City:
                <span className="text-white ml-2">{campForm?.inputs?.address?.city}</span>
              </li>
              <li>
                State:
                <span className="text-white ml-2">{campForm?.inputs?.address?.state}</span>
              </li>
              <li>
                Zip Code:
                <span className="text-white ml-2">{campForm?.inputs?.address?.zipPostalCode}</span>
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] my-8 bg-zinc-700/70" />

          <div>
            <h5 className="text-2xl font-changa font-semibold mb-3">Instrument & Training</h5>
            <ul className="list-disc list-inside ml-4 space-y-1 font-lato text-15 text-white">
              <li>
                Instrument
                <span className="text-white ml-2">{campForm?.inputs?.instrument}</span>
              </li>
              <li>
                Music Teacher
                <span className="text-white ml-2">{campForm?.inputs?.musicTeacher}</span>
              </li>
              <li>
                Brass & Percussion:
                <span className="text-white ml-2">{campForm?.inputs?.brassAndPercussion}</span>
              </li>
              <li>
                Strings:
                <span className="text-white ml-2">{campForm?.inputs?.strings}</span>
              </li>
              <li>
                Woodwinds:
                <span className="text-white ml-2">{campForm?.inputs?.woodwinds}</span>
              </li>
              <li>
                Referral Source:
                <span className="text-white ml-2">{campForm?.inputs?.referralSource}</span>
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] my-8 bg-zinc-700/70" />
          <div>
            <h5 className="text-2xl font-changa font-semibold mb-3">
              Agreed to consent on{' '}
              {formatDate(campForm?.inputs?.createdAt, {
                minute: 'numeric',
                second: 'numeric',
                hour: 'numeric'
              })}
            </h5>
          </div>
          <div className="w-full flex items-start mt-10">
            <button
              type="button"
              onClick={reset}
              className="w-36 py-3.5 text-12 font-changa font-medium rounded-sm bg-gray-300 text-duskgray uppercase hover:text-blue-400 duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </BottomDrawer>
  )
}

export default CampApplicationViewDrawer
