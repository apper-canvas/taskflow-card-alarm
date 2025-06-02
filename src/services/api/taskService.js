import { format } from 'date-fns'

// Get ApperClient for database operations
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Field mapping between UI and database schema
const mapTaskToDatabase = (taskData) => {
  return {
    // Only include Updateable fields for create/update operations
    title: taskData.title?.trim() || '',
    description: taskData.description?.trim() || '',
    is_completed: taskData.isCompleted || false,
    priority: taskData.priority || 'medium',
    due_date: taskData.dueDate || null,
    Tags: taskData.tags?.join(',') || ''
  };
};

const mapTaskFromDatabase = (dbTask) => {
  return {
    id: dbTask.Id,
    title: dbTask.title || '',
    description: dbTask.description || '',
    isCompleted: dbTask.is_completed || false,
    priority: dbTask.priority || 'medium',
    dueDate: dbTask.due_date || null,
    createdAt: dbTask.created_at || dbTask.CreatedOn,
    updatedAt: dbTask.updated_at || dbTask.ModifiedOn,
    tags: dbTask.Tags ? dbTask.Tags.split(',').filter(tag => tag.trim()) : []
  };
};

export const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      // Fetch all fields for display purposes
      const params = {
        fields: [
          'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
          'ModifiedOn', 'ModifiedBy', 'title', 'description', 
          'is_completed', 'priority', 'due_date', 'created_at', 'updated_at'
        ],
        orderBy: [
          {
            fieldName: 'is_completed',
            SortType: 'ASC'
          },
          {
            fieldName: 'priority',
            SortType: 'DESC'
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data.map(mapTaskFromDatabase);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to load tasks');
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
          'ModifiedOn', 'ModifiedBy', 'title', 'description', 
          'is_completed', 'priority', 'due_date', 'created_at', 'updated_at'
        ]
      };

      const response = await apperClient.getRecordById('task', id, params);
      
      if (!response || !response.data) {
        throw new Error(`Task with id ${id} not found`);
      }

      return mapTaskFromDatabase(response.data);
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw new Error(`Task with id ${id} not found`);
    }
  },

  async create(taskData) {
    try {
      if (!taskData.title?.trim()) {
        throw new Error('Task title is required');
      }

      const apperClient = getApperClient();
      
      // Only include Updateable fields in create operation
      const dbTaskData = mapTaskToDatabase({
        ...taskData,
        isCompleted: false // New tasks are always incomplete
      });

      const params = {
        records: [dbTaskData]
      };

      const response = await apperClient.createRecord('task', params);

      if (response && response.success && response.results && response.results[0]?.success) {
        return mapTaskFromDatabase(response.results[0].data);
      } else {
        const errorMessage = response.results?.[0]?.errors?.[0]?.message || 'Failed to create task';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      if (updates.title !== undefined && !updates.title?.trim()) {
        throw new Error('Task title cannot be empty');
      }

      const apperClient = getApperClient();
      
      // Only include Updateable fields in update operation
      const dbUpdates = mapTaskToDatabase(updates);

      const params = {
        records: [{
          Id: parseInt(id),
          ...dbUpdates
        }]
      };

      const response = await apperClient.updateRecord('task', params);

      if (response && response.success && response.results && response.results[0]?.success) {
        return mapTaskFromDatabase(response.results[0].data);
      } else {
        const errorMessage = response.results?.[0]?.message || 'Failed to update task';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('task', params);

      if (response && response.success && response.results && response.results[0]?.success) {
        return true;
      } else {
        const errorMessage = response.results?.[0]?.message || 'Failed to delete task';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task to toggle its completion status
      const currentTask = await this.getById(id);
      
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          is_completed: !currentTask.isCompleted
        }]
      };

      const response = await apperClient.updateRecord('task', params);

      if (response && response.success && response.results && response.results[0]?.success) {
        return mapTaskFromDatabase(response.results[0].data);
      } else {
        const errorMessage = response.results?.[0]?.message || 'Failed to update task';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw new Error('Failed to update task');
    }
  }
};