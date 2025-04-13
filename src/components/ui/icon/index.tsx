import { EosIconsBubbleLoading } from './symbols/EosIconsBubbleLoading';
import { FluentColorClipboard16 } from './symbols/FluentColorClipboard16';
import { FluentColorClipboardTextEdit20 } from './symbols/FluentColorClipboardTextEdit20';
import { MaterialSymbolsCloseRounded } from './symbols/MaterialSymbolsCloseRounded';
import { MaterialSymbolsDelete } from './symbols/MaterialSymbolsDelete';
import { MaterialSymbolsSettingsRounded } from './symbols/MaterialSymbolsSettingsRounded';
import { colors } from '../../../configs/theme/colors';

export const icons = {
   MaterialSymbolsDelete,
   MaterialSymbolsCloseRounded,
   MaterialSymbolsSettingsRounded,
   EosIconsBubbleLoading,
   FluentColorClipboard16,
   FluentColorClipboardTextEdit20,
};

type Props = IconProps & {
   name: keyof typeof icons;
};

export const Icon = ({ name, color = colors.white, size = 24 }: Props) => {
   const Body = icons[name];

   return <Body color={color} size={size} />;
};
