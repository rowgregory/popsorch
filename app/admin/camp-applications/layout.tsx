import { getCampApplications } from '@/app/actions/getCampApplication'
import CampApplications from './page'

export default async function CampApplicationsLayout() {
  const data = await getCampApplications()

  return <CampApplications data={data} />
}
