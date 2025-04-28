import React, { FC, useRef } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { uploadIcon } from '@/app/lib/icons'

const AdminFormPhoto: FC<{ name: string; filename: string; handleFileChange: any; color?: string; error?: string }> = ({
  name,
  filename,
  handleFileChange,
  color,
  error
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor="imageUrl" className="font-lato text-sm">
        Photo
      </label>
      <button
        onClick={() => inputRef?.current?.click()}
        type="button"
        className="w-fit px-5 py-3.5 uppercase font-medium rounded-md bg-zinc-700 text-white flex items-center justify-center gap-x-2 mb-2 font-changa text-12"
      >
        Upload Photo
        <AwesomeIcon icon={uploadIcon} className="w-2 h-2 text-white" />
      </button>
      {(name || filename) && <h4 className={`${color ?? ''} text-sm`}>{name || filename}</h4>}
      {error && <h4 className={`text-blaze text-sm font-lato`}>{error}</h4>}
      <input
        id="imageUrl"
        name="imageUrl"
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default AdminFormPhoto
