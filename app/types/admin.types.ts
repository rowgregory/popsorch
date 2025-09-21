import { Inputs } from '../hooks/useForm'

export interface ConcertFormProps {
  inputs: Inputs | any
  submitted: boolean
  error: string
  setSteps: (steps: any) => void
  setInputs: any
  handleInput: any
}

export type Tag =
  | { type: 'Concert'; id: string }
  | { type: 'Concert'; id: 'LIST' }
  | { type: 'Venue'; id: string }
  | { type: 'Venue'; id: 'LIST' }
  | { type: 'Text-Block'; id: string }
  | { type: 'Text-Block'; id: 'LIST' }
  | { type: 'Photo-Gallery-Image'; id: string }
  | { type: 'Photo-Gallery-Image'; id: 'LIST' }
  | { type: 'Camp'; id: string }
  | { type: 'Camp'; id: 'LIST' }
  | { type: 'Question'; id: string }
  | { type: 'Question'; id: 'LIST' }
  | { type: 'Team-Member'; id: string }
  | { type: 'Team-Member'; id: 'LIST' }
  | { type: 'Log'; id: string }
  | { type: 'Log'; id: 'LIST' }
  | { type: 'User'; id: string }
  | { type: 'User'; id: 'LIST' }
  | { type: 'Mailchimp'; id: string }
  | { type: 'Mailchimp'; id: 'LIST' }
