import { useClickOutside } from '@/hooks/use-click-outside';
import clsx from 'clsx';
import { useRef, useState, type KeyboardEvent } from 'react';
import { RgbaColorPicker } from 'react-colorful';

export type InputProps = {
   value?: string | number;
   containerClassName?: string;
   className?: string;
   errClassName?: string;
   errMsg?: string;
   placeholder?: string;
   type?: 'text' | 'color';

   onChange?: (value: string) => void;
   onKeyDown?: (value: KeyboardEvent<HTMLInputElement>) => void;
};

type ErrorMessageProps = {
   className?: string;
   errMsg?: string;
};

export const ErrorMessage = ({ errMsg, className }: ErrorMessageProps) => {
   return (
      errMsg && (
         <p className={clsx('text-xs text-red-500 mt-1', className)}>
            {errMsg}
         </p>
      )
   );
};

export const Input = ({
   value,
   containerClassName,
   errClassName,
   className,
   errMsg,
   placeholder,
   type,

   onKeyDown,
   onChange,
}: InputProps) => {
   const inputColorRef = useRef<HTMLDivElement>(null);

   const [showColor, setShowColor] = useState(false);

   useClickOutside(inputColorRef, () => {
      setShowColor(false);
   });

   return (
      <div className='flex-1 w-full'>
         <div
            className={clsx(
               'bg-card flex items-center rounded-md h-10 text-sm text-paragraph px-2',
               'gap-2 relative border border-transparent focus-within:border-box-border',
               containerClassName,
            )}
         >
            {type === 'color' && (
               <div
                  className='size-7 rounded-md border border-box-border'
                  style={{
                     backgroundColor: value.toString(),
                  }}
               />
            )}

            <input
               value={value}
               placeholder={placeholder}
               onKeyDown={onKeyDown}
               className={clsx(
                  'placeholder:text-sub-paragraph px-2 h-full flex-1 outline-none',
                  className,
               )}
               onFocus={() => {
                  setShowColor(true);
               }}
               onChange={(e) => {
                  const target = e.target as HTMLInputElement;

                  onChange?.(target.value);
               }}
            />

            {type === 'color' && showColor && (
               <div
                  ref={inputColorRef}
                  className='absolute top-full left-0 z-10'
               >
                  <RgbaColorPicker
                     onChange={(e) => {
                        onChange(`rgba(${e.r},${e.g},${e.b},${e.a})`);
                     }}
                  />
               </div>
            )}
         </div>

         <ErrorMessage errMsg={errMsg} className={errClassName} />
      </div>
   );
};
