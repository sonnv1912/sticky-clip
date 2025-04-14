import type { CSSProperties, PropsWithChildren } from 'react';
import { Icon, type icons } from './icon';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { colors } from '@configs/theme/colors';

type Props = {
   content?: string;
   className?: string;
   contentClassName?: string;
   string?: string;
   leftIcon?: keyof typeof icons;
   rightIcon?: keyof typeof icons;
   iconSize?: number;
   size?: 'sm' | 'md' | 'lg';
   schema?:
      | 'primary'
      | 'gray'
      | 'white'
      | 'black'
      | 'green'
      | 'blue'
      | 'violet';
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
   size = 'sm',
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
         result = 24;
      }

      return result;
   })();

   const dynamicStyles = (() => {
      const white = colors.white;
      const black = colors.black;
      const primary = colors.darkPrimary[500];
      const gray = colors.gray[500];
      const green = colors.green[200];
      const textGreen = colors.green[800];
      const blue = colors.blue[600];
      const violet = colors.violet[500];

      const button: CSSProperties = {
         height: buttonSize,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 8,
         paddingLeft: 16,
         paddingRight: 16,
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
            text.color = colors.paragraph;
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

      if (schema === 'violet') {
         button.backgroundColor = violet;

         text.color = white;

         if (variant === 'outline') {
            button.borderColor = violet;

            text.color = violet;
         }

         if (variant === 'transparent') {
            text.color = violet;
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
                 }
         }
         whileTap={
            disable
               ? {}
               : {
                    opacity: 1,
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
