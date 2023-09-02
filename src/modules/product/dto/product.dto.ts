import { IsNumber, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';

export class ProductDTO {

  @IsNotEmpty({ message: "Id cannot be empty" })
  @IsNumber()
  @Min(0, { message: "Id must be greater than or equal to 0" })
  id: number;

  @IsNotEmpty({ message: "Name cannot be empty" })
  @IsString({ message: "Name must be a string" })
  name: string;

  @IsNotEmpty({ message: "Price cannot be empty" })
  @IsNumber({}, { message: "Price must be a number" })
  @Min(1, { message: "Price must be greater than or equal to 1" })
  price: number;

  @IsNotEmpty({ message: "Image cannot be empty" })
  @IsUrl({}, { message: "Image must be a valid URL" })
  image: string;

  @IsNotEmpty({ message: "Quantity cannot be empty" })
  @IsNumber()
  @Min(1, { message: "Quantity must be greater than or equal to 1" })
  quantity: number;
}