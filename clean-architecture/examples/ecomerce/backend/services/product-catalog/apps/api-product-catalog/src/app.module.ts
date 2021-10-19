import { useCases } from '@lib/core/usecases';
import { ProductMongoModule } from '@lib/infrastructure';
import { ProductDynamoModule } from '@lib/infrastructure/dynamo/product-dynamo.module';
import { ProductMysqlModule } from '@lib/infrastructure/mysql';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers';

@Module({
  imports: [
    ProductMongoModule,
    // ProductMysqlModule,
    // ProductDynamoModule
  ],
  controllers: [ProductController],
  providers: [
    ...useCases
  ]
})
export class AppModule { }
