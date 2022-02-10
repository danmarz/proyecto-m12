import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  /**
   * User's email address.
   * @example 'admin@mail.com'
   * @type {string}
   * @memberof LoginUserDto
   */
  @ApiProperty()
  email: string;

  /**
   * User's password. Must be at least 8 characters in length and
   * must contain at least 1 upper-case and 1 lower-case character
   * and a number.
   * @example 'Password1234'
   * @type {string}
   * @memberof LoginUserDto
   */
  @ApiProperty()
  password: string;
}
