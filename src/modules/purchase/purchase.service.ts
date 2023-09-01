import { Injectable } from '@nestjs/common';
import { PurchaseDTO } from './dto/purchase.dto'
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PurchaseService {

    constructor(private prisma : PrismaService) {}


}