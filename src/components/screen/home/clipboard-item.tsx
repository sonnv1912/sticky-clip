import { Button } from '@components/ui/button';
import clsx from 'clsx';

type Props = {
   data: ClipboardHistory;
   onMarked: () => void;
};

export const ClipboardItem = ({ data, onMarked }: Props) => {
   return (
      <div
         className={clsx(
            'p-3 bg-card rounded-xl cursor-pointer break-all select-none text-sm text-paragraph',
            'hover:shadow-5 transition-all duration-300 border border-box-border relative z-1',
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
            onClick={() => {
               onMarked();
            }}
            className={clsx('absolute -top-2 -right-2 z-10', {
               grayscale: !data.marked,
               'grayscale-0': data.marked,
            })}
         />
      </div>
   );
};
