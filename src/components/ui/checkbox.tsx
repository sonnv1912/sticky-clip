import clsx from 'clsx';

type Props = {
   checked: boolean;
   onChange: (checked: boolean) => void;
   className?: string;
};

export const Checkbox = ({ checked, onChange, className }: Props) => {
   return (
      <button
         type='button'
         className={clsx(
            'relative h-5 w-5 rounded border transition-colors',
            checked
               ? 'border-blue-500 bg-blue-500'
               : 'border-gray-500 bg-transparent hover:border-blue-400',
            className
         )}
         onClick={() => onChange(!checked)}
      >
         {checked && (
            <svg
               className='absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white'
               fill='none'
               stroke='currentColor'
               viewBox='0 0 24 24'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M4 12l6 6 10-10'
               />
            </svg>
         )}
      </button>
   );
};
