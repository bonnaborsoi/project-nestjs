import { Injectable } from '@nestjs/common';
import { PurchaseDTO } from './dto/purchase.dto'
import { PrismaService } from 'src/database/PrismaService';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PurchaseService {

    constructor(private prisma : PrismaService) {}

    async processPurchase(purchaseData: PurchaseDTO[]) {
        for (const purchase of purchaseData) {
          await this.updateProductStock(purchase.productId, purchase.quantity);
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

          await this.prisma.product.update({
            where: { id: productId },
            data: { quantity: updatedQuantity },
          });
        }
    }

}