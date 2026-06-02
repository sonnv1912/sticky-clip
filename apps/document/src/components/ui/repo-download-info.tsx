import type { env } from '@packages/configs/env';
import { useLatestRelease } from '@stores/use-latest-release';
import clsx from 'clsx';
import { t } from 'i18next';
import { FaApple, FaWindows } from 'react-icons/fa';
import { Divider } from '@packages/components/ui';
import { isMac, isWin } from '@packages/configs/constants';

type Props = {
   repo: keyof typeof env.repo;
};

export const RepoDownloadInfo = ({ repo }: Props) => {
   const { getMacDownload, getWinDownload, ...rest } = useLatestRelease();

   return (
      <div>
         <div
            className={clsx('text-black', 'lg:flex lg:items-center lg:gap-4')}
         >
            <a
               href={getMacDownload(repo)}
               target='_blank'
               className={clsx(
                  'flex cursor-pointer items-center gap-2 rounded-md p-2 px-3 text-sm transition-all duration-500',
                  {
                     'border border-woodsmoke-300 text-woodsmoke-300 hover:border-white hover:text-white':
                        !isMac,
                     'bg-woodsmoke-100 hover:bg-white': isMac,
                  },
               )}
               rel='noreferrer'
            >
               <FaApple size={18} />

               <p>{t('common:action.download_for_mac')}</p>
            </a>

            <a
               href={getWinDownload(repo)}
               target='_blank'
               className={clsx(
                  'flex cursor-pointer items-center gap-2 rounded-md p-2 px-3 text-sm transition-all duration-500',
                  {
                     'border border-woodsmoke-300 text-woodsmoke-300 hover:border-white hover:text-white':
                        !isWin,
                     'bg-woodsmoke-100 hover:bg-white': isWin,
                  },
               )}
               rel='noreferrer'
            >
               <FaWindows size={18} />

               <p>
                  {t(
                     getWinDownload(repo)
                        ? 'common:download_for_win'
                        : 'common:coming_soon',
                  )}
               </p>
            </a>
         </div>

         <div className='mt-4 flex items-center justify-center gap-4 text-xs text-woodsmoke-300'>
            <p>{rest[repo]?.tag_name}</p>

            <Divider />

            <p>macOS 11+</p>
         </div>
      </div>
   );
};
