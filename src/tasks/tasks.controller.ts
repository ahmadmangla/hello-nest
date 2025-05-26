import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
