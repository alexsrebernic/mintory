export interface ImageTextBannerProps {
  bgColor?: string;
  title: string;
  subtitle?: string;
  imageurl?: string;
  buttonText?: string;
  onClick?: () => void;
  className? : string;
}