import { StickyClipChangelogPage } from '@/pages/sticky-clip/changelog-page';
import { StickyClipHomePage } from '@/pages/sticky-clip/home-page';
import { StickyClipTeamsPage } from '@/pages/sticky-clip/teams-page';
import { useNavigator } from '@hooks/use-navigator';
import { StickyClipLayout } from '@layouts/sticky-clip-layout';
import { AnimatedPage } from '@packages/components/ui';
import { type ReactElement, useMemo } from 'react';

export const StickyClipNavigator = () => {
   const {
      query: { tab },
   } = useNavigator();

   const tabs = useMemo<Record<string, ReactElement>>(
      () => ({
         home: <StickyClipHomePage />,
         changelog: <StickyClipChangelogPage />,
         teams: <StickyClipTeamsPage />,
      }),
      [],
   );

   const shouldShow = useMemo(() => {
      return Object.keys(tabs).includes(tab);
   }, [tab, tabs]);

   if (!shouldShow) {
      return null;
   }

   return (
      <StickyClipLayout>
         <AnimatedPage key={tab}>{tabs[tab]}</AnimatedPage>
      </StickyClipLayout>
   );
};
