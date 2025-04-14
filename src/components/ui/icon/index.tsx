import { EosIconsBubbleLoading } from './symbols/EosIconsBubbleLoading';
import { FluentColorClipboard16 } from './symbols/FluentColorClipboard16';
import { FluentColorClipboardTextEdit20 } from './symbols/FluentColorClipboardTextEdit20';
import { MaterialSymbolsCloseRounded } from './symbols/MaterialSymbolsCloseRounded';
import { MaterialSymbolsDelete } from './symbols/MaterialSymbolsDelete';
import { MaterialSymbolsSettingsRounded } from './symbols/MaterialSymbolsSettingsRounded';
import { IconParkOutlineSearch } from './symbols/IconParkOutlineSearch';
import colors from 'tailwindcss/colors';
import { NotoStar } from './symbols/NotoStar';
import { MaterialSymbolsSunnyRounded } from './symbols/MaterialSymbolsSunnyRounded';
import { MaterialSymbolsMoonStarsRounded } from './symbols/MaterialSymbolsMoonStarsRounded';

export const icons = {
   MaterialSymbolsDelete,
   MaterialSymbolsCloseRounded,
   MaterialSymbolsSettingsRounded,
   EosIconsBubbleLoading,
   FluentColorClipboard16,
   FluentColorClipboardTextEdit20,
   IconParkOutlineSearch,
   MaterialSymbolsSunnyRounded,
   NotoStar,
   MaterialSymbolsMoonStarsRounded,
};

type Props = IconProps & {
   name: keyof typeof icons;
};

export const Icon = ({ name, color = colors.white, size = 24 }: Props) => {
   const Body = icons[name];

   return <Body color={color} size={size} />;
};
