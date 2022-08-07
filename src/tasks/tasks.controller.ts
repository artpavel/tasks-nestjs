import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // get all
  @Get()
  getTasks(@Query() dto: GetTasksFilterDto): Task[] {
    if (Object.keys(dto).length) {
      return this.tasksService.getTaskWithFilters(dto);
    } else {
      return this.tasksService.getAllTasks();
    }
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

  // delete task
  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  // update task
  @Patch(':id/status')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto): Task {
    const { status } = dto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
