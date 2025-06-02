import { format } from 'date-fns'
import taskData from '../mockData/tasks.json'

// Simulate a simple in-memory store
let tasks = [...taskData]

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300))

export const taskService = {
  async getAll() {
    await simulateDelay()
    return tasks
  },

  async getById(id) {
    await simulateDelay()
    const task = tasks.find(task => task.id === id)
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return task
  },

  async create(taskData) {
    await simulateDelay()
    
    if (!taskData.title?.trim()) {
      throw new Error('Task title is required')
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      isCompleted: false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: taskData.tags || []
    }

    tasks.unshift(newTask)
    return newTask
  },

  async update(id, updates) {
    await simulateDelay()
    
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`)
    }

    if (updates.title !== undefined && !updates.title?.trim()) {
      throw new Error('Task title cannot be empty')
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    tasks[taskIndex] = updatedTask
    return updatedTask
  },

  async delete(id) {
    await simulateDelay()
    
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`)
    }

    tasks.splice(taskIndex, 1)
    return true
  },

  async toggleComplete(id) {
    await simulateDelay()
    
    const task = tasks.find(task => task.id === id)
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    const updatedTask = {
      ...task,
      isCompleted: !task.isCompleted,
      updatedAt: new Date().toISOString()
    }

    const taskIndex = tasks.findIndex(task => task.id === id)
    tasks[taskIndex] = updatedTask
    return updatedTask
  }
}