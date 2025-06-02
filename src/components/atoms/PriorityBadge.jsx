import { Badge } from '../ui/badge'
import ApperIcon from '../ApperIcon'

const priorityConfig = {
  low: { 
    label: 'Low', 
    icon: 'ArrowDown', 
    variant: 'secondary',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  medium: { 
    label: 'Medium', 
    icon: 'Minus', 
    variant: 'secondary',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  high: { 
    label: 'High', 
    icon: 'ArrowUp', 
    variant: 'secondary',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  urgent: { 
    label: 'Urgent', 
    icon: 'AlertTriangle', 
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
}

export default function PriorityBadge({ priority, size = 'sm' }) {
  const config = priorityConfig[priority] || priorityConfig.medium

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} inline-flex items-center gap-1`}
    >
      <ApperIcon name={config.icon} size={12} />
      {config.label}
    </Badge>
  )
}