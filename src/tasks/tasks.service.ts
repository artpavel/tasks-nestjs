import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Get All
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get by id
  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  // create task
  cteateTask(dto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      status: TaskStatus.OPEN,
      ...dto,
    };

    this.tasks.push(task);

    return task;
  }
}
