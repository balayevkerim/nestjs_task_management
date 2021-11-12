import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/taskstatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.In_Progress,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException('Status is invalid');
    }
    return value;
  }

  isValidStatus(status: TaskStatus) {
    let index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
