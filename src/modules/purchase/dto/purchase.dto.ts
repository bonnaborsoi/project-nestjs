import { IsNumber, Min, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PurchaseDTO {

  @IsNotEmpty({ message: "Id cannot be empty" })
  @IsNumber()
  productId: number;

  purchaseId?: string;

  @IsNotEmpty({ message: "Quantity cannot be empty" })
  @IsNumber()
  @Min(1, { message: "Quantity must be greater than or equal to 1" })
  quantity: number;
}