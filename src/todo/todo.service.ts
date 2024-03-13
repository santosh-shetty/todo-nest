import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { promises } from 'dns';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) { }

  // Add new Todo
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todosRepository.create(createTodoDto);
    await this.todosRepository.save(newTodo);
    return newTodo;
  }

  // Finding all data
  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  // Find by ID
  findOne(id: number): Promise<Todo | null> {
    return this.todosRepository.findOneBy({ id });
  }


  // Update the existing todo
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // Use the 'where' clause to specify the condition for finding the entity
    const existingTodo = await this.todosRepository.findOne({
      where: {
        id: id
      }
    });

    // If the todo item doesn't exist, throw an error
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    // Update the existing todo item with the new data
    const updatedTodo = this.todosRepository.merge(existingTodo, updateTodoDto);

    // Save the updated todo item to the database
    await this.todosRepository.save(updatedTodo);

    return updatedTodo;
  }

  //  delete a todo
  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
