import { useAppStore } from '@stores/app-store';
import clsx from 'clsx';
import { Button } from './button';

type Props = {
   onAdd: () => void;
};

export const SelectTheme = ({ onAdd }: Props) => {
   const { themeCollection, setAppState, theme } = useAppStore();

   return (
      <div className='min-w-32 flex flex-col gap-4'>
         {Object.keys(themeCollection).map((themeName) => (
            <Button
               key={themeName}
               rightIcon='FluentColorLightbulbFilament24'
               content={`${themeName[0].toUpperCase()}${themeName.slice(1)}`}
               variant='transparent'
               schema='text'
               rightIconClassname={clsx({
                  'grayscale-0': theme === themeName,
                  grayscale: theme !== themeName,
               })}
               onClick={() => {
                  setAppState({
                     theme: themeName,
                  });
               }}
            />
         ))}

         <Button content='Add theme' className='mt-4' onClick={onAdd} />
      </div>
   );
};
