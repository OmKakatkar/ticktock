export type InputProps = {
  label?: string
  error?: string
  helpText?: string
  isRequired?: boolean
  containerClassName?: string
  ref?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>
