import { ReactNode } from 'react'

export enum TypographyTag {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p',
  div = 'div',
  span = 'span',
}

export enum TypographyVariant {
  Display_2XL = 'display_2XL',
  Display_XL = 'display_XL',
  Display_LG = 'display_LG',
  Display_MD = 'display_MD',
  Display_SM = 'display_SM',
  Display_XS = 'display_XS',
  Body_XL = 'body_XL',
  Body_LG = 'body_LG',
  Body_MD = 'body_MD',
  Body_SM = 'body_SM',
  Body_XS = 'body_XS',
  Default = 'default',
}

export enum TypographyWeight {
  Regular = 'regular_weight',
  Medium = 'medium_weight',
  SemiBold = 'semibold_weight',
  Bold = 'bold_weight',
}

export type TypographyProps = {
  tag?: TypographyTag
  variant?: TypographyVariant
  weight?: TypographyWeight
  children?: ReactNode
  fontSize?: string
  lineHeight?: string
  letterSpacing?: string
} & React.HTMLAttributes<HTMLElement>
