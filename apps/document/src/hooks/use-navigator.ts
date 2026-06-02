import { useQueryStates, parseAsString } from 'nuqs';

export const useNavigator = () => {
   const [query, setQuery] = useQueryStates({
      tab: parseAsString.withDefault('home').withOptions({
         clearOnDefault: true,
         history: 'push',
         scroll: true,
      }),
   });

   return {
      query,

      setQuery,
   };
};
