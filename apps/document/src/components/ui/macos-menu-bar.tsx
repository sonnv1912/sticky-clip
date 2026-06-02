import { images } from '@packages/assets/images';
import clsx from 'clsx';
import { IoIosWifi, IoLogoApple } from 'react-icons/io';

export const MacosMenuBar = () => {
   return (
      <div
         className={clsx(
            'flex justify-between bg-black/40 backdrop-blur-xs text-woodsmoke-300 text-sm',
            'p-4',
         )}
      >
         <div className='flex items-center gap-5 '>
            <IoLogoApple size={22} />

            <p>Finder</p>

            <p>File</p>

            <p>Edit</p>

            <p>View</p>

            <p>Go</p>

            <p>Window</p>

            <p>Help</p>
         </div>

         <div className='flex items-center gap-3'>
            <img alt='' src={images.Clipboard} className='size-5' />

            <IoIosWifi size={22} />

            <p>Thu 17 Apr</p>

            <p>09:54</p>
         </div>
      </div>
   );
};
