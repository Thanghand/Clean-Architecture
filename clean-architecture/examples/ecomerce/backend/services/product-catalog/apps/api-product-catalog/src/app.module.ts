import { useCases } from '@lib/core/usecases';
import { ProductMongoModule } from '@lib/infrastructure';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers';

@Module({
  imports: [
    ProductMongoModule,
  ],
  controllers: [ProductController],
  providers: [
    ...useCases
  ],
})
export class AppModule { }
