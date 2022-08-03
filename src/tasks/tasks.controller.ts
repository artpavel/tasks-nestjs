import { TasksService } from './tasks.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}
