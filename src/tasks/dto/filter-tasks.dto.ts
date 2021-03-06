import { TaskStatus } from '../enums/task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class FilterTasksDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
