import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useSearchStore } from '@stores/search-store';
import { useDebouncedCallback } from 'use-debounce';

export const HeaderSearch = () => {
   const { setSearchState } = useSearchStore();

   const debounceCallback = useDebouncedCallback((value: string) => {
      setSearchState({ query: value.toLowerCase() });
   }, 600);

   return (
      <div className='flex items-center gap-2'>
         <Input
            placeholder='Type something'
            containerClassName='focus-within:border-0 px-0 pr-2'
            autoFocus={true}
            onChange={debounceCallback}
         />

         <Button
            leftIcon='MaterialSymbolsCloseRounded'
            schema='blue'
            size='sm'
            onClick={() => {
               setSearchState({
                  mode: 'header',
                  query: '',
               });
            }}
         />
      </div>
   );
};
