import { useAppStore } from '@stores/app-store';
import clsx from 'clsx';
import { Button } from './button';
import { defaultTheme } from '@configs/constants';

type Props = {
   onAdd: () => void;
};

export const SelectTheme = ({ onAdd }: Props) => {
   const { themeCollection, setAppState, theme } = useAppStore();

   return (
      <div className='min-w-40 flex flex-col gap-4'>
         {Object.keys(themeCollection).map((themeName) => (
            <div key={themeName} className='flex items-center gap-2'>
               <Button
                  leftIcon='FluentColorLightbulbFilament24'
                  content={`${themeName[0].toUpperCase()}${themeName.slice(1)}`}
                  variant='transparent'
                  schema='text'
                  className='flex-1'
                  leftIconClassname={clsx({
                     'grayscale-0': theme === themeName,
                     grayscale: theme !== themeName,
                  })}
                  onClick={() => {
                     setAppState({
                        theme: themeName,
                     });
                  }}
               />

               {theme !== themeName &&
                  !Object.keys(defaultTheme).includes(themeName) && (
                     <Button
                        leftIcon='MaterialSymbolsCloseRounded'
                        variant='transparent'
                        onClick={() => {
                           delete themeCollection[themeName];

                           setAppState(themeCollection);
                        }}
                     />
                  )}
            </div>
         ))}

         <Button content='Add theme' className='mt-4' onClick={onAdd} />
      </div>
   );
};
