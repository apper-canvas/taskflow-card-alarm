import { Card, CardContent } from '../ui/card'
import { Progress } from '../ui/progress'
import ApperIcon from '../ApperIcon'

export default function TaskStats({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.isCompleted).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  const priorityCounts = tasks.reduce((acc, task) => {
    if (!task.isCompleted) {
      acc[task.priority] = (acc[task.priority] || 0) + 1
    }
    return acc
  }, {})

  const stats = [
    {
      icon: 'CheckCircle2',
      label: 'Completed',
      value: completedTasks,
      color: 'text-green-600'
    },
    {
      icon: 'Clock',
      label: 'Pending',
      value: pendingTasks,
      color: 'text-blue-600'
    },
    {
      icon: 'AlertTriangle',
      label: 'Urgent',
      value: priorityCounts.urgent || 0,
      color: 'text-red-600'
    }
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted mb-2`}>
                  <ApperIcon name={stat.icon} size={16} className={stat.color} />
                </div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}