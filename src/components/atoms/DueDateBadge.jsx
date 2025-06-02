import { Badge } from '../ui/badge'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import ApperIcon from '../ApperIcon'

export default function DueDateBadge({ dueDate, isCompleted = false }) {
  if (!dueDate) return null
  
  const date = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  const isOverdue = isPast(date) && !isToday(date) && !isCompleted
  const isDueToday = isToday(date)
  const isDueTomorrow = isTomorrow(date)
  
  let variant = 'outline'
  let className = ''
  let icon = 'Calendar'
  let text = format(date, 'MMM d')
  
  if (isOverdue) {
    variant = 'destructive'
    icon = 'AlertCircle'
    text = `Overdue (${format(date, 'MMM d')})`
  } else if (isDueToday) {
    variant = 'default'
    className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    icon = 'Clock'
    text = 'Due Today'
  } else if (isDueTomorrow) {
    variant = 'secondary'
    className = 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
    icon = 'Clock'
    text = 'Due Tomorrow'
  }
  
  return (
    <Badge variant={variant} className={`inline-flex items-center gap-1 ${className}`}>
      <ApperIcon name={icon} size={12} />
      {text}
    </Badge>
  )
}