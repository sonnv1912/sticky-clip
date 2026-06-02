import { theme } from '@packages/configs/theme';

export const Divider = () => {
   return (
      <div
         style={{
            height: 16,
            width: 1,
            borderRadius: 12,
            background: theme.colors.woodsmoke[300],
         }}
      />
   );
};
