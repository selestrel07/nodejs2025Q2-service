import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { isInt, isString, isPositive, isBoolean } from 'class-validator';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { throwDtoBadRequestException } from './throw-exception';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/user-update-password.dto';

export const validateCreateAlbumDto = (
  createAlbumDto: CreateAlbumDto,
): void => {
  if (
    !('name' in createAlbumDto && 'year' in createAlbumDto) ||
    !(
      isString(createAlbumDto.name) &&
      createAlbumDto.name.length !== 0 &&
      isInt(createAlbumDto.year) &&
      isPositive(createAlbumDto.year) &&
      createAlbumDto.year <= new Date().getFullYear()
    )
  ) {
    throwDtoBadRequestException(['name', 'year']);
  }
};

export const validateCreateArtistDto = (
  createArtistDto: CreateArtistDto,
): void => {
  if (
    !('name' in createArtistDto && 'grammy' in createArtistDto) ||
    !(
      isString(createArtistDto.name) &&
      isPositive(createArtistDto.name.length) &&
      isBoolean(createArtistDto.grammy)
    )
  ) {
    throwDtoBadRequestException(['name', 'grammy']);
  }
};

export const validateCreateTrackDto = (
  createTrackDto: CreateTrackDto,
): void => {
  if (
    !('name' in createTrackDto && 'duration' in createTrackDto) ||
    !(
      isString(createTrackDto.name) &&
      isInt(createTrackDto.duration) &&
      isPositive(createTrackDto.duration)
    )
  ) {
    throwDtoBadRequestException(['name', 'duration']);
  }
};

export const validateCreateUserDto = (createUserDto: CreateUserDto): void => {
  if (
    !('login' in createUserDto && 'password' in createUserDto) ||
    !(
      isString(createUserDto.login) &&
      isPositive(createUserDto.login.length) &&
      isString(createUserDto.password) &&
      isPositive(createUserDto.password.length)
    )
  ) {
    throwDtoBadRequestException(['login', 'password']);
  }
};

export const validateUpdateUserPasswordDto = (
  updatePasswordDto: UpdatePasswordDto,
): void => {
  if (
    !(
      'oldPassword' in updatePasswordDto && 'newPassword' in updatePasswordDto
    ) ||
    !(
      isString(updatePasswordDto.oldPassword) &&
      isPositive(updatePasswordDto.oldPassword.length) &&
      isString(updatePasswordDto.newPassword) &&
      isPositive(updatePasswordDto.newPassword.length)
    )
  ) {
    throwDtoBadRequestException(['login', 'password']);
  }
};
