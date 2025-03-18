import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  @Length(3, 24)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(3, 24)
  @IsNotEmpty()
  lastName: string;

  @Transform(
    ({ obj }: { obj: CreateUserDto }) => `${obj.firstName} ${obj.lastName}`,
  )
  @Expose()
  fullName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
}
