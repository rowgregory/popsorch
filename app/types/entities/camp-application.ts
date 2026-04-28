import { Prisma } from '@prisma/client'

export type FullApplication = Prisma.CampApplicationGetPayload<{
  include: { Student: true; Address: true; Parent: true }
}>
