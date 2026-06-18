import { storeProjectDetails } from '@/app/data/store-project-details';
import StoreProjectDetailClient from '@/app/components/store/StoreProjectDetailClient';

export function generateStaticParams() {
  return storeProjectDetails.map((detail) => ({ id: detail.projectId }));
}

export default async function StoreProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StoreProjectDetailClient id={id} />;
}
