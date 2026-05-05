export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Danger = 'danger',
}

export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  isFullWidth?: boolean
  className?: string
  children?: React.ReactNode
}

export type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

export type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
    isExternal?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink
