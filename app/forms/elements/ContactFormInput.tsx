import React, { FC } from 'react'

interface ContactFormInputProps {
  name: string
  value: string
  onChange: any
  placeholder: string
}

const ContactFormInput: FC<ContactFormInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      id={name}
      name={name}
      type="text"
      value={value || ''}
      onChange={onChange}
      className="w-full h-16 px-4 border-1 border-white text-white focus:outline-none focus:border-white bg-transparent placeholder:text-white font-raleway"
      placeholder={placeholder}
    />
  )
}

export default ContactFormInput
