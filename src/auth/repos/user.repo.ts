import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;

    await user.save(); // Nestjs does not catch QueryFailedError error on unique constraint violation causing UnhandledPromiseRejectionWarning
    // try {
    //   await user.save();
    // } catch (error) {
    //   console.error(error);
    // }
    return user;
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
