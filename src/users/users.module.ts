// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, user_schema } from './users.schema';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: user_schema }]),
    JwtModule.register({
      secret: "pooja",
      signOptions: { expiresIn: '1h' },
    }),
   
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
  ],
})
export class UsersModule {
  constructor() {
    console.log('This is user module');
  }
}
