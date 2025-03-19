import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { TextPair } from '../components/ui/text-pair';
import { settingSchema } from '../schemas/setting-schema';
import { Modal } from '../components/layout/modal';

type Props = {
   open: boolean;
   onHide: () => void;
   onSuccess: () => void;
};

const SettingModalBody = ({ onSuccess }: Props) => {
   const { control, reset, formState, handleSubmit } = useForm({
      resolver: zodResolver(settingSchema),
      defaultValues: {
         maxItem: 100,
         shortcut: 'Control+Shift+V',
      },
   });

   const onSubmit = handleSubmit((data) => {
      window.app.updateSetting(data);

      onSuccess();
   });

   useEffect(() => {
      const getApp = async () => {
         const response = await window.app.setting();

         reset(response);
      };

      getApp();
   }, [reset]);

   return (
      <>
         <div className='flex flex-col gap-5'>
            <TextPair label='Maximum item'>
               <Controller
                  control={control}
                  name='maxItem'
                  render={({ field, fieldState }) => (
                     <Input
                        className='text-right'
                        containerClassName='text-right'
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={(value) => field.onChange(Number(value))}
                     />
                  )}
               />
            </TextPair>

            <TextPair label='Shortcut'>
               <Controller
                  control={control}
                  name='shortcut'
                  render={({ field, fieldState }) => (
                     <Input
                        className='text-right'
                        containerClassName='text-right'
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
            </TextPair>
         </div>

         <div className='flex items-center justify-end mt-7'>
            <Button
               content='Save'
               className='self-end'
               disable={!formState.isValid}
               onClick={onSubmit}
            />
         </div>
      </>
   );
};

export const SettingModal = (props: Props) => {
   return (
      <Modal onHide={props.onHide} open={props.open}>
         <SettingModalBody {...props} />
      </Modal>
   );
};
