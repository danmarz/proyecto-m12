import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
