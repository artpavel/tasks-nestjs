import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // get all
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // get by id
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // create task
  @Post()
  createTask(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.cteateTask(dto);
  }
}
