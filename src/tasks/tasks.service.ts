import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

 getTaskById(id: string): Task | undefined {
  return this.tasks.find(task => task.id === id);
}

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, title: string, description: string): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      task.title = title;
      task.description = description;
    }
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}