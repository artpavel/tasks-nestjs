import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Get All
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // filter task
  getTaskWithFilters(dto: GetTasksFilterDto): Task[] {
    const { status, search } = dto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter((t) =>
        t.title.includes(search) || t.description.includes(search)
          ? true
          : false,
      );
    }

    return tasks;
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

  // delete task
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  // update task
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
