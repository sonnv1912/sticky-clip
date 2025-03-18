import { MaterialSymbolsCloseRounded } from '../assets/icons/MaterialSymbolsCloseRounded';
import { MaterialSymbolsDelete } from '../assets/icons/MaterialSymbolsDelete';
import { colors } from '../assets/themes/colors';
import type { IconProps } from '../types/icon';

const icons = {
   MaterialSymbolsDelete,
   MaterialSymbolsCloseRounded,
};

type Props = IconProps & {
   name: keyof typeof icons;
};

export const Icon = ({ name, color = colors.white, size = 24 }: Props) => {
   const Body = icons[name];

   return <Body color={color} size={size} />;
};
