import { Injectable } from '@nestjs/common';
import { PurchaseDTO } from './dto/purchase.dto'
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PurchaseService {

    constructor(private prisma : PrismaService) {}

    async processPurchase(purchaseData: PurchaseDTO[]) {
        for (const purchase of purchaseData) {
          await this.updateProductStock(purchase.productId, purchase.quantity);
        }

        return {
            message: 'Purchase completed successfully!'
        }
    }

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

    async updateProductStock(productId: number, purchasedQuantity: number) {
        const product = await this.checkProductExistence(productId);
      
        if (product) {
            const updatedQuantity = product.quantity - purchasedQuantity;

            if (updatedQuantity < 0){
                throw new Error("Product has only " + product.quantity + " in stock");
            }

            else if (updatedQuantity == 0){ 
                await this.prisma.product.delete({
                    where : {
                        id: productId,
                    }
                })
            }

            else{
                await this.prisma.product.update({
                    where : { 
                        id: productId 
                    },
                    data: { quantity: updatedQuantity },
                });
            }

        }
    }
}