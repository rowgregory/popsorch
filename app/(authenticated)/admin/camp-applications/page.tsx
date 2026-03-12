import { getCampApplications } from '@/app/actions/getCampApplications'
import { getCampApplicationsSetting } from '@/app/actions/getCampApplicationsSetting'
import CampApplicationsClient from '@/app/components/pages/CampApplicationsClient'

export default async function CampApplicationsPage() {
  const data = await getCampApplications()
  const campApplicationsSetting = await getCampApplicationsSetting()
  return <CampApplicationsClient data={data} setting={campApplicationsSetting} />
}
