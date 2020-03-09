import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTasksStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get('/')
  getTasks(): Task[] {
    return this.tasksService.getTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaksById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto): Task {

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTasksStatus(
    @Param('id') id: string,
    @Body() updateTasksStatusDto: UpdateTasksStatusDto
  ): Task | string {

    return this.tasksService.updateTasksStatus(id, updateTasksStatusDto);
  }
}
