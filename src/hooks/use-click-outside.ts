import { type RefObject, useEffect } from 'react';

export const useClickOutside = (
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   ref: RefObject<any>,
   handler: (e: globalThis.MouseEvent) => void,
) => {
   useEffect(() => {
      let startedInside = false;
      let startedWhenMounted = false;

      const listener = (event: globalThis.MouseEvent) => {
         if (startedInside || !startedWhenMounted) {
            return;
         }

         if (!ref.current || ref.current.contains(event.target)) {
            return;
         }

         handler(event);
      };

      const validateEventStart = (event: globalThis.MouseEvent) => {
         startedWhenMounted = ref.current;
         startedInside = ref.current?.contains(event.target);
      };

      document.addEventListener('mousedown', validateEventStart);
      document.addEventListener('touchstart', validateEventStart);
      document.addEventListener('click', listener);

      return () => {
         document.removeEventListener('mousedown', validateEventStart);
         document.removeEventListener('touchstart', validateEventStart);
         document.removeEventListener('click', listener);
      };
   }, [ref, handler]);
};
