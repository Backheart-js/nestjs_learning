import { Expose, plainToInstance } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt: Date | null;

  // Chuyển đổi từ plain object sang class instance
  static plainToClass<T>(this: new (...args: any[]) => T, data: any): T {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
    // excludeExtraneousValues: true để loại bỏ các key không thuộc class
  }
}
