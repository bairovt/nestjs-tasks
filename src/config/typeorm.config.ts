import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ultraplex',
  database: 'nestjs_tasks',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
