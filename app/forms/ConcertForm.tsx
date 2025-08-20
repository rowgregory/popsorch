import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions, resetForm, setIsCreating } from '../redux/features/formSlice'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { closeDrawer, openBottomOverlayDrawer } from '../redux/features/dashboardSlice'
import { plusIcon } from '../lib/icons'
import AdminCreateConcertEventDetailsDrawer from '../drawers/AdminConcertEventDetailsDrawer'
import AdminConcertDetailsList from '../components/admin/AdminConcertDetailsList'
import AdminInput from './elements/AdminInput'
import AdminTextarea from './elements/AdminTextarea'
import AdminFormBtns from '../components/admin/AdminFormBtns'
import AdminFormPhoto from '../components/admin/AdminFormPhoto'
import AdminSelect from './elements/AdminSelect'

const ConcertForm: FC<{ handleSubmit: any; loading: boolean }> = ({ handleSubmit, loading }) => {
  const dispatch = useAppDispatch()
  const { concert } = useAppSelector((state: RootState) => state.form)
  const { isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { handleInput, setInputs, handleFileChange, removeConcertDetails } = createFormActions('concert', dispatch)

  const openConcertDetailsDrawer = () => {
    dispatch(openBottomOverlayDrawer('details'))
    dispatch(setIsCreating())
  }

  return (
    <>
      <AdminCreateConcertEventDetailsDrawer />
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex max-h-768:items-start md:items-center max-h-768:h-auto md:h-full justify-center py-12"
      >
        <div className="flex flex-col w-full max-w-3xl relative">
          <div className="animate-translate-y-up flex flex-col gap-y-14">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-4">
                <h1 className="text-3xl font-changa">{isUpdating ? 'Update' : 'Create'} Concert</h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-14">
              <div className="flex flex-col gap-y-8 w-full">
                <AdminInput
                  name="name"
                  value={concert?.inputs?.name}
                  onChange={handleInput}
                  label="Name*"
                  error={concert?.errors?.name}
                />
                <AdminSelect
                  name="type"
                  value={concert?.inputs?.type}
                  onChange={handleInput}
                  label="Concert Type*"
                  list={['Choose One', 'Season', 'Add-On', 'Sundays-at-Neel']}
                  error={concert?.errors?.type}
                />
                <AdminTextarea
                  name="pressRelease"
                  value={concert?.inputs?.pressRelease}
                  onChange={handleInput}
                  label="Press release*"
                  rows={4}
                  error={concert?.errors?.pressRelease}
                />
                <AdminTextarea
                  name="description"
                  value={concert?.inputs?.description}
                  onChange={handleInput}
                  label="Description*"
                  error={concert?.errors?.description}
                />
                <AdminTextarea
                  name="allSeriesExternalLink"
                  value={concert?.inputs?.allSeriesExternalLink}
                  onChange={handleInput}
                  label="Audience View All Series Link*"
                  error={concert?.errors?.allSeriesExternalLink}
                  rows={2}
                />
                <AdminTextarea
                  name="cardDate"
                  value={concert?.inputs?.cardDate}
                  onChange={handleInput}
                  label="Card date*"
                  error={concert?.errors?.cardDate}
                  rows={2}
                />
              </div>
              <div className="flex flex-col gap-y-7 w-full">
                <AdminFormPhoto
                  name={concert?.inputs?.file?.name}
                  filename={concert?.inputs?.imageFilename}
                  handleFileChange={handleFileChange}
                  color="text-pink-400"
                  error={concert?.errors?.imageUrl}
                />
                <div className="flex flex-col gap-y-1">
                  <div className="font-bold text-sm">Concert Details</div>
                  <button
                    onClick={() => openConcertDetailsDrawer()}
                    type="button"
                    className="w-fit px-5 py-3.5 uppercase font-medium rounded-md bg-zinc-700 text-white flex items-center justify-center gap-x-2 mb-4 font-changa text-12"
                  >
                    Add Where & When
                    <AwesomeIcon icon={plusIcon} className="w-2.5 h-2.5 text-white" />
                  </button>
                  {concert?.errors?.eventDetails && (
                    <div className="text-blaze text-sm font-lato">{concert?.errors?.eventDetails}</div>
                  )}
                </div>
                <AdminConcertDetailsList
                  concert={concert}
                  removeConcertDetails={removeConcertDetails}
                  setInputs={setInputs}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 mt-10 justify-center">
            <AdminFormBtns
              close={() => {
                dispatch(resetForm('concert'))
                dispatch(closeDrawer())
              }}
              loading={loading}
              isUpdating={isUpdating}
              btnColor="bg-pink-400"
              spinnerTrack="text-pink-400"
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default ConcertForm
