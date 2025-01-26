import { IUser } from '@/models/User';
import UserDto from '@/shared/dtos';

export function mapUserToDto(user: IUser): UserDto {
  return new UserDto(
    user._id,
    user.name,
    user.email,
    user.createdAt,
    user.updatedAt
  );
}
