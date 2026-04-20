import { Modal } from '@components/layout/modal';
import { Button } from '@components/ui/button';
import clsx from 'clsx';

type Props = {
   open?: boolean;
   item?: ClipboardHistory;
   onHide?: () => void;
};

export const ViewModal = ({ open, item, onHide }: Props) => {
   return (
      <Modal open={open} onHide={onHide} name='view-modal' className='h-[90vh]'>
         <div className='flex items-center justify-between pb-4'>
            <h2 className='text-lg font-semibold text-blue-500'>
               Full Content
            </h2>

            <Button leftIcon='MaterialSymbolsCloseRounded' onClick={onHide} />
         </div>

         <div
            className={clsx(
               'bg-box rounded-xl p-4 overflow-auto',
               'break-all whitespace-pre-wrap',
            )}
         >
            {item?.isImage && (
               <img alt='' src={item.value} className='max-w-full' />
            )}
            {!item?.isImage && <pre>{item?.value}</pre>}
         </div>
      </Modal>
   );
};
