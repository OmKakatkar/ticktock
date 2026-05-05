import classNames from 'classnames'
import styles from './Typography.module.css'
import {
  TypographyProps,
  TypographyTag,
  TypographyVariant,
} from './Typography.types'

export const Typography = ({
  tag: Component = TypographyTag.span,
  variant = TypographyVariant.Default,
  weight,
  children,
  lineHeight,
  letterSpacing,
  fontSize,
  ...rest
}: TypographyProps) => {
  if (variant === TypographyVariant.Default) {
    return <>{children}</>
  }

  const inlineStyle = {
    ...rest?.style,
    ...(lineHeight ? { lineHeight } : {}),
    ...(letterSpacing ? { letterSpacing } : {}),
    ...(fontSize ? { fontSize } : {}),
  }

  return (
    <Component
      {...rest}
      className={classNames(
        styles[variant],
        weight && styles[weight],
        rest?.className,
      )}
      style={inlineStyle}>
      {children}
    </Component>
  )
}
