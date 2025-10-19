declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png";

declare module "*.jpg";

declare module "*.json";

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}
