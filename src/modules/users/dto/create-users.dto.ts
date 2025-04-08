import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateUserConfigDto {
  phoneNumber: string;
  receiveEmail: boolean;
}

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @ValidateNested()
  config?: CreateUserConfigDto;
}
