import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '../../interfaces/response.message';
import { PostResponseMessage } from './../../interfaces/post-response.message';
import { PostTaskDto } from './dto/post-task.dto';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Get a Task
   */
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'The id of the Task' })
  @ApiResponse({
    status: 200,
    description: 'Task data',
    type: TaskEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  /**
   * Get all Tasks
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Task list',
    type: [TaskEntity],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  findAll(): Promise<TaskEntity[]> {
    return this.taskService.getAll();
  }

  /**
   * Save a Task
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Task has been successfully created.',
    type: PostResponseMessage,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  async create(@Body() data: PostTaskDto) {
    return this.taskService.save(data);
  }

  /**
   * Remove a Task
   */
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Task has been successfully deleted.',
    type: ResponseMessage,
  })
  @ApiParam({ name: 'id', description: 'The id of the task' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
