import { Icon } from '../ui/icon';

type Props = {
   fetchHistory: () => void;
   onClickSetting: () => void;
};

export const Header = ({ fetchHistory, onClickSetting }: Props) => {
   return (
      <div className='flex items-center justify-between fixed top-0 left-0 right-0 z-10 bg-gray-800 p-4'>
         <div className='flex items-center gap-1'>
            <Icon name='FluentColorClipboard16' />

            <p className='select-none font-[b-ibm-plex-mono] text-sky-500'>
               StickyClip
            </p>
         </div>

         <div className='flex items-center gap-4'>
            <div
               className='cursor-pointer hover:opacity-80'
               onClick={onClickSetting}
            >
               <Icon name='MaterialSymbolsSettingsRounded' />
            </div>

            <div
               className='cursor-pointer hover:opacity-80'
               onClick={() => {
                  window.clipboard.clear();

                  fetchHistory();
               }}
            >
               <Icon name='MaterialSymbolsDelete' />
            </div>
         </div>
      </div>
   );
};
