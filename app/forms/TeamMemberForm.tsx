import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import AdminInput from './elements/AdminInput'
import AdminFormPhoto from '../components/admin/AdminFormPhoto'
import AdminSelect from './elements/AdminSelect'
import AdminTextarea from './elements/AdminTextarea'
import AdminFormBtns from '../components/admin/AdminFormBtns'
import { motion } from 'framer-motion'

const containerVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

const TeamMemberForm: FC<{ handleSubmit: any; loading: boolean }> = ({ handleSubmit, loading }) => {
  const dispatch = useAppDispatch()
  const { teamMember } = useAppSelector((state: RootState) => state.form)
  const { isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { handleInput, handleFileChange } = createFormActions('teamMember', dispatch)

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto h-full flex items-center flex-col max-h-1000:justify-start justify-center  max-h-1000:my-20"
    >
      <div className="flex flex-col w-full max-w-4xl">
        <motion.div variants={itemVariants} className="flex flex-col gap-y-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-y-3 pb-6 border-b border-neutral-700">
            <div className="flex items-center gap-x-4">
              <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
              <h1 className="text-4xl font-changa text-white font-light tracking-wide">
                {isUpdating ? 'Update' : 'Create'} Team Member
              </h1>
            </div>
            <p className="text-neutral-400 text-sm ml-6">
              {isUpdating ? 'Update the team member information below' : 'Add a new team member to your organization'}
            </p>
          </motion.div>

          {/* Form Fields */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
            {/* Left Column */}
            <motion.div variants={itemVariants} className="flex flex-col gap-y-6 w-full">
              <motion.div variants={itemVariants}>
                <AdminInput
                  name="firstName"
                  value={teamMember?.inputs?.firstName}
                  onChange={handleInput}
                  label="First Name*"
                  error={teamMember?.errors?.firstName}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AdminInput
                  name="lastName"
                  value={teamMember?.inputs?.lastName}
                  onChange={handleInput}
                  label="Last Name*"
                  error={teamMember?.errors?.lastName}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AdminInput
                  name="position"
                  value={teamMember?.inputs?.position}
                  onChange={handleInput}
                  label="Position*"
                  error={teamMember?.errors?.position}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AdminSelect
                  name="role"
                  value={teamMember?.inputs?.role}
                  onChange={handleInput}
                  list={['Choose One', 'Board-Member', 'Staff']}
                  error={teamMember?.errors?.role}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AdminFormPhoto
                  name={teamMember?.inputs?.file?.name}
                  filename={teamMember?.inputs?.imageFilename}
                  handleFileChange={handleFileChange}
                  color="text-purple-400"
                  error={teamMember?.errors?.imageUrl}
                />
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariants} className="flex flex-col mt-8 lg:mt-0 w-full">
              <motion.div variants={itemVariants}>
                <AdminTextarea
                  name="bio"
                  value={teamMember?.inputs?.bio}
                  onChange={handleInput}
                  label="Bio*"
                  subLabel="Sqysh will turn your sentences into bullet points—just add a pipe ( | ) after each period so I know where to split them."
                  rows={18}
                  error={teamMember?.errors?.bio}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-y-3 items-center gap-x-4 mt-12 pt-8 border-t border-neutral-700 justify-center"
        >
          <AdminFormBtns
            close={() => {
              dispatch(resetForm('teamMember'))
              dispatch(closeDrawer())
            }}
            loading={loading}
            isUpdating={isUpdating}
            btnColor="bg-purple-500"
            spinnerTrack="text-purple-500"
          />
        </motion.div>
      </div>
    </motion.form>
  )
}

export default TeamMemberForm
