import { MacosMenuBar } from '@components/ui/macos-menu-bar';
import { images } from '@packages/assets/images';
import clsx from 'clsx';
import { useEffect } from 'react';

export const Overview = () => {
   useEffect(() => {
      // VANTA.NET({
      //    el: '#overview',
      //    mouseControls: false,
      //    touchControls: false,
      //    gyroControls: false,
      //    minHeight: 200.0,
      //    minWidth: 200.0,
      //    scale: 1,
      //    scaleMobile: 1,
      //    color: '#27b5e9',
      //    backgroundColor: '#0b0c0d',
      // });
   }, []);

   return (
      <div
         className={clsx(
            'p-2 border border-woodsmoke-800 z-10 relative rounded-2xl',
         )}
      >
         <div
            id='overview'
            className={clsx(
               'bg-black rounded-2xl overflow-hidden border border-woodsmoke-700 relative',
            )}
            style={{
               boxShadow: '0 0 70px 0 rgba(255,255,255,0.3)',
            }}
         >
            <MacosMenuBar />

            <div className='px-4 pt-4 pb-2'>
               <img src={images.Overview} alt='' className='mx-auto' />

               <div
                  className={clsx(
                     'flex items-center w-fit mx-auto rounded-2xl p-2 bg-woodsmoke-950/50',
                     'border border-woodsmoke-600 mt-7 gap-3 backdrop-blur-xs',
                  )}
               >
                  <img src={images.Finder} alt='' className='size-10' />

                  <div className='flex items-center justify-center rounded-lg bg-white size-10'>
                     <img src={images.Clipboard} alt='' className='size-7' />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
