import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
