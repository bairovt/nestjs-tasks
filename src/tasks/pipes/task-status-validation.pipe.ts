import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../enums/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`Invalid status: ${value}`);
    }
    return value;
  }

  private isValidStatus(value) {
    return value in TaskStatus;
  }
}
