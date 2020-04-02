import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepo } from './repos/task.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepo)
    private taskRepo: TaskRepo,
  ) {}

  getTasks(filterTasksDto: FilterTasksDto, user: User): Promise<Task[]> {
    return this.taskRepo.getTasks(filterTasksDto, user);
  }

  async getTaksById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id, userId: user.id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepo.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepo.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaksById(id, user);
    task.status = status;
    task.save();
    return task;
  }
}
