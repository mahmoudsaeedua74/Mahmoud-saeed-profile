'use client';

import type { ProjectComparison } from '@/app/data/store-project-details';
import {
  getComparisonViewports,
  hasComparisonContent,
} from '@/app/data/store-project-details';
import ProjectCompare from './ProjectCompare';
import { storeLabels } from '@/lib/store-labels';

type Props = {
  comparison: ProjectComparison;
  projectTitle: string;
};

export default function ModificationCompare({ comparison, projectTitle }: Props) {
  const c = storeLabels.projectDetail.compare;
  const viewports = getComparisonViewports(comparison);

  if (!hasComparisonContent(comparison)) {
    return null;
  }

  if (viewports.length === 1 && viewports[0].id === 'single') {
    const vp = viewports[0];
    if (!vp.afterImage) return null;
    return (
      <ProjectCompare
        beforeSrc={vp.beforeImage}
        afterSrc={vp.afterImage}
        beforeAlt={`${projectTitle} — ${c.before}`}
        afterAlt={`${projectTitle} — ${c.after}`}
      />
    );
  }

  const readyViewports = viewports.filter((vp) => vp.afterImage);

  if (!readyViewports.length) return null;

  return (
    <div className="space-y-8 sm:space-y-10">
      {readyViewports.map((vp) => (
        <div key={vp.id}>
          <p className="type-body-sm mb-3 font-bold uppercase tracking-wider text-indigo-400/80">
            {vp.id === 'desktop'
              ? storeLabels.projectDetail.viewportDesktop
              : storeLabels.projectDetail.viewportMobile}
          </p>
          <ProjectCompare
            fitContent
            beforeSrc={vp.beforeImage}
            afterSrc={vp.afterImage}
            beforeAlt={`${projectTitle} — ${c.before}`}
            afterAlt={`${projectTitle} — ${c.after}`}
          />
        </div>
      ))}
    </div>
  );
}
