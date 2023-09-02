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

            // delete this condition
            if (purchasedQuantity <= 0){
                throw new Error("You cannot enter a non positive number: " + purchasedQuantity + " (productId: " + productId + ")");
            }
            
            if (product.quantity == 0){
                throw new Error("Product out of stock");
            }

            else if (updatedQuantity < 0){ // When product.quantity is less than purchasedQuantity
                throw new Error("Insufficient amount in stock. There are only " + product.quantity + " of this product in stock");
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