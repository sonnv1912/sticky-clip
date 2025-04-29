type ThemeValue = {
   background?: string;
   box?: string;
   card?: string;
   fade?: string;
   paragraph?: string;
   'sub-paragraph'?: string;
   'box-border'?: string;
   'shadow-blur-10'?: string;
};

type Theme = Record<string, ThemeValue>;
