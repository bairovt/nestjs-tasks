import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (error) {
      if (error.message.includes('duplicate key')) {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const query = this.createQueryBuilder('user');
    query.where('user.username = :username AND user.password = :password', {
      username,
      password,
    });
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
