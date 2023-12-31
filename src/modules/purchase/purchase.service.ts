import { Injectable } from '@nestjs/common';
import { PurchaseDTO } from './dto/purchase.dto'
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PurchaseService {

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

    async processPurchase(purchaseData: PurchaseDTO[]) {

        for (const purchase of purchaseData) {
            await this.checkProductExistence(purchase.productId); // Check if any products of the list does not exist
        }
        for (const purchase of purchaseData) {
            await this.updateProductStock(purchase.productId, purchase.quantity); 
        }

        return {
            message: 'Purchase completed successfully!'
        }
    }

    async updateProductStock(productId: number, purchasedQuantity: number) {
        const product = await this.prisma.product.findUnique({
            where: {
                id : productId,
            },
        });
        
        if (product) {
            const updatedQuantity = product.quantity - purchasedQuantity;

            
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