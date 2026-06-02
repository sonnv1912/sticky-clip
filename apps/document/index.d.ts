declare const VANTA: {
   NET: (options: {
      el: string | HTMLElement;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: string;
      backgroundColor?: string;
   }) => void;
};
