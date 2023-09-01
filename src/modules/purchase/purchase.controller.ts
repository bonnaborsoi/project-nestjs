import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDTO } from './dto/purchase.dto'

@Controller('purchase')
export class PurchaseController {

  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async purchase(@Body() purchaseData: PurchaseDTO[]) {
    return this.purchaseService.processPurchase(purchaseData);
  }

}