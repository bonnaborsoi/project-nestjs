import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProductService {
    
    constructor(private prisma : PrismaService) {}

    // Exception handler
    async checkProductExistence(id: number) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });
    
        if (!product) {
            throw new Error("Product does not exist");
        }
    
        return product;
    }

    async create(data: ProductDTO) {
        const productExists = await this.prisma.product.findFirst({
            where: {
                id: data.id,
            },
        });
        if (productExists){
            throw new Error("This id already exists");
        }

        const product = await this.prisma.product.create({
            data,
        });

        return product;
    }


    async findAll(){
        return this.prisma.product.findMany();
    }

    async findOne(id: number) {
        const product = await this.checkProductExistence(id);

        return await this.prisma.product.findUnique({
          where: {
            id: product.id,
          },
        });
    }
      
    async update (id: number, data: ProductDTO){
        const product = await this.checkProductExistence(id);

        return await this.prisma.product.update({
            data,
            where: {
                id: product.id,
            },
        });
    }

    async delete(id: number) {
        const product = await this.checkProductExistence(id);

        await this.prisma.product.delete({
          where: {
            id: product.id,
          },
        });

        return {
            message: 'Product deleted'
        }
    }
}
