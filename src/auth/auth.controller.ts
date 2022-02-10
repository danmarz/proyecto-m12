import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FetchUserDto } from '../users/dto/fetch-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenUserDto } from './dto/token-user.dto';

@ApiTags('auth')
@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * User login endpoint
   * @param {LoginUserDto} body
   * @return {TokenUserDto}
   * @memberof AuthController
   */
  @ApiOkResponse({
    type: TokenUserDto,
    isArray: false,
    description: 'Login successful',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@CurrentUser() user: User, @Body() body: LoginUserDto) {
    return new TokenUserDto({
      email: user.email,
      token: this.authService.getTokenForUser(user),
    });
  }

  /**
   * Own user profile endpoint
   * @return {User}
   * @memberof AuthController
   */
  @ApiOkResponse({
    type: FetchUserDto,
    isArray: false,
    description: 'Fetch own user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
