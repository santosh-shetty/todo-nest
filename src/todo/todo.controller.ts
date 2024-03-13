import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post('add')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  // // @Get()
  // // findAll() {
  // //   return this.todoService.findAll();
  // // }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.todoService.findOne(+id);
  // // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  // //   return this.todoService.update(+id, updateTodoDto);
  // // }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Get()
  @Render('home')
  async home() {
    // Fetch all todos from the service
    const todos = await this.todoService.findAll();
    // Return the todos to be passed to the view 
    return { todos };
  }
}
