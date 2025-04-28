import { Modal } from '@components/layout/modal';
import { Input } from '@components/ui/input';
import { useAppStore } from '@stores/app-store';

type Props = {
   open?: boolean;
};

export const ThemeModal = ({ open }: Props) => {
   const { themeCollection } = useAppStore();

   return (
      <Modal open={true} className='flex flex-col gap-4'>
         <Input placeholder='Theme name' />

         {Object.keys(themeCollection.dark).map((key) => (
            <Input key={key} placeholder={key} />
         ))}
      </Modal>
   );
};
