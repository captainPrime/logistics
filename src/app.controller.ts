import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';



@Controller('/hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // allows you to nest routes
  // adding 'hello' string to it changes the route to localhost:3000/app/hello
  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}