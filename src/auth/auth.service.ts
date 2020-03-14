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
  ) { }

  signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    return this.userRepo.signIn(authCredentials);
  }
}
