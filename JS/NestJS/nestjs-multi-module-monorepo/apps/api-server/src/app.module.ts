import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@domain/user';
import { BoardModule } from '@domain/board';

@Module({
  imports: [UserModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
