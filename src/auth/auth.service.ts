import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from './repos/user.repo';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepo.signUp(authCredentials);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ jwtToken: string }> {
    const username = await this.userRepo.signIn(authCredentialsDto);
    const payload: JwtPayload = {
      username,
    };
    const jwtToken = this.jwtService.sign(payload);
    return { jwtToken };
  }
}
