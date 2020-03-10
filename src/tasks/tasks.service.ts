import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskRepo } from './repos/task.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepo)
    private taskRepo: TaskRepo,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasks(filterTasksDto): Task[] {
  //   const { status, search } = filterTasksDto;
  //   let tasks: Task[] = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

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
    const task = await this.getTaksById(id);
    await this.taskRepo.remove(task);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaksById(id);
    task.status = status;
    task.save();
    return task;
  }
}
