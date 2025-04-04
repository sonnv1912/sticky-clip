import NoDataClipboard from '../../assets/images/no-data-clipboard.png';

export const images = {
   NoDataClipboard,
};

type Props = {
   name: keyof typeof images;
};

export const Image = ({ name }: Props) => {
   return <img alt={name} src={name} />;
};
