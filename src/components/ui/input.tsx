import clsx from 'clsx';
import { useRef, type KeyboardEvent } from 'react';

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
   const inputRef = useRef<HTMLInputElement>(null);

   return (
      <div className='flex-1 w-full'>
         <div
            className={clsx(
               'bg-card flex items-center rounded-md h-10 text-sm text-paragraph',
               'gap-2',
               containerClassName,
            )}
         >
            <input
               ref={inputRef}
               type={type}
               value={value}
               placeholder={placeholder}
               onKeyDown={onKeyDown}
               className={clsx(
                  'outline-box-border placeholder:text-sub-paragraph px-2 h-full',
                  {
                     'rounded-lg w-14': type === 'color',
                     'flex-1': type !== 'color',
                  },
                  className,
               )}
               onChange={(e) => {
                  const target = e.target as HTMLInputElement;

                  onChange?.(target.value);
               }}
            />

            {type === 'color' && (
               <div
                  className={clsx('flex-1', {
                     'text-sub-paragraph': !value,
                  })}
                  onClick={() => {
                     inputRef.current.click();
                  }}
               >
                  {value || placeholder}
               </div>
            )}
         </div>

         <ErrorMessage errMsg={errMsg} className={errClassName} />
      </div>
   );
};
