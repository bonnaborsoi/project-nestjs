import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
  imports: [ProductModule, PurchaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
