export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  isSuperUser: boolean
  isSupporter: boolean
  role: string
  isSoundEffectsOn: boolean
  isAuthenticated: boolean
  createdAt: Date
  updatedAt: Date
}
