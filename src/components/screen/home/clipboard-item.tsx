import { Button } from '@components/ui/button';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {
   data: ClipboardHistory;
   active?: boolean;
};

export const ClipboardItem = ({ data, active }: Props) => {
   return (
      <div
         className={twMerge(
            clsx(
               'p-3 bg-card rounded-xl cursor-pointer break-all select-none text-sm text-paragraph',
               'hover:shadow-blur-10  transition-all duration-300 border border-box-border relative z-1',
               {
                  'shadow-blur-10': active,
               },
            ),
         )}
      >
         {data.isImage && (
            <img alt='' src={data.value} className='rounded-xl mx-auto' />
         )}

         {!data.isImage && <pre>{data.value}</pre>}

         <Button
            variant='transparent'
            leftIcon='NotoStar'
            iconSize={16}
            className={clsx('absolute -top-2 -right-2 z-10', {
               grayscale: !data.marked,
               'grayscale-0': data.marked,
            })}
         />
      </div>
   );
};
