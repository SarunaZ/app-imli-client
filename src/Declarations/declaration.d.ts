declare module "*.scss" {
  const styles: { [className: string]: string };

  export default styles;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
