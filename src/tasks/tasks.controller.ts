import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: { title: string; description: string }): Task {
    return this.tasksService.createTask(body.title, body.description);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { title: string; description: string },
  ): Task | undefined {
    return this.tasksService.updateTask(id, body.title, body.description);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}