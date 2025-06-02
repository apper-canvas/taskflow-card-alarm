import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import TaskCheckbox from '../atoms/TaskCheckbox'
import PriorityBadge from '../atoms/PriorityBadge'
import DueDateBadge from '../atoms/DueDateBadge'
import ApperIcon from '../ApperIcon'

export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  isUpdating = false 
}) {
  const handleToggleComplete = () => {
    if (!isUpdating) {
      onToggleComplete(task.id)
    }
  }

  return (
    <Card className={`
      transition-all duration-200 hover:shadow-md cursor-pointer
      ${task.isCompleted ? 'opacity-75 bg-muted/30' : 'hover:shadow-lg'}
      task-priority-${task.priority}
    `}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <TaskCheckbox
            checked={task.isCompleted}
            onChange={handleToggleComplete}
            disabled={isUpdating}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className={`font-medium text-sm leading-tight ${
                task.isCompleted ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ApperIcon name="MoreVertical" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <ApperIcon name="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(task.id)}
                    className="text-destructive"
                  >
                    <ApperIcon name="Trash2" className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {task.description && (
              <p className={`text-xs text-muted-foreground mb-3 leading-relaxed ${
                task.isCompleted ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 flex-wrap">
              <PriorityBadge priority={task.priority} />
              <DueDateBadge dueDate={task.dueDate} isCompleted={task.isCompleted} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}