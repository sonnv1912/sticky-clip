import { images } from '@packages/assets/images';

export const languages: Record<
   string,
   {
      image: string;
      label: string;
      code: string;
   }
> = {
   us: {
      image: images.UnitedState,
      label: 'English',
      code: 'us',
   },
   vn: {
      image: images.VietNam,
      label: 'Tiếng Việt',
      code: 'vn',
   },
};

export const isMac = window.navigator.userAgentData?.platform
   .toLowerCase()
   .includes('mac');

export const isWin = window.navigator.userAgentData?.platform
   .toLowerCase()
   .includes('win');
