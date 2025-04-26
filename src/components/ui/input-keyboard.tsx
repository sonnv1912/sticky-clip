import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, type InputProps } from './input';

export const InputKeyboard = (props: InputProps) => {
   const [keys, setKeys] = useState<string[]>([]);

   useEffect(() => {
      if (typeof props.value === 'string') {
         const items = props.value.split(' + ');

         setKeys(items);
      }
   }, [props.value]);

   const isMac = window.navigator.userAgentData?.platform
      .toLowerCase()
      .includes('mac');

   const controlsKeys = useMemo<Record<string, { key: string; name: string }>>(
      () => ({
         META: {
            key: 'CommandOrControl',
            name: isMac ? '⌘' : 'Ctrl',
         },
         CommandOrControl: {
            key: 'CommandOrControl',
            name: isMac ? '⌘' : 'Ctrl',
         },
         SHIFT: {
            key: 'Shift',
            name: isMac ? '⇧' : 'Shift',
         },
         ALT: {
            key: 'Alt',
            name: isMac ? '⌥' : 'Alt',
         },
         CONTROL: {
            key: 'Control',
            name: isMac ? '⌃' : 'Ctrl',
         },
      }),
      [isMac],
   );

   const getValue = useCallback(
      (mode: 'key' | 'name', items = keys) => {
         const result = items.map((key) => {
            return controlsKeys[key as keyof typeof controlsKeys]
               ? controlsKeys[key as keyof typeof controlsKeys][mode]
               : key;
         });

         return result.join(' + ');
      },
      [keys, controlsKeys],
   );

   return (
      <Input
         {...props}
         value={getValue('name')}
         onChange={undefined}
         onKeyDown={(e) => {
            const result = e.key.toUpperCase();
            let items = [result];

            if (keys.length < 3) {
               items = [...keys, result];
            }

            setKeys(items);

            if (keys.length > 1) {
               props.onChange?.(getValue('key', items));
            }
         }}
      />
   );
};
