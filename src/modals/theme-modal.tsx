import { Modal } from '@components/layout/modal';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { defaultTheme } from '@configs/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '@stores/app-store';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

type Props = {
   open?: boolean;
   onHide?: () => void;
};

export const ThemeModal = ({ open, onHide }: Props) => {
   const { themeCollection, setAppState } = useAppStore();

   const { control, handleSubmit, reset } = useForm({
      resolver: zodResolver(
         z.object({
            name: z
               .string()
               .min(1, 'Required')
               .refine(
                  (value) =>
                     !Object.keys(defaultTheme).includes(value.toLowerCase()),
                  'This is base theme cannot override',
               ),
            'box-border': z.string().min(1, 'Required'),
            'shadow-blur-10': z.string().min(1, 'Required'),
            'sub-paragraph': z.string().min(1, 'Required'),
            background: z.string().min(1, 'Required'),
            box: z.string().min(1, 'Required'),
            card: z.string().min(1, 'Required'),
            fade: z.string().min(1, 'Required'),
            paragraph: z.string().min(1, 'Required'),
         }),
      ),
   });

   const onSubmit = handleSubmit((form) => {
      const theme = { ...form };

      delete theme.name;

      setAppState({
         themeCollection: {
            ...themeCollection,
            [form.name]: theme,
         },
      });

      onHide?.();
   });

   useEffect(() => {
      reset({
         name: '',
         'box-border': '',
         'shadow-blur-10': '',
         'sub-paragraph': '',
         background: '',
         box: '',
         card: '',
         fade: '',
         paragraph: '',
      });
   }, [reset]);

   return (
      <Modal
         open={open}
         onHide={onHide}
         className='grid gap-4'
         name='theme-modal'
      >
         <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
               <Input
                  placeholder='Theme name'
                  value={field.value}
                  errMsg={fieldState.error?.message}
                  onChange={field.onChange}
               />
            )}
         />

         {Object.keys(themeCollection.dark).map((key) => (
            <Controller
               key={key}
               control={control}
               name={key as keyof ThemeValue}
               render={({ field, fieldState }) => (
                  <Input
                     placeholder={key}
                     type='color'
                     value={field.value}
                     errMsg={fieldState.error?.message}
                     onChange={field.onChange}
                  />
               )}
            />
         ))}

         <Button content='Save' className='mt-4' onClick={onSubmit} />
      </Modal>
   );
};
