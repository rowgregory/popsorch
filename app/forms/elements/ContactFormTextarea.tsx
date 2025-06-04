import React, { FC } from 'react'

interface ContactFormTextareaProps {
  name: string
  value: string
  onChange: any
  placeholder: string
  error?: string
}

const ContactFormTextarea: FC<ContactFormTextareaProps> = ({ name, value, onChange, placeholder, error }) => {
  return (
    <textarea
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      className={`camp-input bg-transparent border-1 text-white py-3 px-8 placeholder:text-white placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent ${
        error ? 'border-blaze hover:border-blazehover' : 'border-[#b2b2b2] hover:border-zinc-300 focus:border-zinc-300'
      }`}
      placeholder={placeholder}
      rows={6}
    ></textarea>
  )
}

export default ContactFormTextarea
