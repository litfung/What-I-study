import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import * as _ from 'lodash';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) {}

  @Get()
  getAllTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    console.log(getTasksFilterDto);

    if (_.isEmpty(getTasksFilterDto)) {
      return this.tasksService.getAllTasks();
    }

    const { status, search } = getTasksFilterDto;
    return this.tasksService.getFilteredTasks(status, search);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): boolean {
    return this.tasksService.updateTask(id, updateTaskDto.status);
  }
}
