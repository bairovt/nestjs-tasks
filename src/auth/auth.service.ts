import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from './repos/user.repo';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPaylod as JwtPayload } from '../../dist/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    this.userRepo.signIn(authCredentialsDto);
    const payload: JwtPayload = {
      username: authCredentialsDto.username,
    };
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
