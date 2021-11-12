import { IsNotEmpty } from 'class-validator';

export class TaskFilterDto {
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  search: string;
}
