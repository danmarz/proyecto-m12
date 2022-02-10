import { ApiProperty } from '@nestjs/swagger';

export class TokenUserDto {
  constructor(partial?: Partial<TokenUserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
