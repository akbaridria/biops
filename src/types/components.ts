export interface IconProps {
  customClass: string
}

export interface IBenefit {
  title: string;
  description: string;
  icon: () => JSX.Element
}