import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserDto } from './dtos/user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from './user.entity'
import { AuthGuard } from '../guards/auth.guard'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('/signup')
  public async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id

    return user
  }

  @Post('/signin')
  public async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id

    return user
  }

  @Post('/signout')
  public signout(@Session() session: any) {
    return (session.userId = null)
  }

  @Get('/:id')
  public async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id))

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  public whoAmI(@CurrentUser() user: User) {
    return user
  }

  @Get()
  public findAllUser(@Query('email') email: string) {
    return this.userService.find(email)
  }

  @Delete('/:id')
  public removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id))
  }

  @Patch('/:id')
  public updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body)
  }
}
