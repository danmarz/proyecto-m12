import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, RecipesController],
  providers: [AppService],
})
export class AppModule {}
