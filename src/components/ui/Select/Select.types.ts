export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  isRequired?: boolean
  containerClassName?: string
  disabled?: boolean
}
