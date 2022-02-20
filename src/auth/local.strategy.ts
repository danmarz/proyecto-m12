import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly userRepository: UserRepository) {
    //call parent constructor (PassportStrategy(Strategy))
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserWithPassword(email);

    if (!user) {
      this.logger.debug(`User ${email} not found!`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${email}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
