import { languages } from '@packages/configs/constants';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

type Props = {
   className?: string;
   imgClassName?: string;
};

export const LanguageSwitcher = ({ className, imgClassName }: Props) => {
   const { i18n } = useTranslation();

   return (
      <div
         className={clsx(
            'flex cursor-pointer select-none items-center justify-center',
            className,
         )}
         onClick={() => {
            if (i18n.language === languages.vn.code) {
               i18n.changeLanguage(languages.us.code);

               localStorage.setItem('i18n', languages.us.code);

               return;
            }

            if (i18n.language === languages.us.code) {
               i18n.changeLanguage(languages.vn.code);

               localStorage.setItem('i18n', languages.vn.code);

               return;
            }
         }}
      >
         <img
            alt=''
            src={languages[i18n.language].image}
            className={clsx(imgClassName)}
         />
      </div>
   );
};

