import { Checkbox } from '../ui/checkbox'
import ApperIcon from '../ApperIcon'

export default function TaskCheckbox({ checked, onChange, disabled = false }) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
    />
  )
}