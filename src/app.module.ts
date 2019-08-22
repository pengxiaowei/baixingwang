import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlansModule } from './plans/plans.module';
import { SitesModule } from './site/sites.module';

@Module({
  imports: [PlansModule, SitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
