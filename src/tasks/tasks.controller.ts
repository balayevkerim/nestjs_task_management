import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/createTaskDto';
import { TaskFilterDto } from 'src/dto/taskWithFilter.dto';
import { TaskStatusValidationPipe } from 'src/pipes/TaskStatusValidation.pipe';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<TaskEntity> {
    //add validation
    return this.taskService.getTaskById(id);
  }
  @Get()
  getTasks(@Query() taskFilterDto: TaskFilterDto) {
    /*  if (Object.keys(taskFilterDto).length > 0) {
      return this.taskService.getAllWithFilter(taskFilterDto);
    } */
    return this.taskService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTasks(@Body() taskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    //add validation
    return this.taskService.deleteTask(id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: number,
    @Body('status', TaskStatusValidationPipe) status,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }
}
