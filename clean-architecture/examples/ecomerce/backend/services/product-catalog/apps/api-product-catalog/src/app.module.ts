import { useCases } from '@lib/core/usecases';
import { ProductMongoModule } from '@lib/infrastructure';
import { ProductMysqlModule } from '@lib/infrastructure/mysql';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers';

@Module({
  imports: [
    ProductMongoModule,
    // ProductMysqlModule,
  ],
  controllers: [ProductController],
  providers: [
    ...useCases
  ]
})
export class AppModule { }
