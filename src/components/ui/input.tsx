import clsx from 'clsx';

type Props = {
   value?: string | number;
   containerClassName?: string;
   className?: string;
   errClassName?: string;
   errMsg?: string;
   placeholder?: string;
   onChange?: (value: string) => void;
};

type ErrorMessageProps = {
   className?: string;
   errMsg?: string;
};

export const ErrorMessage = ({ errMsg, className }: ErrorMessageProps) => {
   return (
      errMsg && (
         <p className={clsx('text-sm text-red-500', className)}>{errMsg}</p>
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
   onChange,
}: Props) => {
   return (
      <div className={clsx(containerClassName, 'flex-1')}>
         <input
            value={value}
            placeholder={placeholder}
            className={clsx(
               'p-2 text-white bg-gray-500 rounded-md border border-gray-400',
               'outline-0 focus:border-sky-600 w-full text-sm',
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
