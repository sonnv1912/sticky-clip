import { EosIconsBubbleLoading } from '../../assets/icons/EosIconsBubbleLoading';
import { FluentColorClipboard16 } from '../../assets/icons/FluentColorClipboard16';
import { FluentColorClipboardTextEdit20 } from '../../assets/icons/FluentColorClipboardTextEdit20';
import { MaterialSymbolsCloseRounded } from '../../assets/icons/MaterialSymbolsCloseRounded';
import { MaterialSymbolsDelete } from '../../assets/icons/MaterialSymbolsDelete';
import { MaterialSymbolsSettingsRounded } from '../../assets/icons/MaterialSymbolsSettingsRounded';
import { colors } from '../../assets/themes/colors';

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
