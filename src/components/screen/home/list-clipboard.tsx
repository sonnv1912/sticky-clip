import { HEADER_HEIGHT } from '@configs/constants';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'react-toastify';
import { ClipboardItem } from './clipboard-item';

type Props = {
   loading: boolean;
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

const emptyClipboardMessages = [
   'Oops! Your clipboard is as empty as my weekend plans. 😅',
   'Clipboard says: Nothing to paste here, buddy! 🤖',
   'Looks like your clipboard went on vacation. 🏖️',
   "No copy, no paste — that's the rule! 📋❌",
   'Clipboard is feeling empty... just like my coffee cup! ☕😜',
   'Nothing here! Try copying something first. 📋👈',
   'Your clipboard is emptier than my fridge. 🧊😂',
];

const getRandomEmptyClipboardMessage = () => {
   const index = Math.floor(Math.random() * emptyClipboardMessages.length);
   return emptyClipboardMessages[index];
};

export const ListClipboard = ({ loading, items, fetchHistory }: Props) => {
   return (
      <motion.div
         animate={{ scale: 1, opacity: 1 }}
         style={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
         }}
         className={clsx('mt-14 flex flex-col gap-6 p-4 overflow-auto')}
      >
         <AnimatePresence mode='popLayout' initial={true}>
            {items.length === 0 && !loading && (
               <code className='p-10 text-center text-paragraph'>
                  {getRandomEmptyClipboardMessage()}
               </code>
            )}

            {items.map((item) => (
               <ClipboardItem
                  key={item.id}
                  data={item}
                  onClick={() => {
                     window.clipboard.copyItem(item);

                     fetchHistory();

                     toast.success('Copied to clipboard');
                  }}
                  onMarked={() => {
                     window.clipboard.updateItem({
                        ...item,
                        marked: !item.marked,
                     });

                     fetchHistory();
                  }}
               />
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
