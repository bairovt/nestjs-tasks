import { Injectable } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
    return this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<User> {
    return this.userRepo.signIn(authCredentials);
  }
}