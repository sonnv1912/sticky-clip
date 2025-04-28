import clsx from 'clsx';
import type { KeyboardEvent } from 'react';

export type InputProps = {
   value?: string | number;
   containerClassName?: string;
   className?: string;
   errClassName?: string;
   errMsg?: string;
   placeholder?: string;
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

   onKeyDown,
   onChange,
}: InputProps) => {
   return (
      <div className={clsx(containerClassName, 'flex-1')}>
         <input
            value={value}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className={clsx(
               'px-2 text-paragraph bg-card rounded-md',
               'outline-box-border w-full text-sm h-10 placeholder:text-paragraph',
               className,
            )}
            onChange={(e) => {
               const target = e.target as HTMLInputElement;

               onChange?.(target.value);
            }}
         />

         <ErrorMessage errMsg={errMsg} className={errClassName} />
      </div>
   );
};
