import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'

export async function deleteCampApplication(id: string) {
  if (!id) return { success: false, error: 'Application ID is required' }

  const application = await prisma.campApplication
    .delete({
      where: { id }
    })
    .catch(() => null)

  if (!application) return { success: false, error: 'Failed to delete application' }

  await createLog('info', 'Camp application deleted', {
    applicationId: id
  }).catch(() => null)

  return { success: true }
}
