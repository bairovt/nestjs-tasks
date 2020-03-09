import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTasksStatusDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaksById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task;
  }

  deleteTask(id: string): string {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      return '404 error: there is no task with such id'
    }
    this.tasks.splice(index, 1);
    return `Task deleted`;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task | string {
    const task = this.getTaksById(id);
    if (!task) {
      return '404 error: there is no task with such id'
    }
    task.status = status;
    return task;
  }
}
