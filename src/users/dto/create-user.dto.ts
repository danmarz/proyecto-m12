import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User's email address.
   * @example 'admin@mail.com'
   * @type {string}
   * @memberof CreateUserDto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  /**
   * User's password. Must be at least 8 characters in length and
   * must contain at least 1 upper-case and 1 lower-case character
   * and a number.
   * @example 'Password1234'
   * @type {string}
   * @memberof CreateUserDto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  /**
   * User's first name.
   * @example "dan"
   * @type {string}
   * @memberof CreateUserDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  /**
   * User's last name.
   * @example "dumitrescu"
   * @type {string}
   * @memberof CreateUserDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  readonly last_name?: string;
}
