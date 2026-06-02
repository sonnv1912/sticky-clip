import 'github-markdown-css/github-markdown.css';

import { useGetRelease } from '@packages/hooks/query';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { env } from '@packages/configs/env';
import { Loading } from '@packages/components/ui';

export const StickyClipChangelogPage = () => {
   const releasesQuery = useGetRelease(env.repo.stickyClip.name);
   const { t } = useTranslation();

   return (
      <div className={clsx('relative mx-auto mt-10')}>
         <div>
            <div
               className={clsx(
                  'flex gap-10 justify-center',
                  'md:justify-normal',
               )}
            >
               <div className={clsx('w-28 hidden', 'md:block')} />

               <p className={clsx('font-bold text-5xl')}>
                  {t('page:sticky_clip:home.changelog')}
               </p>
            </div>

            <Loading loading={releasesQuery.isLoading} />

            <div className='mt-20 flex flex-col gap-40'>
               {releasesQuery.data?.data?.map((release) => (
                  <div
                     key={release.id}
                     className={clsx('flex gap-8 flex-col', 'md:flex-row')}
                  >
                     <div className='flex w-28 flex-col gap-4 text-sm'>
                        <p className='w-fit rounded-md bg-stickyclip-500/50 px-4 py-1 text-center text-stickyclip-300'>
                           {release.tag_name}
                        </p>

                        <p className='text-woodsmoke-300'>
                           {moment(release.created_at).format('MMM DD, yyyy')}
                        </p>
                     </div>

                     <div
                        className='markdown-body mt-10 flex-1'
                        style={{ backgroundColor: 'transparent' }}
                     >
                        <Markdown
                           components={{
                              a: (props) => {
                                 return <a {...props} target='_blank' />;
                              },
                              ul: (props) => {
                                 return <ul {...props} className='list-disc' />;
                              },
                           }}
                        >
                           {release.body}
                        </Markdown>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
