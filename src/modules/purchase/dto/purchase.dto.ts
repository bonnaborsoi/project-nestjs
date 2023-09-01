import { IsNumber, Min, IsNotEmpty } from 'class-validator';

export class PurchaseDTO {
  
  @IsNotEmpty({ message: "Id cannot be empty" })
  @IsNumber()
  @Min(0, { message: "Id must be greater than or equal to 0" })
  productId: number;

  purchaseId?: string;

  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsNumber()
  @Min(1, { message: 'Quantity must be greater than or equal to 1' })
  quantity: number;
}
