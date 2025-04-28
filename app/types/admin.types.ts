import { Inputs } from '../hooks/useForm'

export interface ConcertFormProps {
  inputs: Inputs | any
  submitted: boolean
  error: string
  setSteps: (steps: any) => void
  setInputs: any
  handleInput: any
}
