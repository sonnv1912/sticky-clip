import type { CSSProperties, PropsWithChildren } from 'react';
import { Icon, type icons } from './icon';
import { colors } from '../../assets/themes/colors';
import clsx from 'clsx';
import { motion } from 'motion/react';

type Props = {
   content?: string;
   className?: string;
   contentClassName?: string;
   string?: string;
   leftIcon?: keyof typeof icons;
   rightIcon?: keyof typeof icons;
   iconSize?: number;
   size?: 'sm' | 'md' | 'lg';
   schema?: 'primary' | 'gray' | 'white' | 'black' | 'green' | 'blue';
   rounded?: boolean;
   loading?: boolean;
   disable?: boolean;
   variant?: 'fill' | 'outline' | 'transparent';
   badge?: number;
   loadingContent?: string;
   iconColor?: string;
   visible?: boolean;
   onClick?: () => void;
};

export const Button = ({
   children,
   content,
   className,
   contentClassName,
   //    badge,
   loading,
   loadingContent,
   size = 'md',
   rounded = false,
   schema = 'primary',
   iconSize: _iconSize,
   iconColor,
   variant = 'fill',
   leftIcon,
   rightIcon,
   disable: _disable,
   visible = true,
   onClick,
}: PropsWithChildren<Props>) => {
   const primary = colors.gray900;
   const white = colors.white;
   const gray = colors.gray500;
   const black = colors.gray950;
   const green = colors.green200;
   const textGreen = colors.green800;
   const blue = colors.blue400;

   const buttonSize = (() => {
      let result = 40;

      if (size === 'md') {
         result = 48;
      }

      return result;
   })();

   const iconSize = (() => {
      let result = 20;

      if (size === 'md') {
         result = 28;
      }

      return result;
   })();

   const dynamicStyles = (() => {
      const button: CSSProperties = {
         height: buttonSize,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 8,
         paddingLeft: 8,
         paddingRight: 9,
         borderWidth: 2,
         borderColor: 'transparent',
      };

      const text: CSSProperties = {
         flex: leftIcon || rightIcon ? 1 : undefined,
         fontSize: size,
         fontFamily: '600',
         textAlign: leftIcon || rightIcon ? undefined : 'center',
      };

      if (schema === 'primary') {
         button.backgroundColor = primary;

         text.color = white;

         if (variant === 'outline') {
            button.borderColor = primary;

            text.color = primary;
         }

         if (variant === 'transparent') {
            text.color = primary;
         }
      }

      if (schema === 'white') {
         button.backgroundColor = white;

         text.color = colors.black;

         if (variant === 'outline') {
            button.borderColor = white;

            text.color = white;
         }

         if (variant === 'transparent') {
            text.color = colors.text;
         }
      }

      if (schema === 'gray') {
         button.backgroundColor = gray;

         text.color = colors.white;

         if (variant === 'outline') {
            button.borderColor = gray;

            text.color = gray;
         }

         if (variant === 'transparent') {
            text.color = gray;
         }
      }

      if (schema === 'blue') {
         button.backgroundColor = blue;

         text.color = colors.white;

         if (variant === 'outline') {
            button.borderColor = blue;

            text.color = blue;
         }

         if (variant === 'transparent') {
            text.color = blue;
         }
      }

      if (schema === 'black') {
         button.backgroundColor = black;

         text.color = colors.white;

         if (variant === 'outline') {
            button.borderColor = black;

            text.color = black;
         }

         if (variant === 'transparent') {
            text.color = black;
         }
      }

      if (schema === 'green') {
         button.backgroundColor = green;

         text.color = textGreen;

         if (variant === 'outline') {
            button.borderColor = green;

            text.color = green;
         }

         if (variant === 'transparent') {
            text.color = green;
         }
      }

      if (rounded) {
         button.borderRadius = 9999;
      }

      if (variant === 'outline') {
         button.backgroundColor = 'transparent';
      }

      if (variant === 'transparent') {
         button.backgroundColor = 'transparent';
         button.padding = 0;
         button.borderRadius = size;
         button.height = 'auto';
      }

      return {
         button: children ? {} : button,
         text,
      };
   })();

   const disable = _disable || loading;

   return (
      <motion.div
         style={{
            opacity: visible ? 1 : 0,
            ...dynamicStyles.button,
         }}
         whileHover={
            disable
               ? {}
               : {
                    opacity: 0.8,
                    scale: 1.05,
                 }
         }
         whileTap={
            disable
               ? {}
               : {
                    scale: 1,
                 }
         }
         className={clsx(
            'gap-8 relative overflow-hidden',
            {
               'cursor-pointer': !disable,
               'cursor-not-allowed': disable,
            },
            className,
         )}
         onClick={onClick}
      >
         {children && children}

         {!children && (
            <>
               {loading && (
                  <Icon
                     color={dynamicStyles.text.color?.toString()}
                     name='EosIconsBubbleLoading'
                  />
               )}

               {loading && loadingContent && (
                  <p style={dynamicStyles.text} className={contentClassName}>
                     {loadingContent}
                  </p>
               )}

               {leftIcon && !loading && (
                  <Icon
                     name={leftIcon}
                     size={_iconSize || iconSize}
                     color={iconColor || dynamicStyles.text.color?.toString()}
                  />
               )}

               {content && (
                  <p style={dynamicStyles.text} className={contentClassName}>
                     {content}
                  </p>
               )}

               {rightIcon && (
                  <Icon
                     name={rightIcon}
                     size={_iconSize || iconSize}
                     color={iconColor || dynamicStyles.text.color?.toString()}
                  />
               )}
            </>
         )}

         {disable && (
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40' />
         )}
      </motion.div>
   );
};
