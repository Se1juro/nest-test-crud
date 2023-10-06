import { Body, Controller, Post } from '@nestjs/common';
import { RegisterValidator } from './validators/register.validator';
import { LoginValidator } from './validators/login.validator';
import { AuthService } from './auth.service';

@Controller('/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign-up')
  signUpUser(@Body() userData: RegisterValidator) {
    return this.authService.createUser(userData);
  }

  @Post('/sign-in')
  signInUser(@Body() userData: LoginValidator) {
    return this.authService.signIn(userData);
  }
}
