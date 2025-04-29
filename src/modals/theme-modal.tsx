import { Modal } from '@components/layout/modal';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { TextPair } from '@components/ui/text-pair';
import { Toast } from '@components/ui/toast';
import { defaultTheme } from '@configs/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '@stores/app-store';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

type Props = {
   open?: boolean;
   onHide?: () => void;
};

const defaultForm: ThemeValue & { name: string } = {
   name: window.app.isDev ? 'test' : '',
   'box-border': window.app.isDev ? '#fff' : '',
   'shadow-blur-10': window.app.isDev ? '#fff' : '',
   'sub-paragraph': window.app.isDev ? '#fff' : '',
   background: window.app.isDev ? '#fff' : '',
   box: window.app.isDev ? '#fff' : '',
   card: window.app.isDev ? '#fff' : '',
   fade: window.app.isDev ? '#fff' : '',
   paragraph: window.app.isDev ? '#fff' : '',
};

export const ThemeModal = ({ open, onHide }: Props) => {
   const { themeCollection, setAppState } = useAppStore();

   const { control, handleSubmit, reset } = useForm({
      defaultValues: defaultForm,
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

      toast(<Toast message='Your theme has added' />);

      onHide?.();
   });

   useEffect(() => {
      reset(defaultForm);
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
               <TextPair label='name'>
                  <Input
                     value={field.value}
                     errMsg={fieldState.error?.message}
                     onChange={field.onChange}
                  />
               </TextPair>
            )}
         />

         {Object.keys(themeCollection.dark).map((key) => (
            <Controller
               key={key}
               control={control}
               name={key as keyof ThemeValue}
               render={({ field, fieldState }) => (
                  <TextPair label={key}>
                     <Input
                        type='color'
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  </TextPair>
               )}
            />
         ))}

         <div className='flex items-center mt-4 gap-4'>
            <Button className='flex-1' content='Cancel' onClick={onHide} />

            <Button
               className='flex-1'
               content='Save'
               schema='blue'
               onClick={onSubmit}
            />
         </div>
      </Modal>
   );
};
