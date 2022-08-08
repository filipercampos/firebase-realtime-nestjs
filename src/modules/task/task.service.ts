import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MessageDto, PostDto } from './../../shared/dto/message.dto';
import { PostTaskDto } from './dto/post-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  save(data: PostTaskDto): Promise<PostDto> {
    const docTask = { ...data, createdAt: Date.now() };
    //TODO mapper or something
    return this.taskRepository.write(docTask).then(value => {
      return new PostDto(value, 'Task saved');
    });
  }

  findById(id: string): Promise<TaskEntity> {
    //TODO mapper or something
    return this.taskRepository.findBy(id.toString());
  }

  remove(id: string): Promise<MessageDto> {
    //TODO mapper or something
    return this.taskRepository.remove(id).then((value: boolean) => {
      if (!value) throw new UnprocessableEntityException('Task not exists');
      return new MessageDto('Task removed');
    });
  }

  getAll(): Promise<TaskEntity[]> {
    //Here the data is object (not arra)
    //TODO mapper or something
    return this.taskRepository.findAll();
  }
}
