import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateUserDto extends BaseDto {
  // @IsString()
  // @Length(3, 24)
  // @IsNotEmpty()
  // firstName: string;

  // @IsString()
  // @Length(3, 24)
  // @IsNotEmpty()
  // lastName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  //   @IsNotEmpty()
  // @Expose()
  // infomation: {
  //   @Transform(
  //     ({ obj }: { obj: CreateUserDto }) => `${obj.firstName} ${obj.lastName}`,
  //   )
  //   @Expose()
  //   fullName: string;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   @Expose()
  //   age: number;

  //   @IsString()
  //   @IsNotEmpty()
  //   @Expose()
  //   address: string;
  // }
}
