export interface DisplayCardProps {
  href: string;
  chain: string;
  name: string;
  price: string;
  creator: string;
  collection: string;
  minttime?: string;
}

export interface ChainLogoProps {
  chain: string;
  className? : string
}
export interface RaretyProps {
  rarety: string;
  className? : string
}
