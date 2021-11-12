import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from 'src/dto/createTaskDto';
import { TaskFilterDto } from 'src/dto/taskWithFilter.dto';
import { TaskStatus } from './taskstatus.enum';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepo: TaskRepository,
  ) {}

  async createTask(taskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = taskDto;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    let task = await this.getTaskById(id);
    console.log(task);
    task.status = status;
    await task.save();
    return task;
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    let task = await TaskEntity.findOne(id);
    if (!task) {
      throw new BadRequestException('Task with id not found');
    }
    return task;
  }

  async getAll(): Promise<TaskEntity[]> {
    return await TaskEntity.find();
  }

  async deleteTask(id: number): Promise<void> {
    /* const task = await this.getTaskById(id);
    if (!task) throw new BadRequestException('Task with id not found'); */
    let result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task with Id not found');
    }
  }
}
