import React, { useRef } from 'react'
import Modal from '../components/common/Modal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeSeatMap } from '../redux/features/appSlice'
import RiverviewPACFirstFloorSVG from '../components/svg/RiverviewPACFirstFloorSVG'
import CloseBtnSVG from '../components/svg/CloseBtnSVG'

const SeatMapModal = () => {
  const dispatch = useAppDispatch()
  const { seatMap } = useAppSelector((state: RootState) => state.app)
  const modalRef = useRef(null)

  return (
    <Modal isOpen={seatMap} onClose={() => dispatch(closeSeatMap())}>
      <CloseBtnSVG
        onClick={() => dispatch(closeSeatMap())}
        className="absolute z-10 top-2 w-6 h-6 right-2 text-gunmetal dark:text-gray-200"
      />
      <div ref={modalRef} className="px-5 py-10 flex items-center justify-center flex-col relative">
        <h1 className="text-xl font-bold mb-6 text-center">Riverview Permorming Arts Center</h1>
        <RiverviewPACFirstFloorSVG modalRef={modalRef} />
      </div>
    </Modal>
  )
}

export default SeatMapModal
