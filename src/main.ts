import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose'

import paginate = require('mongoose-paginate-v2')

(<any>paginate).paginate.options = {   //自定义返回字段
  customLabels: {
    docs: 'data',
    totalDocs: 'total'
  }
}
mongoose.plugin(paginate) //应用插件

mongoose.connect('mongodb://localhost/baixingwang', {
  useNewUrlParser: true
})

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // 解决跨域问题
  app.enableCors()

  // 验证管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  const options = new DocumentBuilder()
    .setTitle('百姓网')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
  console.log('http://localhost:3002')
}
bootstrap();
