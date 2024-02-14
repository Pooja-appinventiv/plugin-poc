import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './users.schema';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/belt/auth.service';
// import { JwtAuthGuard } from 'src/belt/jwt_strategy/jwt-auth-guard';
// import { ResponseHandler } from 'src/lib/responsehandler';
// import { HttpStatusCode, STATUS_MSG } from 'src/constants/constant';
import { Response } from 'express';
import { HttpStatusCode, STATUS_MSG } from './constant';
import { ResponseHandler } from './responsehandler';
import { AuthService } from './auth.service';
// import { BasicAuthGuard } from 'src/belt/auth.strategy';
@Controller('users')
export class UsersController {
  constructor(public userService: UsersService,public authservice: AuthService,  private readonly responseHandler: ResponseHandler,) {}

  @Get('/getall')
  // @UseGuards(BasicAuthGuard)
  async getalluser(): Promise<user[]> {
    return this.userService.findall();
  }

  @Post('/signup')
  async signup(
    @Res() res: Response,
    @Body() user_details: CreateUserDto) {
    try{
    const newUser = await this.userService.createUser(user_details);
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      newUser
    );
    }catch (error) {
      return await this.responseHandler.sendErrorResponse(
        res,
        HttpStatusCode.BadRequest,
        error?.message,
        error?.errors,
      );
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  // async login(@Body() loginDto: LoginDto) {
  //   // const user = await this.userService.findUserByUsername(loginDto.username);

  //   // if (!user || user.password !== loginDto.password) {
  //   //   throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   // }
  //   console.log("========user logged in ==================")

  //   return { message: 'Login successful', user };
  // }
  async login(
    @Res() res: Response,
    @Body()user)
     {
    try{
    const details=await this.authservice.jwt_generate(user);
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      details
    );
  } catch (error) {
    return await this.responseHandler.sendErrorResponse(
      res,
      HttpStatusCode.BadRequest,
      error?.message,
      error?.errors,
    );
  }
  }

  @Get('/profile')
  // @UseGuards(JwtAuthGuard)
  async gethello(
    @Res() res:Response,
    @Req() req): Promise<any> {
    console.log('xyz');
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      req.user
    );
  }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authservice.googleLogin(req)
  }

  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("redirect1")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return this.authservice.facebookLogin(req)
  }

//   app1.get('/', function (req:any, res:any) {
//     console.log("-----------------------------")
//     res.sendFile(path.resolve(__dirname, '/home/admin96/Videos/streaming_server/index1.html'));
// });
@Get('view') // endpoint '/html/view'
async getHtml(@Res() res: Response) {
  try {
    const filePath = '/home/admin96/Videos/nest_js/nestjs/testing.html';
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error sending HTML file:', error);
    res.status(500).send('Internal Server Error');
  }
}
}         
interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}
interface LoginDto {
  username: string;
  password: string;
}
