import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class UpdateUserDto extends BaseDto {
  @IsOptional()
  @IsString()
  @Expose()
  userName: string;

  @IsOptional()
  @IsEmail()
  @Expose()
  email: string;
}
