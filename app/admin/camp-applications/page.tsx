import { getCampApplications } from '@/app/actions/getCampApplication'
import CampApplicationsClient from '../../components/pages/CampApplicationsClient'
import { getCampApplicationsSetting } from '@/app/actions/getCampApplicationsSetting'

export default async function CampApplicationsPage() {
  const data = await getCampApplications()
  const campApplicationsSetting = await getCampApplicationsSetting()
  return <CampApplicationsClient data={data} setting={campApplicationsSetting} />
}
