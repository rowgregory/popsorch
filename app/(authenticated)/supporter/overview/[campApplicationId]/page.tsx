import { getCampApplicationById } from '@/app/lib/actions/camp-applications/getCampApplicationById'
import SupporterOverviewCampApplicationClient from '@/app/components/pages/SupporterOverviewCampApplicationClient'

export default async function SupporterOverviewCampApplicationPage({
  params
}: {
  params: Promise<{ campApplicationId: string }>
}) {
  const { campApplicationId } = await params
  const campApplication = await getCampApplicationById(campApplicationId)
  return <SupporterOverviewCampApplicationClient application={campApplication} />
}
