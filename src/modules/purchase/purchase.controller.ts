import { Body, Controller, Put, ParseArrayPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDTO } from './dto/purchase.dto'

@Controller('purchase')
export class PurchaseController {

  constructor(private readonly purchaseService: PurchaseService) {}

  @Put()
  async processPurchase(@Body(new ParseArrayPipe({ items: PurchaseDTO })) purchaseData: PurchaseDTO[]) {
    return this.purchaseService.processPurchase(purchaseData);
  }

}