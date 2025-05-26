import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }

  async updateTask(id: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    return await this.tasksRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
