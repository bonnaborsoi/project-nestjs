import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { ParseIntPipe } from '@nestjs/common';
import { threadId } from 'worker_threads';

@Controller('product')
export class ProductController {
  // injecao de dependencia
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: ProductDTO){
    return this.productService.create(data);
  }
  @Get()
  async findAll(){
    return this.productService.findAll();
  }

  @Get(":id")
  async getProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe)  id: number, @Body() data: ProductDTO){
    return this.productService.update(id,data);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

}