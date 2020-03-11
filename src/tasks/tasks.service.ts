import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepo } from './repos/task.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepo)
    private taskRepo: TaskRepo,
  ) {}

  getTasks(filterTasksDto): Promise<Task[]> {
    return this.taskRepo.getTasks(filterTasksDto);
  }

  async getTaksById(id: number): Promise<Task> {
    const task = await this.taskRepo.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaksById(id);
    task.status = status;
    task.save();
    return task;
  }
}
