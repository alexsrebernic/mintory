interface LinkProps {
  name: string;
  path: string;
}

interface NavLinksProps {
  orientation: "vertical" | "horizontal";
  links: LinkProps[];
  className?: string;
}

export type {LinkProps, NavLinksProps}