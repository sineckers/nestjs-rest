import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumberString()
  userId: string;
}
