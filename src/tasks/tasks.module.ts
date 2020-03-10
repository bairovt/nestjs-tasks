import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepo } from './repos/task.repo';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepo])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
