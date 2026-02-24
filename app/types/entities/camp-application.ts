export interface CampApplication {
  id: string
  student?: Student
  address?: Address
  parent?: Parent
  consent: boolean
  musicTeacher?: string
  strings?: string
  brassAndPercussion?: string
  woodwinds?: string
  referralSource?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  grade: string
  school: string
  studentEmailAddress: string
  studentPhoneNumber: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}

export interface Address {
  id: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  zipPostalCode?: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}

export interface Parent {
  id: string
  firstName: string
  lastName: string
  relationshipToStudent?: string
  parentEmailAddress: string
  parentPhoneNumber: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}
